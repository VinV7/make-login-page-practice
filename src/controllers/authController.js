import getUser from '../model/userModel.js'

const loginAuthenticate = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await getUser(username);
        
        if (!user) {
            console.log('User not Found');
            return res.status(401).json({ message : 'Invalid Credentials'});
        }
        if (password !== user.password) {
            console.log('Invalid Password');
            return res.status(401).json({ message : 'Invalid Credentials'});
        }

        req.session.regenerate((err) => {
            if (err) return next(err);

            req.session.userId = user.id;

            req.session.save((err) => {
                if (err) return next(err);
                console.log('Login Successful')
                return res.json({
                    success: true,
                    redirect: "/home"
                });
            });
        });
    } catch (error) {
        next(error);
    }

};

export default loginAuthenticate;