const joi = require('joi');
const { knex } = require('../../Modules/DatabaseConnection');
const { Model } = require("objection");
Model.knex(knex);

class List extends Model {
  static get tableName() {
    return "lists";
  }
};

class Todo extends Model {
  static get tableName() {
    return "todo";
  }
}

// Endpoint for Profile page

module.exports.DeleteList = async (req, res) => {
    const schema = joi.object({
        id: joi.number().required(),
        username: joi.string().min(3).max(36).required(),
    })
    const {error, value} = schema.validate(req.query);

    if(error) return res.status(400).json(error.details[0].message);
    const {id, username} = value;
    try {
    const listname = await List.query().select('listName').where('userName', username ).andWhere('id', id)
    if (listname.length === 0) return res.status(404).json('Theres no such list');
    }
    catch (err) {
    return res.status(500).json("Internal server error");
    }
    try {
    await Todo.query().delete().where('listName', listname[0].listName)
    }
    catch (err) {
    return res.status(500).json("Internal server error");
    }
    try {
    const todo = await List.query().delete().where('userName', username ).andWhere('id', id)
    if (todo.length === 0) return res.status(404).json('Couldnt find the List');
    res.status(200).json('Your list has been deleted');
    }
    catch (err) {
      return res.status(500).json("Internal server error");
    }

};