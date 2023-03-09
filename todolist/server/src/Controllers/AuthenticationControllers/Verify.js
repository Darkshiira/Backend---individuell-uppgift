const joi = require('joi');
const { knex } = require('../../Modules/DatabaseConnection');
const { Model } = require("objection");
  Model.knex(knex);

  class User extends Model {
    static get tableName() {
      return "user";
    }
  };

// Endpoint for Nav bar

module.exports.Verify =  async (req, res) => {
    const schema = joi.object({
        username: joi.string().min(3).max(36).required(),
    })
    const {error, value} = schema.validate(req.query);
    if(error) return res.status(400).json(error.details[0].message);
    const {username} = value;
    try {
    const user = await User.query().select().where('userName', username )
    if (user.length === 0) return res.status(404).json('No such user');
    res.status(200).json(user);
}
catch (err) {
    res.status(500).json("Internal server error");
  }
}