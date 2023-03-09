const joi = require('joi');
const { knex } = require('../../Modules/DatabaseConnection');
const { Model} = require("objection");

Model.knex(knex);

class Todo extends Model {
  static get tableName() {
    return "todo";
  }
}

class Friends extends Model {
  static get tableName() {
    return "friends";
  }
};

// Endpoint for Member page (friend profile)

module.exports.Friendprofile = async (req, res) => {
    
    const schema = joi.object({
        member: joi.number().required(),
        username: joi.string().min(3).max(36).required(),
    })

    const {error, value} = schema.validate(req.query);
    if(error) return res.status(400).json(error.details[0].message);

    const { member } = value;
    try {
    const user = await Friends.query().select().where('id', member);
    if (user.length === 0) return res.status(404).json('User not found');
    }
    catch (err) {
    return res.status(500).json("Internal server error");
    }
    try {
    const lists = await Todo.query().select().where('userName', user[0].userFriends).orderBy('listName', 'desc');
    if (lists.length === 0) return res.status(404).json('Your friend doesnt have anything to do');
    
    res.status(200).json(lists);
    }
    catch (err) {
    return res.status(500).json("Internal server error");
    }
};