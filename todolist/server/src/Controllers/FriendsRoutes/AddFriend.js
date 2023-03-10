const joi = require('joi');
const { knex } = require('../../Modules/DatabaseConnection');
const { Model, UniqueViolationError } = require("objection");
Model.knex(knex);

class User extends Model {
  static get tableName() {
    return "user";
  }
}

class Friends extends Model {
  static get tableName() {
    return "friends";
  }
};

// Endpoint for Members page

module.exports.AddFriend= async (req, res) => {
    
    const schema = joi.object({
        id: joi.number().required(),
        username: joi.string().min(3).max(36).required(),
    })

    const {error, value} = schema.validate(req.query);
    if(error) return res.status(400).json(error.details[0].message);

    const {id, username} = value;
    try {
    const friend = await User.query().select().where('id', id);
    if (friend.length === 0) return res.status(404).json('Friend not found');
    await Friends.query().insert({
        userName: username,
        userFriends: friend[0].userName,
    })
        res.status(201).json('Friend added')
      }
    catch(error){
    if (UniqueViolationError) return res.status(409).json('Friend already added')
    
    res.status(500).json(error);
    }


};