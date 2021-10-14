
import { User } from './User';

interface IUserCreationDTO {
    email: string
    name: string
}

export async function createUser(user: IUserCreationDTO) {
    return User.create(user).save();
}
