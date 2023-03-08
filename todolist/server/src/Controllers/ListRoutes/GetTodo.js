const joi = require('joi');

const { knex } = require('../../Modules/DatabaseConnection');
const { Model } = require("objection");
Model.knex(knex);

class Todo extends Model {
  static get tableName() {
    return "todo";
  }
};
module.exports.GetTodo = async (req, res) => {
    
    const schema2 = joi.object({
        name: joi.string().min(3).max(50).required(),
        username: joi.string().min(3).max(36).required(),
    })
    const {error, value} = schema2.validate(req.query);
    if(error) return res.status(400).json(error.details[0].message);
    const {name, username} = value;

    const todo = await Todo.query().select().where('userName', username ).andWhere('name', name)
    if (todo.length === 0) return res.status(404).json('You dont have anything to do');
    res.status(200).json(todo);


};