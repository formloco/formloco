
const { readShare, createShare, deleteShare, updateShare, publishShare } = require('../services/shareService')

const shareRead = async(req, res) => {
  try{
    let data = await readShare();
    res.status(201).json(data);
  }catch(e){
    console.log(e.message);
    res.sendStatus(500);
  }
}

const shareCreate = async(req, res) => {
  try{
    let user = await createShare(req.body);
    res.status(201).json({message: "Share Created", user: user});
  }catch(e){
    console.log(e.message);
    res.sendStatus(500);
  }
}

const shareDelete = async(req, res) => {
  try{
    let user = await deleteShare(req.body);
    res.status(201).json({message: "Share Deleted", user: user});
  }catch(e){
    console.log(e.message);
    res.sendStatus(500);
  }
}


const shareUpdate = async(req, res) => {
  try{
    let user = await updateShare(req.body);
    res.status(201).json({message: "Share Updated"});
  }catch(e){
    console.log(e.message);
    res.sendStatus(500);
  }
}

const sharePublish = async(req, res) => {
  try{
    let msg = await publishShare(req.body);
    res.status(201).json(msg);
  }catch(e){
    console.log(e.message);
    res.sendStatus(500);
  }
}

module.exports = {
  shareRead, shareCreate, shareDelete,  shareUpdate, sharePublish
};
