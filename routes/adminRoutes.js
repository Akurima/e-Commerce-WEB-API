const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

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

router.get("/", adminController.index);
router.post("/", adminController.store);
router.get("/:id", adminController.show);
router.patch("/:id", adminController.update);
router.delete("/:id", adminController.destroy);

module.exports = router;
