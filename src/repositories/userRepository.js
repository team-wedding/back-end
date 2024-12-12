const { User } = require('../models');
const { DelUser } = require('../models')

const selectUser = async (email) => {
  try{
    const userInfo = await User.findOne({ where: { email: email }, raw: true });
    return userInfo
  }catch(err){
    throw new Error('userRepository selectUser err', err)
  }
};

const createUser = async (userInfo) => {
  try{
    await User.create({
      name: userInfo.name,
      email: userInfo.email,
      gender: userInfo.gender,
      hashPassword: userInfo.hashPassword,
      provider: userInfo.provider,
      salt: userInfo.salt
    });
  }catch(err){
    throw new Error('userRepository createUser err', err)
  }
}

const deleteUser = async(userInfo) => {
  try{
    await User.destroy({where: {id: userInfo.id}})
    return true
  }catch(err){
    throw new Error('userReposityro deleteUser err', err)
  }
};

const updateUser = async (id, newHashPassword, salt) => {
  try{
    await db.User.update({
      hashPassword: newHashPassword,
      salt: salt
    },
    {
      where: {id: id,}
    });
    return true
  }catch(err){
    throw new Error('userRepository updateUser err', err)
  }
};

const createDelUser = async (userInfo) => {
  try{
    await DelUser.create({
      id: userInfo.id,
      email: userInfo.email,
      name: userInfo.name,
      gender: userInfo.gender,
      provider: userInfo.provider,
      createdAt: userInfo.createdAt,
      updatedAt: userInfo.updatedAt,
      deletedAt: userInfo.deletedAt,
    });
    return true
  }catch(err){
    throw new Error('userRepository createDelUser err', err)
  }
};

module.exports = {
  selectUser,
  deleteUser,
  updateUser,
  createDelUser,
  createUser
}