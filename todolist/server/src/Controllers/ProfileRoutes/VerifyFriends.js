const joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { knex } = require('../../Modules/DatabaseConnection');
const { Model } = require("objection");
  Model.knex(knex);

  class Friends extends Model {
    static get tableName() {
      return "friends";
    }
  };

module.exports.VerifyFriends =  async (req, res) => {
    const schema = joi.object({
        username: joi.string().min(3).max(30).required(),
    })
    const {error, value} = schema.validate(req.body);
    if(error) return res.status(400).json(error.details[0].message);
    const {username} = value;

    const user = await Friends.query().select().where('userName', username )
    if (user.length === 0) return res.status(404).json('You dont have friends');
    res.status(200).json(user);
}

