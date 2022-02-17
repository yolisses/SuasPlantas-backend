import { error } from '../utils/error';
import { validateFound } from '../utils/validateFound';
import { FUser } from './FUser';

const MAX_REMOTIONS_BY_IP = 100;

export async function removeFuser(id:string, ip:string) {
  const deleteds = await FUser.find({
    where: { deletedByIp: ip },
    withDeleted: true,
  });
  const count = deleteds.length;
  if (count >= MAX_REMOTIONS_BY_IP) {
    error(503, 'Can\'t remove');
  }
  const fuser = await FUser.findOne(id);
  validateFound({ user: fuser });
  fuser.deletedByIp = ip;
  await fuser.save();
  return fuser.softRemove();
}
