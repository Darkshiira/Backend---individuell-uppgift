const joi = require('joi');
const { knex } = require('../../Modules/DatabaseConnection');
const { Model, UniqueViolationError } = require("objection");
  Model.knex(knex);

  class List extends Model {
    static get tableName() {
        return "lists";
        }
    }

module.exports.AddTodoList =  async (req, res) => {
    const schema = joi.object({
        username: joi.string().min(3).max(36).required(),
        name: joi.string().min(3).max(50).required(),
    })
    const {error, value} = schema.validate(req.body);

    if(error) return res.status(400).json(error.details[0].message);
    const {name, username} = value;

    List.query().insert({userName: username, listName: name}).then(() => { 
    res.status(201).json('Todo added');
    }).catch((error) => {

        if (UniqueViolationError) return res.status(409).json('List already excists');

    res.status(400).json(error);
    })
}
