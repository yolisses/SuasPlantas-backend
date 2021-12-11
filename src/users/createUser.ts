import { Point } from 'geojson';
import { User } from './User';

interface IUserCreationDTO {
    email: string
    name: string
    image: string
    state: string
    city: string
    location: Point
}

export async function createUser(user: IUserCreationDTO): Promise<User> {
  return User.create(user).save();
}
