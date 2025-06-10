const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");

/*
 * En general, para cada recurso (o entidad) de la API REST se tienen estos
 * 5 endpoints, que corresponden al CRUD estándar (Create-Read-Update-Delete).
 *
 * Notar que todos los endpoints de este archivo tienen como prefijo el string
 * defindo en el archivo `routes/index.js`. Es decir, en este ejemplo, todos
 * los endpoints de este archivo tienen como prefijo el string "/examples".
 *
 * En caso de necesitarlo, se pueden agregar, modificar o eliminar endpoints,
 * pero es importante tener mucho cuidado con no inventar URLs raras
 * como "/agregar-usuario" o "/delete-article". En lo posible, se deben
 * respetar las convenciones REST.
 */

router.get("/", ordersController.index);
router.post("/", ordersController.store);
router.get("/:id", ordersController.show);
router.patch("/:id", ordersController.update);
router.delete("/:id", ordersController.destroy);

module.exports = router;
