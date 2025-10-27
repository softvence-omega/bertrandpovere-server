import { S3 } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import fs from 'fs';
import mime from 'mime-types';
import path from 'path';
import { configs } from '../configs';

type IFile = {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    destination: string;
    filename: string;
    path: string; // Make sure this exists
    size: number;
}; // Create the S3 client
const s3 = new S3({
    region: configs.aws.region as string,
    credentials: {
        accessKeyId: configs.aws.access_key_id as string,
        secretAccessKey: configs.aws.secret_access_key as string,
    },
});

const uploadCloud = async (
    file: IFile,
): Promise<{ secure_url: string; key: string }> => {
    const fileContent = fs.readFileSync(file.path);
    const ext = path.extname(file.path);
    const baseName = path.basename(file.path, ext);
    const fileName = `${Date.now()}${ext ? '-' : ''}${baseName}`;
    const contentType = mime.lookup(ext) || 'application/octet-stream';

    const upload = new Upload({
        client: s3,
        params: {
            Bucket: configs.aws.bucket as string,
            Key: fileName,
            Body: fileContent,
            ContentType: contentType,
        },
    });

    try {
        const result = await upload.done();
        fs.unlinkSync(file?.path); // Delete file after upload
        return {
            secure_url: result.Location as string,
            key: fileName,
        };
    } catch (err) {
        fs.unlinkSync(file?.path); // Still delete on error
        throw err;
    }
};

export default uploadCloud;
