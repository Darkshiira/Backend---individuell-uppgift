const joi = require('joi');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { knex } = require('../Modules/DatabaseConnection');
const { Model } = require("objection");
  Model.knex(knex);

  class Users extends Model {
    static get tableName() {
      return "user";
    }
  };


module.exports.Login = async (req, res) => {

    const schema = joi.object({
        username: joi.string().min(3).max(30).required(),
        password: joi.string().min(6).max(30).required()
    });
    const {error, value} = schema.validate(req.body);
    if(error) return res.status(400).json(error.details[0].message);

    const {username, password} = value;
    const user = await Users.query().select().where('userName', username );
    if(user.length === 0) return res.status(404).json('Username is wrong');

    const validPassword = await bcrypt.compare(password, user[0].userPassword);
    if(!validPassword) return res.status(401).json('Password is wrong');

    const token = jwt.sign({ username }, process.env.secret, { expiresIn: '1h' });

        res.cookie('authToken', token, {
          sameSite: 'none',
          secure: true,
          httpOnly: true
        })

    res.status(200).json('Login successful');
};