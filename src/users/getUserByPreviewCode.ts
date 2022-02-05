import { Preview, PreviewCode } from '../preview/Preview';

export async function getUserByPreviewCode(id:PreviewCode) {
  const preview = await Preview.findOne(id, { relations: ['user'], withDeleted: true });
  return preview.user;
}
