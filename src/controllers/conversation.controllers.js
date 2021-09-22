const  ConversationService = require("../services/Conversations.services");

const getAllConversation = async(req, res, next) => {
  try{
    const users = await ConversationService.getAll();
    res.json(users);
  }catch(error){
    next(error);
  }
}

const getConversationById = async(req, res, next) => {
  try{
    const {id} = req.params;
    const user = await ConversationService.getById(id);
    return res.json(user);
  }catch(error){
    next(error);
  }
}

const createConversation = async(req, res, next) => {
  try{
    const {title, image_url, type, created_by} = req.body;


    const newConversation = {
      title,
      image_url,
      type,
      created_by
    }
    const conversation = await ConversationService.create(newConversation);
    return res.json(conversation);
  }catch(error){
    next(error);
  }
}

const updateConversation = async(req, res, next) => {
  try{
    const { id } = req.params;
    const {title, image_url, type, created_by} = req.body;

    const updateConversation = {
      title,
      image_url,
      type,
      created_by
    }

    const conversation = await ConversationService.update(updateConversation, id);
    if(conversation && conversation[0]){
      return res.json({message: "Se ha actualizado el registro en el sistema"});
    }
    return res.json({message: "No se ha podido actualizar el registro en el sistema"});
  }catch(error){
    next(error);
  }
}

const deleteConversation = async(req, res, next) => {
  try{
    const {id} = req.params;

    const deleted = await ConversationService.delete(id);
    if(deleted){
      return res.json({message: "Se ha eliminado el registro en el sistema"});
    }
    return res.json({message: "No se ha podido eliminar el registro en el sistema"});
  }catch(error){
    next(error);
  }
}

const conversationUsers = async(req, res, next) => {
    try {
      const { id } = req.params;
      const conversation = await ConversationService.joinUsers(id);
      return res.json(conversation)
    }catch(error){
      next(error);

    }
}

const conversationParticipants = async(req, res, next) => {
  try {
    const { id } = req.params;
    const conversation = await ConversationService.joinParticipants(id);
    return res.json(conversation)
  }catch(error){
    next(error);

  }
}

const conversationMessage = async (req, res, next) => {
  try {
    const { id } = req.params;
    const conversation = await ConversationService.joinMessage(id);
    return res.json(conversation)
  }catch(error){
    next(error);

  }
}

module.exports = {
  getAll: getAllConversation,
  getById: getConversationById,
  create: createConversation,
  update: updateConversation,
  delete: deleteConversation,
  conversationMessage,
  conversationParticipants,
  conversationUsers
}