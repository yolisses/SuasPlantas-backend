
import { Point } from 'geojson';
import { User } from './User';

interface IUserCreationDTO {
    email: string
    name: string
    location: Point
}

export async function createUser(user: IUserCreationDTO): Promise<User> {
    const { name, email, location } = user
    const newUser = User.create({ name, email, location })
    await newUser.save()

    return newUser
}
