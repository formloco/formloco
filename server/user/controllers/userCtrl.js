
const { readUsers, deleteUser, createUser, updateUser, resetpasswordUser } = require('../services/userService')

const usersRead = async(req, res) => {
  try{
    let data = await readUsers(req.params.tenant_id);
    res.status(201).json(data);
  }catch(e){
    console.log(e.message);
    res.sendStatus(500);
  }
}

const userDelete = async(req, res) => {
  try{
    await deleteUser(req.body);
    res.status(201).json({"message": "User Deleted"});
  }catch(e){
    console.log(e.message);
    res.sendStatus(500);
  }
}

const userCreate = async(req, res) => {
  try{
    await createUser(req.body);
    res.status(201).json({"message": "User Created"});
  }catch(e){
    console.log(e.message);
    res.sendStatus(500);
  }
}

const userUpdate = async(req, res) => {
  try{screen
    let data = await updateUser(req.body);
    res.status(201).json(data);
  }catch(e){
    console.log(e.message);
    res.sendStatus(500);
  }
}

const userResetpassword = async(req, res) => {
  try{
    await resetpasswordUser(req.body);
    res.status(201).json({"message": "Password Reset"});
  }catch(e){
    console.log(e.message);
    res.sendStatus(500);
  }
}

module.exports = {
  usersRead,
  userDelete, 
  userCreate, 
  userUpdate,
  userResetpassword
};
