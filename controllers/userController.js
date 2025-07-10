const { User } = require("../models");
const bcrypt = require("bcrypt");

// 🆕 Registro de nuevo usuario
async function registerUser(req, res) {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ error: "Faltan datos obligatorios." });
    }

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "El email ya está registrado." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Usuario creado con éxito." });
  } catch (error) {
    console.error("Error en registerUser:", error);
    res.status(500).json({ error: "ERROR: Contacte con un administrador." });
  }
}

// Display a listing of the resource.
async function index(req, res) {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error("Error en INDEX", error);
    res.status(500).json({ error: "ERROR: Contacte con un administrador." });
  }
}

// Display the specified resource.
async function show(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado." });
    }
    res.json(user);
  } catch (error) {
    console.error("Error en SHOW", error);
    res.status(500).json({ error: "ERROR: Contacte con un administrador." });
  }
}

// Store a newly created resource in storage.
async function store(req, res) {
  const { fistName, lastName, phone, address, order, email, password } = req.body;

  if (!fistName || !lastName || !phone || !address || !order || !email || !password) {
    return res.status(400).json({ error: "ERROR: Todos los campos son obligatorios." });
  }

  if (password.length < 8) {
    return res
      .status(400)
      .json({ error: "ERROR: La contraseña debe tener al menos 8 caracteres." });
  }

  if (!/\d/.test(password)) {
    return res
      .status(400)
      .json({ error: "ERROR: La contraseña debe contener al menos un número." });
  }

  if (!/[!@#$%^&*]/.test(password)) {
    return res
      .status(400)
      .json({ error: "ERROR: La contraseña debe contener al menos un carácter especial." });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fistName,
      lastName,
      phone,
      address,
      order,
      email,
      password: hashedPassword,
    });

    res.status(201).json(user);
  } catch (error) {
    console.error("Error en STORE", error);
    res.status(500).json({ error: "ERROR: Contacte con un administrador." });
  }
}

// Update the specified resource in storage.
async function update(req, res) {
  const { fistName, lastName, phone, address, order, email, password } = req.body;

  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado." });

    const updatedData = {
      fistName,
      lastName,
      phone,
      address,
      order,
      email,
    };

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedData.password = hashedPassword;
    }

    await user.update(updatedData);
    res.json(user);
  } catch (error) {
    console.error("Error en UPDATE", error);
    res.status(500).json({ error: "ERROR: Contacte con un administrador." });
  }
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: "Usuario no encontrado." });

    await user.destroy();
    res.json({ message: "Usuario eliminado correctamente." });
  } catch (error) {
    console.error("Error en DESTROY", error);
    res.status(500).json({ error: "ERROR: Contacte con un administrador." });
  }
}

module.exports = {
  registerUser, // 🧩 nuevo export
  index,
  show,
  store,
  update,
  destroy,
};
