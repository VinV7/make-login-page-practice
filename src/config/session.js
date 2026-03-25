import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';
const pgSession = connectPgSimple(session);

export default session({
    store: new pgSession({
        conString: "postgres://postgres:123@localhost:5432/loginapp",
        schemaName: "public",
        tableName: "session"
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 1000*60*60
    }
});