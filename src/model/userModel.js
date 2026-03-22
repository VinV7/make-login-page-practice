import sql from '../config/db.js'

const getUser = async (username) => {
    const user = await sql`
    SELECT * FROM public.users
    WHERE username = ${username}
    `

    return user[0];
}

export default getUser;