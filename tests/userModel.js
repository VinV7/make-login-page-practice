import sql from '../src/config/db.js'

async function getUsers() {
    const users = await sql`
    SELECT * FROM public.users
    `

    return users;
};

console.log(getUsers())