import { Lambda } from 'aws-sdk';
import { awsConfig } from './awsConfig';

export const lambda = new Lambda(awsConfig);
