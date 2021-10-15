
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
    const newUser = User.create(user)
    await newUser.save()

    return newUser
}
