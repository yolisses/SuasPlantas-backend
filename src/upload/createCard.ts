import { CREATE_CARD_LAMBDA_FUNCTION } from '../config/env';
import { lambda } from '../vendor/lambda';

export async function createCard(key) {
  await lambda
    .invoke(
      {
        FunctionName: CREATE_CARD_LAMBDA_FUNCTION,
        Payload: JSON.stringify({ key }),
      },
      // eslint-disable-next-line no-console
      (err) => console.error(err),
    )
    .promise();
}
