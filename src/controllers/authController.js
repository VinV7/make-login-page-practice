import getUser from "../model/userModel.js";

const loginAuthenticate = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const user = await getUser(username);

    if (!user || password !== user.password) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    // Regenerate session id for security & Save session id to store 
    req.session.regenerate((err) => {
      if (err) return next(err);
        
      req.session.userId = user.id;

      req.session.save((err) => {
        if (err) return next(err);
        console.log("Login Successful");
        return res.json({
          success: true,
          redirect: "/home",
        });
      });
    });
  } catch (error) {
    next(error);
  }
};

const logoutFromSite = (req, res, next) => {
  req.session.destroy((err) => {
    if (err) return res.sendStatus(500);

    res.clearCookie("connect.sid");
    return res.json({
      success: true,
      redirect: "/",
    });
  });
};

export { loginAuthenticate, logoutFromSite };