import { Stack, StackProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import * as ssm from "aws-cdk-lib/aws-ssm";

export class EnvSsmStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const localEnv = Object.keys(process.env);
    let startIter = localEnv.length;
    require("dotenv").config();
    let endIter = Object.keys(process.env).length;
    for (let x = startIter; x < endIter; x++) {
      // console.log(Object.keys(process.env)[x]);
      // console.log(Object.values(process.env)[x]);
      console.log(`Creating SSM Parameter ${Object.keys(process.env)[x]} with value ${Object.values(process.env)[x]}.`);
      const ssmParameter = new ssm.StringParameter(this, `ssmParameter-${Object.keys(process.env)[x]}`, {
        parameterName: Object.keys(process.env)[x],
        stringValue: Object.values(process.env)[x] as string,
        type: ssm.ParameterType.STRING,
      });
    }
  }
}

const ssmParameter = new ssm.StringParameter(this, 'mySsmParameter', {
  parameterName: 'mySsmParameter',
  stringValue: 'mySsmParameterValue',
  type: ssm.ParameterType.STRING,
});

//remember to pull with decryption if storing as secure string
const secureParameter = new ssm.StringParameter(this, 'mySecretParameter', {
  parameterName: 'mySecretParameter',
  stringValue: 'mySecretParameterValue',
  type: ssm.ParameterType.SECURE_STRING,
});

const listParameter = new ssm.StringParameter(this, 'myListParameter', {
  parameterName: 'myListParameter',
  stringValue: ["myListParameterValue1", "myListParameterValue2"],
  type: ssm.ParameterType.STRING_LIST,
});