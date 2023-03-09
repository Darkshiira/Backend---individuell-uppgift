const joi = require('joi');
const { knex } = require('../../Modules/DatabaseConnection');
const { Model } = require("objection");
  Model.knex(knex);

  class Lists extends Model {
    static get tableName() {
        return "lists";
        }
    }

  class Todo extends Model {
    static get tableName() {
        return "todo";
        }
    }

    //Endpoint for Todo page

module.exports.AddTodotoList =  async (req, res) => {
    const schema = joi.object({
        username: joi.string().min(3).max(36).required(),
        newTodo: joi.string().min(3).max(300).required(),
        id: joi.number().required(),
    })
    const {error, value} = schema.validate(req.body);

    if(error) return res.status(400).json(error.details[0].message);
    const {username, newTodo, id} = value;
    try {
    const list = await Lists.query().select('listName').where('id', id).andWhere('userName', username);
    if (list.length === 0) return res.status(404).json('No such list');
    Todo.query().insert({
        userName: username,
        toDo: newTodo,
        listName: list[0].listName})
    res.status(201).json('Todo added')
  }
    catch (err) {

    res.status(500).json("Internal server error");
    }
}
