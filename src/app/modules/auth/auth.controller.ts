import httpStatus from 'http-status';
import { configs } from "../../configs";
import catchAsync from "../../utils/catch_async";
import manageResponse from "../../utils/manage_response";
import { auth_services } from "./auth.service";

const register_user = catchAsync(async (req, res) => {
    const result = await auth_services.register_user_into_db(req?.body)
    manageResponse(res, {
        success: true,
        message: "Organization created successful",
        statusCode: httpStatus.OK,
        data: result
    })
})

const organization_login_user = catchAsync(async (req, res) => {
    const result = await auth_services.organization_login_user_from_db(req.body);
    res.cookie('refreshToken', result.refreshToken, {
        secure: configs.env == 'production',
        httpOnly: true,
    });
    res.cookie('accessToken', result.accessToken, {
        secure: configs.env == 'production',
        httpOnly: true,
    });

    manageResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Organization log in successful !',
        data: {
            accessToken: result.accessToken,
            role: result?.role
        },
    });
});

const get_my_profile = catchAsync(async (req, res) => {
    const { email } = req.user!;
    const result = await auth_services.get_my_profile_from_db(email);
    manageResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User profile fetched successfully!',
        data: result,
    });
});

const refresh_token = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    const result = await auth_services.refresh_token_from_db(refreshToken);
    manageResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Refresh token generated successfully!',
        data: result,
    });
});

const change_password = catchAsync(async (req, res) => {
    const user = req?.user;
    const result = await auth_services.change_password_from_db(user!, req.body);

    manageResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Password changed successfully!',
        data: result,
    });
});

const forget_password = catchAsync(async (req, res) => {
    const { email } = req?.body
    await auth_services.forget_password_from_db(email);
    manageResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Reset password link sent to your email!',
        data: null,
    });
});

const reset_password = catchAsync(async (req, res) => {
    const { token, newPassword, email } = req.body;
    const result = await auth_services.reset_password_into_db(
        token,
        email,
        newPassword,
    );
    manageResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Password reset successfully!',
        data: result,
    });
});

const verified_account = catchAsync(async (req, res) => {
    const result = await auth_services.verified_account_into_db(req?.body?.token)

    manageResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Account Verification successful.",
        data: result
    })
})

const get_new_verification_link = catchAsync(async (req, res) => {
    const result = await auth_services.get_new_verification_link_from_db(req?.body?.email)
    manageResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "New Verification link is send on email.",
        data: result
    })
})

export const auth_controllers = {
    register_user,
    organization_login_user,
    get_my_profile,
    refresh_token,
    change_password,
    reset_password,
    forget_password,
    verified_account,
    get_new_verification_link
}