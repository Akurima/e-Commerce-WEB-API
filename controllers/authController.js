const { User } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Validación básica
    if (!email || !password) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    // Buscar usuario por email
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: "Email o contraseña incorrectos" });
    }

    // Comparar contraseña
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Email o contraseña incorrectos" });
    }

    // Generar token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || "UnStringMuySecreto",
      { expiresIn: "1h" },
    );

    // Devolver token y datos del usuario
    return res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.error("Error en LOGIN:", error);
    res.status(500).json({ error: "ERROR: Contacte con un administrador" });
  }
}

module.exports = { login };
