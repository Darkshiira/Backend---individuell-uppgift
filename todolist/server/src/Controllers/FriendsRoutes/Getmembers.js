const joi = require('joi');
const { knex } = require('../../Modules/DatabaseConnection');
const { Model } = require("objection");
Model.knex(knex);

class User extends Model {
  static get tableName() {
    return "user";
  }
};
module.exports.Getmembers= async (req, res) => {
    
    const schema2 = joi.object({
        username: joi.string().min(3).max(36).required(),
    })

    const {error, value} = schema2.validate(req.query);
    if(error) return res.status(400).json(error.details[0].message);

    const todo = await User.query().select()
    if (todo.length === 0) return res.status(404).json('You dont have anything to do');
    res.status(200).json(todo);


};