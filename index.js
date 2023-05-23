import { LambdaClient, InvokeCommand } from "@aws-sdk/client-lambda";
import { region } from "./config"


const lambdaClient = new LambdaClient({ region });

exports.handler = async (event) => {
  const blurParams = {
    FunctionName: 'blurImage',
    Payload: JSON.stringify(event),
  };

  const resizeParams = {
    FunctionName: 'resizeImage',
    Payload: JSON.stringify(event),
  };

  try {
    await Promise.all([
      lambdaClient.send(new InvokeCommand(blurParams)),
      lambdaClient.send(new InvokeCommand(resizeParams)),
    ])
    console.log('resizing and blurring done')
  } catch (error) {
    console.log(`Error invoking Lambda functions: ${error}`)
    throw error
  }
}
