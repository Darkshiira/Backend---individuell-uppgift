const joi = require('joi');
const { knex } = require('../../Modules/DatabaseConnection');
const { Model } = require("objection");
Model.knex(knex);

class User extends Model {
  static get tableName() {
    return "user";
  }
};

class Friends extends Model {
  static get tableName() {
    return "friends";
  }
}

// Endpoint for Members page

module.exports.Getmembers = async (req, res) => {
    
    const schema = joi.object({
        username: joi.string().min(3).max(36).required(),
    })

    const {error, value} = schema.validate(req.query);
    if(error) return res.status(400).json(error.details[0].message);
    const username = value.username;
    try {
    const members = await User.query().select().whereNot('userName', username)
    if (members.length === 0) return res.status(404).json('Theres no members');
    res.status(200).json(members);
    }
    catch (err) {
    return res.status(500).json("Internal server error");
    }

};