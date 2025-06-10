const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

/*
 * API endpoints relacionados a los artículos.
 *
 * Notar que todos estos endpoints tienen como prefijo el string "/articles",
 * tal como se definió en el archivo `routes/index.js`.
 */

router.get("/", productsController.index);
router.post("/", productsController.store);
router.get("/:id", productsController.show);
router.patch("/:id", productsController.update);
router.delete("/:id", productsController.destroy);

module.exports = router;
