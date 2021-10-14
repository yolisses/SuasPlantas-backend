
import { Point } from 'geojson';
import { User } from './User';


interface IUserCreationDTO {
    email: string
    name: string
    location: Point
}

export async function createUser(user: IUserCreationDTO): Promise<User> {
    const { name, email, location } = user
    // const newUser = await User.query(
    //     'INSERT INTO users (name, email, location)' +
    //     'VALUES ($1, $2, ST_SetSRID(ST_MakePoint($3, $4), 4326));',
    //     [name, email, longitude, latitude]
    // )
    const newUser = User.create({ name, email, location })
    await newUser.save()

    return newUser
}
