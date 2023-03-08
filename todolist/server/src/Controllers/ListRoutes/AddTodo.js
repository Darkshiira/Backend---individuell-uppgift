const joi = require('joi');
const { knex } = require('../../Modules/DatabaseConnection');
const { Model } = require("objection");
  Model.knex(knex);

  class Todo extends Model {
    static get tableName() {
        return "todo";
        }
    }

module.exports.AddTodo =  async (req, res) => {
    const schema = joi.object({
        username: joi.string().min(3).max(36).required(),
        todo: joi.string().min(3).max(300).required(),
        name: joi.string().min(3).max(50).required(),
    })
    const {error, value} = schema.validate(req.body);

    if(error) return res.status(400).json(error.details[0].message);
    const {username, todo, name} = value;

    Todo.query().insert({
        userName: username,
         toDo: todo,
          listName: name})
          .then(() => { 
    res.status(202).json('Todo added');
    }).catch((error) => {

    res.status(400).json(error);
    })
}
