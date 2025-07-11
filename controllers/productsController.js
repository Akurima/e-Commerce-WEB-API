const { Products, Category } = require("../models"); // ✅ ahora se importa Category también

// Mostrar todos los productos
async function index(req, res) {
  try {
    const products = await Products.findAll({
      include: {
        model: Category,
        attributes: ["name"], // ✅ solo traemos el nombre de la categoría
      },
    });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error en INDEX", error);
    res.status(500).json({ error: "ERROR: Contacte con un administrador." });
  }
}

// Mostrar un producto específico por ID
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

// Crear un nuevo producto
async function store(req, res) {
  const { name, description, image, price, stock } = req.body;
  try {
    const newProduct = await Products.create({ name, description, image, price, stock });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error en STORE", error);
    res.status(500).json({ error: "ERROR: El producto no pudo ser creado." });
  }
}

// Actualizar un producto existente
async function update(req, res) {
  const { name, description, image, price, stock } = req.body;
  try {
    const product = await Products.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    await product.update({ name, description, image, price, stock });
    res.json(product);
  } catch (error) {
    console.error("Error en UPDATE", error);
    res.status(500).json({ error: "ERROR: No se pudo actualizar el producto." });
  }
}

// Eliminar un producto
async function destroy(req, res) {
  try {
    const product = await Products.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    await product.destroy();
    res.json({ message: "El producto fue eliminado" });
  } catch (error) {
    console.error("Error en DESTROY", error);
    res.status(500).json({ error: "ERROR: No se pudo eliminar el producto." });
  }
}

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
