import { CREATE_CARD_LAMBDA_FUNCTION } from '../env/env';
import { lambda } from '../vendor/lambda';

export async function createCard(key) {
  const payload = JSON.stringify({ key });
  await lambda
    .invoke(
      {
        FunctionName: CREATE_CARD_LAMBDA_FUNCTION,
        Payload: payload,
      },
      // eslint-disable-next-line no-console
      (err) => console.error(err),
    )
    .promise();
}
