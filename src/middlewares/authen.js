const MESSAGE = require("../utils/message");
const jwt = require("jsonwebtoken");
const userService = require("../services/user");
/**
 * Authentication Token of Player(in System)
 * Param in request.body
 * @param {object} req request from client to server
 * @param {object} res response from server to client
 * @param {function} next action to next request
 */
const authenticationToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      res.statusMessage = MESSAGE.NO_TOKEN_PROVIDED;
      res.status(403).send();
      return;
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, payload) => {
      if (err) {
        res.statusMessage = MESSAGE.TOKEN_NOT_VALID;
        res.status(401).send();
      } else {
        req.payload = payload;
        const userId = payload.user_id;
        const user = await userService.findOneById(userId);
        if (!user) {
          res.statusMessage = MESSAGE.USER_NOT_VALID;
          res.status(401).send();
        }
        next();
      }
    });
  } catch (err) {
    res.statusMessage = MESSAGE.SERVER_ERROR;
    res.status(500).send();
  }
};
const signin = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email) {
    return res.status(401).json({ message: MESSAGE.EMAIL_EMPTY });
  }
  if (!password) {
    return res.status(401).json({ message: MESSAGE.PASSWORD_EMPTY });
  }
  try {
    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: MESSAGE.AUTH_INVALID });
    }
    const isCorrectPassword = await userService.comparePassword(
      password,
      user.password
    );
    if (!isCorrectPassword) {
      return res.status(401).json({ message: MESSAGE.AUTH_INVALID });
    }

    // const isPM = await projectMemberService.getHighestRole(user.user_id);

    const userToken = await jwt.createAccessToken({
      email: email,
      userId: user.user_id,
      user_id: user.user_id,
    });
    const userInfo = {
      userId: user.user_id,
      name: user.name,
    };
    return res.status(200).json({
      userToken: userToken,
      refreshToken,
      userInfo: userInfo,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = {
  authenticationToken,
  signin,
};
