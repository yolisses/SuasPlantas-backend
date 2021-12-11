import { Lambda } from 'aws-sdk';
import { awsConfig } from '../config/awsConfig';

export const lambda = new Lambda(awsConfig);
