const joi = require('joi');
const bcrypt = require('bcrypt');
const { knex } = require('../../Modules/DatabaseConnection');
const { Model } = require("objection");
  Model.knex(knex);

  class Users extends Model {
    static get tableName() {
      return "user";
    }
  };

module.exports.Register =  async (req, res) => {
    const schema = joi.object({
        username: joi.string().min(3).max(30).required(),
        password: joi.string().min(6).max(30).required()
    });

    const {error, value} = schema.validate(req.body);
    
    if(error) return res.status(400).json(error.details[0].message);
    const {username, password} = value;
    
    try {
    const user = await Users.query().select().where('userName', username );
    
    if(user.length > 0) return res.status(409).json('Username already exists');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await Users.query().insert({
        userName: username,
        userPassword: hashedPassword
    });

    if (!newUser) return res.status(500).json('User not created'); // This is not needed, because if the query fails, it will throw an error and go to the catch block

    res.status(201).json('User created');
}
catch (err) {
    if (err === 'ER_DUP_ENTRY') {
        res.statusCode = 409;
        res.json("Duplicate entry");

    } else {
        res.statusCode = 500;
        res.json("Internal server error");
      }
}
};
