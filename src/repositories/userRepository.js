const { User } = require('../models');

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

module.exports = {
  selectUser,
  deleteUser,
  updateUser,
  createUser
}