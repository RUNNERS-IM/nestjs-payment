// import uploadFeature from '@adminjs/upload';
// import type { AWSOptions } from '@adminjs/upload/src/features/upload-file/providers/aws-provider';
// import type UploadOptions from '@adminjs/upload/src/features/upload-file/types/upload-options.type';
// import dotenv from 'dotenv';
//
// import { UserEntity } from '../user.entity';
// import { userResourceOptions } from './user.resource.options';
//
// dotenv.config({ path: `.envs/.${process.env.ENVIRONMENT}/.env` });
//
// const awsProviderOptions: AWSOptions = {
//   accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
//   region: process.env.AWS_S3_BUCKET_REGION,
//   bucket: process.env.AWS_S3_BUCKET_NAME,
// };
//
// const uploadFeatureOptions: UploadOptions = {
//   provider: { aws: awsProviderOptions },
//   properties: {
//     key: 'avatar',
//     mimeType: 'mimeType',
//   },
//   validation: {
//     mimeTypes: ['image/png', 'image/jpeg'],
//   },
// };
//
// export const userResource = {
//   resource: UserEntity,
//   options: userResourceOptions,
//   features: [uploadFeature(uploadFeatureOptions)],
// };
