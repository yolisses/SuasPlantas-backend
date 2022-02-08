import { User } from './User';

export async function getUserByPreviewId(preview:string) {
  return User.findOne({ where: { preview }, withDeleted: true });
}
