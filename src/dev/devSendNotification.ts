import { client } from '../notification/client';

export function devSendNotification() {
  const name = 'massenta';
  const card = 'https://suasplantas.s3.sa-east-1.amazonaws.com/uploads/f012523b-731e-46b6-8546-589b70636b4d';
  return client.createNotification({
    contents: {
      en: `Uma nova planta que você pode estar procurando: ${name}`,
    },
    big_picture: card,
    include_external_user_ids: ['1'],
  });
}
