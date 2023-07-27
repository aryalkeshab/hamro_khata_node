const express = require("express");
const app = express();
const ErrorMiddleware = require("./middleware/errorMiddleware");
const path = require("path");

const usersRoutes = require("./routes/auth_routes");
const customerRoutes = require("./routes/customer_routes");
const vendorRoutes = require("./routes/vendor_routes");
const productsRoutes = require("./routes/product_routes");
const purchaseRoutes = require("./routes/purchase_order_routes");
const salesRoutes = require("./routes/sales_order_routes");
const rolesRoutes = require("./routes/roles_routes");
const permissionRoutes = require("./routes/permission_routes");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

app.use(express.json());
const swaggerDocument = YAML.load("./swagger_docs/swagger.yaml");
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "front_end", "index.html"));
  // res.end();
});

app.use(ErrorMiddleware);

app.use("/api/auth", usersRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/product", productsRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/purchase", purchaseRoutes);
app.use("/api/sales", salesRoutes);
app.use("/api/roles", rolesRoutes);
app.use("/api/permission", permissionRoutes);

// app.listen(2122, "192.168.1.72", () => {
app.listen(2122, "192.168.1.70", () => {
  console.log("Server running on http://localhost:2122");
});

// maintrap in node
