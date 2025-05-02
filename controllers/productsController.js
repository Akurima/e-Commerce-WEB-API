const { Products } = require("../models");

// Display a listing of the resource.
async function index(req, res) {
  try {
    const products = await Products.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error en INDEX", error);
    res.status(500).json({ error: "ERROR: Contacte con un administrador." });
  }
}

// Display the specified resource.
async function show(req, res) {
  try {
    const product = await Products.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error("Error en SHOW", error);
    res.status(500).json({ error: "ERROR: Contacte con un administrador." });
  }
}

// Store a newly created resource in storage.
async function store(req, res) {
  const { name, content, description, photo, price, stock } = req.body;
  try {
    const newProduct = await Products.create({ name, content, description, photo, price, stock });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error en STORE", error);
    res.status(500).json({ error: "ERROR: El producto no pudo ser creado." });
  }
}

// Update the specified resource in storage.
async function update(req, res) {}
const { name, content, description, photo, price, stock } = req.body;
try {
  const product = await Products.findByPk(req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  await product.update({ name, content, description, photo, price, stock });
  res.json(product);
} catch (error) {
  console.error("Error en UPDATE", error);
  res.status(500).json({ error: "ERROR: No se encontro un producto para actualizar." });
}

// Remove the specified resource from storage.
async function destroy(req, res) {}
try {
  const product = await Products.findByPk(req.params.id);
  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  await product.destroy();
  res.json({ message: "El producto fue eliminado" });
} catch (error) {
  console.error("Error en DESTROY", error);
  res.status(500).json({ error: "ERROR: No se encontro un producto para eliminar." });
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
