const { tr } = require("@faker-js/faker");
const { User } = require("../models");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const { where } = require("sequelize");


async function login(req, res) {
  try {
   const {email, password} = req.body;
   const user = User.findOne(
    ({where: {email} }) 
   )

   if (user) {
    const passwordMatch = await bcrypt.compare(
        password,
        user.password
    )
    if (!passwordMatch) {
        return res.status(401).json ({error: "Su contraseña no coincide"})
    }
    const token = jwt.sign({ sub: user.id }, "UnStringMuySecreto");
    return res.json(token)
   } else {return res.status(401).json ({error: "Su contraseña no coincide"}) } 

   }
   catch (error) {
        console.error('Error en DESTROY:', error);
        res.status(500).json({ error: 'ERROR: Contacte con un administrador' });
    }
}



module.exports = {login};