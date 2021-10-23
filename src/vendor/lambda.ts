// Ridiculously necessary
import * as pkg from "aws-sdk";
const { Lambda } = pkg;

import { awsConfig } from "./awsConfig";

export const lambda = new Lambda(awsConfig);
