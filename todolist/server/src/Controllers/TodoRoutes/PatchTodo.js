const joi = require('joi');
const { knex } = require('../../Modules/DatabaseConnection');
const { Model } = require("objection");
  Model.knex(knex);

  class Todo extends Model {
    static get tableName() {
        return "todo";
        }
    }

    //Endpoint for Todo page

module.exports.PatchTodo =  async (req, res) => {
    const schema = joi.object({
        username: joi.string().min(3).max(36).required(),
        todo: joi.string().min(3).max(300).required(),
        id: joi.number().required(),
    })
    const {error, value} = schema.validate(req.body);

    if(error) return res.status(400).json(error.details[0].message);
    const {todo, id} = value;
    try {
    await Todo.query().findById(id).patch({
        toDo: todo,
    })
    res.status(201).json('Todo updated');
    }
    catch (err) {
        res.status(500).json("Internal server error");
    }
}
