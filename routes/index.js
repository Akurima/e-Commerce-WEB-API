/*
 * No hay una única forma de organizar las rutas de un sitio web.
 * Una alternativa podría ser organizar las rutas por recurso (o entidad):
 */

const userRoutes = require("./userRoutes");
const productsRoutes = require("./productsRoutes");
const adminRoutes = require("./adminRoutes");
const ordersRoutes = require("./ordersRoutes");
const authRoutes = require("./authRoutes")

module.exports = (app) => {
  /*
   * Al construir una API REST, la convención es que las rutas relativas a
   * un recurso (o entidad) tengan como prefijo el nombre de dicho recurso
   * en inglés y en plural.
   *
   * Ejemplo:
   * Las rutas relativas a los usuarios se agrupan bajo la URL `/users`
   * (en inglés y en plural). Del mismo modo, las rutas relativas a los artículos
   * se deberían agrupar bajo la URL `/articles` (en inglés y en plural).
   */
  app.use("/users", userRoutes);
  app.use("/products", productsRoutes);
  app.use("/orders", ordersRoutes);
  app.use("/admin", adminRoutes);
  app.use("/tokens", authRoutes);
};
