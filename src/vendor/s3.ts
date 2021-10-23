// Ridiculously necessary
import * as pkg from "aws-sdk";
const { S3 } = pkg;

import { awsConfig } from "./awsConfig";

export const s3 = new S3(awsConfig);
