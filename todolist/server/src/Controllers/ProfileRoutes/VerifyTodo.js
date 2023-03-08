const joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { knex } = require('../../Modules/DatabaseConnection');
const { Model } = require("objection");
  Model.knex(knex);

  class Todo extends Model {
    static get tableName() {
        return "todo";
        }
    }

module.exports.VerifyTodo =  async (req, res) => {
    const schema = joi.object({
        username: joi.string().min(3).max(30).required(),
    })
    const {error, value} = schema.validate(req.body);
    if(error) return res.status(400).json(error.details[0].message);
    const {username} = value;

    const todo = await Todo.query().select().where('userName', username )
    if (todo.length === 0) return res.status(404).json('You dont have anything to do');
    res.status(200).json(todo);
}

