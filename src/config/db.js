import postgres from 'postgres';

const sql = postgres({
    host: 'localhost',
    username: 'postgres',
    port: 5432,
    password: '123',
    database: 'loginapp'
});

export default sql;