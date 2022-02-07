import { Preview, PreviewId } from '../preview/Preview';

export async function getUserByPreviewId(id:PreviewId) {
  const preview = await Preview.findOne(id, { relations: ['user'], withDeleted: true });
  return preview.user;
}
