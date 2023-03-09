const joi = require('joi');
const { knex } = require('../../Modules/DatabaseConnection');
const { Model } = require("objection");
Model.knex(knex);

class Todo extends Model {
  static get tableName() {
    return "todo";
  }
};

//Endpoint for Todo page

module.exports.DeleteTodo = async (req, res) => {
    const schema = joi.object({
        id: joi.number().required(),
        username: joi.string().min(3).max(36).required(),
    })
    const {error, value} = schema.validate(req.query);

    if(error) return res.status(400).json(error.details[0].message);
    const {id, username} = value;
    try {
    const todo = await Todo.query().delete().where('userName', username ).andWhere('id', id)
    if (todo.length === 0) return res.status(404).json('Couldnt find your todo');
    res.status(200).json('Your todo has been deleted');
    }
    catch (err) {
      return res.status(500).json("Internal server error");
    }

};