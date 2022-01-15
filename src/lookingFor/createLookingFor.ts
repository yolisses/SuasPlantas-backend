import { UserId } from '../users/User';
import { LookingFor } from './LookingFor';

interface createLookingForDTO{
    name:string,
}

export async function createLookingFor(data: createLookingForDTO, userId:UserId) {
  const lookingFor = LookingFor.create(data);
  lookingFor.userId = userId;
  return lookingFor.save();
}
