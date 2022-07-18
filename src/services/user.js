const userRepo = require("../repositories/user");
const bcrypt = require('bcrypt')
const save = async (accountWallet, data) => {
  const condition = {
    accountWallet: accountWallet,
  };
  const user = await userRepo.findOneByCondition(condition, data);
  if (!user) {
    return await userRepo.createOne(data);
  } else {
    return res.status(500).send({ message: error.message });
  }
};

const checkWallets = async (accountWallet) => {
  const condition = {
    accountWallet: accountWallet,
  };
  const user = await userRepo.findOneByCheckWallet(condition); 
  if (user) {
    return { message: "wallet already exists", user: user };
  } else {
    return res.status(500).send({ message: error.message });
  }
};

const findAccount = async (accountWallet) => {  
  const condition = {
    accountWallet: accountWallet,
  };
  return userRepo.findAccount(condition);
};

const comparePassword = async (enteredPassword, hashedPassword) => {
  return await bcrypt.compare(enteredPassword, hashedPassword);
 };
 
const findOneById = async (userId) =>{
  const condition = {
    id:userId,
  }
  return userRepo.findAccount(condition);
}
 
const findOneByEmail = async(email)=>{
  const condition = {
    email:email,
  }
  return userRepo.findAccount(condition);
}

const createNewUser = (data) =>{
  return userRepo.createOne(data)
}
module.exports = {
  save,
  checkWallets,
  findAccount,
  findOneById, 
  comparePassword,
  findOneByEmail,
  createNewUser

};
