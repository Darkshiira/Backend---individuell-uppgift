const joi = require('joi');
const { knex } = require('../../Modules/DatabaseConnection');
const { Model } = require("objection");
Model.knex(knex);

class User extends Model {
  static get tableName() {
    return "user";
  }
};

// Endpoint for Members page

module.exports.Getmembers= async (req, res) => {
    
    const schema2 = joi.object({
        username: joi.string().min(3).max(36).required(),
    })

    const {error, value} = schema2.validate(req.query);
    if(error) return res.status(400).json(error.details[0].message);
    try {
    const todo = await User.query().select()
    if (todo.length === 0) return res.status(404).json('Theres no members');
    res.status(200).json(todo);
    }
    catch (err) {
    return res.status(500).json("Internal server error");
    }

};