const userService = require("../services/user");
const jwt = require("jsonwebtoken");
const MESSAGE = require("../utils/message");
const bcrypt = require("bcrypt");
const mediaService = require("../services/media");
const create = async (req, res) => {
  const form = req.body;
  try {
    const result = await userService.createOne(form);
    return res.status(200).send({ data: result });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};

const save = async (req, res) => {
  try {
    const data = req.body;
    if (!data.accountWallet) {
      return res.status(400).send({ message: "Bad request" });
    }
    const saveUser = await userService.save(data.accountWallet, data);
    if (saveUser) {
      return res.status(200).send({ message: "Save successfully" });
    }
    return res.status(400).send({ message: "Bad request" });
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const checkWallet = async (req, res) => {
  try {
    const data = req.body;
    const checkWalletUser = await userService.checkWallets(data.accountWallet);

    if (checkWalletUser) {
      return res.status(200).send({ checkWalletUser });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};

const signinByWallet = async (req, res) => {
  try {
    const { accountWallet } = req.body;
    const account = await userService.findAccount(accountWallet);

    if (account) {
      const token = jwt.sign(
        {
          accountWallet: account.accountWallet,
          user_id: account.id,
        },
        process.env.ACCESS_TOKEN_SECRET
      );

      return res.status(200).send({
        message: "Login successfully",
        token: token,
      });
    } else {
      return res.status(400).send({ message: "Wallet not exist" });
    }
  } catch (error) {
    return res.status(500).send({ message: error.message });
  }
};
const signIn = async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    if (!email) {
      return res.status(401).json({ message: MESSAGE.EMAIL_EMPTY });
    }
    if (!password) {
      return res.status(401).json({ message: MESSAGE.PASSWORD_EMPTY });
    }
    const user = await userService.findOneByEmail(email);
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
    const token = jwt.sign(
      {
        user_id: user.id,
        email: user.email,
        name: user.name,
      },
      process.env.ACCESS_TOKEN_SECRET
    );
    return res.status(200).send({
      message: "Login successfully",
      token: token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: error.message });
  }
};
const signup = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  if (!name) {
    return res.status(400).json("name can not empty");
  }
  if (!email) {
    return res.status(400).send({ message: MESSAGE.EMAIL_EMPTY });
  }
  if (!password) {
    return res.status(400).send({ message: MESSAGE.PASSWORD_EMPTY });
  }
  if (!confirmPassword) {
    return res.status(400).send({ message: MESSAGE.CONFIRM_PASSWORD_EMPTY });
  }
  let patternEmail = new RegExp(
    [
      '^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|',
      '(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|',
      "(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$",
    ].join("")
  );
  if (!patternEmail.test(email)) {
    return res.status(400).send({ message: MESSAGE.WRONG_EMAIL });
  }

  // let patternPassword =
  //   /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
  // if (!patternPassword.test(password)) {
  //   return res.status(400).send({ message: MESSAGE.PASSWORD_INVALID });
  // }
  if (confirmPassword !== password) {
    return res.status(400).send({ message: MESSAGE.PASSWORD_NOT_MATCH });
  }
  try {
    // const isExistEmail = await userService.checkAlreadyEmail(email);
    //send mail
    // // const isNotActive = true;
    // const activeToken = await generateConfirmEmailToken(email);

    // const token = await jwt.sign(paypoad, process.env.ACTIVE_ACCOUNT_TOKEN, {
    //     expiresIn: process.env.TIME_ACTIVE_ACCOUNT_TOKEN,
    // });
    const newUser = {
      name,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
      email,
    };
    const result = await userService.createNewUser(newUser);
    if (result[0]) {
      res.status(500).send({
        message: error.message,
      });
    }
    // transporter.sendMail(activeAccount(email, name, activeToken));
    return res.status(200).send();
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const getMe = async (req, res) => {
  try {
    const email = req.payload.email;
    const userId = req.payload.user_id;
    const user = await userService.findOneByEmail(email);
    const medias = await mediaService.findAllByUserId(userId);
    if (!user) {
      return res.status(401).json({ message: MESSAGE.AUTH_INVALID });
    }
    return res.status(200).send({ user, medias: medias ? medias : [] });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
module.exports = {
  create,
  save,
  checkWallet,
  signinByWallet,
  signIn,
  signup,
  getMe,
};
