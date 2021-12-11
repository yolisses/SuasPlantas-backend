import { S3 } from 'aws-sdk';
import { awsConfig } from '../config/awsConfig';

export const s3 = new S3(awsConfig);
