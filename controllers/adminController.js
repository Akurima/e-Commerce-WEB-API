const { Admin } = require('../models');
const bcrypt = require('bcrypt');
/*
 * Este archivo se puede usar como referencia para crear el controlador de
 * cualquier entidad del sistema.
 *
 * Por ejemplo, si se necesita crear un controlador para la entidad `Student`,
 * se sugiere hacer Copy & Paste de este archivo y nombrarlo como
 * `studentController.js`.
 *
 * No es necesario renombrar los métodos. A priori, la idea es que todos los
 * controladores tengan estos 5 métodos: index, show, store, update y destroy.
 *
 */

// Display a listing of the resource.
async function index(req, res) {
  try {
    const admins = await Admin.findAll();
    res.json(admins);
  } catch (error) {
    console.error('Error en INDEX', error);
    res.status(500).json({ error: 'ERROR: Contacte con un administrador.' });
  }
}

// Display the specified resource.
async function show(req, res) {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) {
      return res.status(404).json({ error: 'Admin no encontrado.' });
    }
    res.json(admin);
  } catch (error) {
    console.error('Error en SHOW', error);
    res.status(500).json({ error: 'ERROR: Contacte con un administrador.' });
  }
}

// Store a newly created resource in storage.
async function store(req, res) {
  const { firstname, lastname, email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); 
  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ error: 'ERROR: Todos los campos son obligatorios.' });
  }
  if (password.length < 8) {
    return res.status(400).json({ error: 'ERROR: La contraseña debe tener al menos 8 caracteres.' });
  }
  try {
    const admin = await Admin.create({
      firstname,
      lastname,
      email,
      password: hashedPassword, 
    });
    res.status(201).json(admin);
  } catch (error) {
    console.error('Error en STORE', error);
    res.status(500).json({ error: 'ERROR: Contacte con un administrador.' });
  }
}

// Update the specified resource in storage.
async function update(req, res) {
  const { firstname, lastname, email, password } = req.body;
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) return res.status(404).json({ error: 'Admin no encontrado.' });
    await admin.update({
      firstname,
      lastname,
      email,
      password,
    });
    res.json(admin);
  } catch (error) {
    console.error('Error en UPDATE', error);
    res.status(500).json({ error: 'ERROR: Contacte con un administrador.' });
  }
}

// Remove the specified resource from storage.
async function destroy(req, res) {
  try {
    const admin = await Admin.findByPk(req.params.id);
    if (!admin) return res.status(404).json({ error: 'Admin no encontrado.' });
    await admin.destroy();
    res.json({ message: 'Admin eliminado correctamente.' });
  } catch (error) {
    console.error('Error en DESTROY', error);
    res.status(500).json({ error: 'ERROR: Contacte con un administrador.' });
  }
}

// Otros handlers...
// ...

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
