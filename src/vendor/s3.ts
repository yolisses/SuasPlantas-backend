import { S3 } from 'aws-sdk';
import { awsConfig } from './awsConfig';

export const s3 = new S3(awsConfig);
