import bcrypt from "bcrypt";
import httpStatus from 'http-status';
import { JwtPayload, Secret } from "jsonwebtoken";
import mongoose from "mongoose";
import { configs } from "../../configs";
import { AppError } from "../../utils/app_error";
import { isAccountExist } from "../../utils/isAccountExist";
import { jwtHelpers } from "../../utils/JWT";
import sendMail from "../../utils/mail_sender";
import { TOrganization } from "../organization/organization.interface";
import { OrganizationModel } from "../organization/organization.schema";
import { TAccount, TLoginPayload } from "./auth.interface";
import { Account_Model } from "./auth.schema";


// register user
const register_user_into_db = async (payload: any) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        // Check if the account already exists
        const isExistAccount = await Account_Model.findOne({ email: payload?.email }, null, { session });
        if (isExistAccount) {
            throw new AppError("Organization already exist!!", httpStatus.BAD_REQUEST);
        }
        // Hash the password
        const hashPassword = bcrypt.hashSync(payload?.password as string, 10);

        // Create account
        const accountPayload: TAccount = {
            email: payload?.email,
            password: hashPassword,
            role: "ADMIN",
            firstName: payload?.firstName,
            lastName: payload?.lastName,
            accountStatus: "ACTIVE",
            isDeleted: false,
            mobileNo: payload?.mobileNo,

        };
        const newAccount = await Account_Model.create([accountPayload], { session });

        // Create user
        const organizationPayload: TOrganization = {
            owner: newAccount[0]?._id,
            organizationName: `${payload?.firstName}' Organization`,
            phoneNumber: payload?.mobileNo
        };
        const organizationRes = await OrganizationModel.create([organizationPayload], { session });
        await Account_Model.updateOne(
            { _id: newAccount[0]?._id },
            { $set: { organization: organizationRes[0]?._id } },
            { session },
        )
        await session.commitTransaction();
        return newAccount;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};

// login user
const organization_login_user_from_db = async (payload: TLoginPayload) => {
    const isExistAccount = await isAccountExist(payload?.email)
    const isPasswordMatch = await bcrypt.compare(
        payload.password,
        isExistAccount.password,
    );
    if (!isPasswordMatch) {
        throw new AppError('Invalid password', httpStatus.UNAUTHORIZED);
    }
    const accessToken = jwtHelpers.generateToken(
        {
            email: isExistAccount.email,
            role: isExistAccount.role,
        },
        configs.jwt.access_token as Secret,
        configs.jwt.access_expires as string,
    );
    const refreshToken = jwtHelpers.generateToken(
        {
            email: isExistAccount.email,
            role: isExistAccount.role,
        },
        configs.jwt.refresh_token as Secret,
        configs.jwt.refresh_expires as string,
    );
    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
        role: isExistAccount.role
    };

}

const get_my_profile_from_db = async (email: string) => {
    const result = await Account_Model.findOne({ email }).populate("organization").lean();
    if (!result) {
        throw new AppError("Account not found!!", httpStatus.NOT_FOUND)
    }
    result.password = ""
    return result
};

const refresh_token_from_db = async (token: string) => {
    let decodedData;
    try {
        decodedData = jwtHelpers.verifyToken(
            token,
            configs.jwt.refresh_token as Secret,
        );
    } catch (err) {
        throw new Error('You are not authorized!');
    }

    const userData = await Account_Model.findOne({ email: decodedData.email, status: "ACTIVE", isDeleted: false })

    const accessToken = jwtHelpers.generateToken(
        {
            email: userData!.email,
            role: userData!.role,
        },
        configs.jwt.access_token as Secret,
        configs.jwt.access_expires as string,
    );

    return accessToken;
};

const change_password_from_db = async (
    user: JwtPayload,
    payload: {
        oldPassword: string;
        newPassword: string;
    },
) => {
    const isExistAccount = await isAccountExist(user?.email)

    const isCorrectPassword: boolean = await bcrypt.compare(
        payload.oldPassword,
        isExistAccount.password,
    );

    if (!isCorrectPassword) {
        throw new AppError('Old password is incorrect', httpStatus.UNAUTHORIZED);
    }

    const hashedPassword: string = await bcrypt.hash(payload.newPassword, 10);
    await Account_Model.findOneAndUpdate({ email: isExistAccount.email }, {
        password: hashedPassword,
        lastPasswordChange: Date()
    })
    return 'Password changed successful.';
};

const forget_password_from_db = async (email: string) => {
    const isAccountExists = await isAccountExist(email)
    const resetToken = jwtHelpers.generateToken(
        {
            email: isAccountExists.email,
            role: isAccountExists.role,
        },
        configs.jwt.reset_secret as Secret,
        configs.jwt.reset_expires as string,
    );

    const resetPasswordLink = `${configs.jwt.front_end_url}/reset?token=${resetToken}&email=${isAccountExists.email}`;
    const emailTemplate = `<p>Click the link below to reset your password:</p><a href="${resetPasswordLink}">Reset Password</a>`;

    await sendMail({
        to: email,
        subject: "Password reset successful!",
        textBody: "Your password is successfully reset.",
        htmlBody: emailTemplate
    });

    return 'Check your email for reset link';
};

const reset_password_into_db = async (
    token: string,
    email: string,
    newPassword: string,
) => {
    let decodedData: JwtPayload;
    try {
        decodedData = jwtHelpers.verifyToken(
            token,
            configs.jwt.reset_secret as Secret,
        );
    } catch (err) {
        throw new AppError(
            'Your reset link is expire. Submit new link request!!',
            httpStatus.UNAUTHORIZED,
        );
    }

    const isAccountExists = await isAccountExist(email)

    const hashedPassword: string = await bcrypt.hash(newPassword, 10);

    await Account_Model.findOneAndUpdate({ email: isAccountExists.email }, {
        password: hashedPassword,
        lastPasswordChange: Date()
    })
    return 'Password reset successfully!';
};


export const auth_services = {
    register_user_into_db,
    organization_login_user_from_db,
    get_my_profile_from_db,
    refresh_token_from_db,
    change_password_from_db,
    forget_password_from_db,
    reset_password_into_db
}