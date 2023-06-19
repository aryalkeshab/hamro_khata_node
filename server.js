const express = require("express");
const app = express();
const ErrorMiddleware = require("./middleware/errorMiddleware");

const usersRoutes = require("./routes/auth_routes");
const customerRoutes = require("./routes/customer_routes");
const vendorRoutes = require("./routes/vendor_routes");
const productRoutes = require("./routes/product_routes");
const purchaseRoutes = require("./routes/purchase_order_routes");
const salesRoutes = require("./routes/sales_order_routes");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");

app.use(express.json());
const swaggerDocument = YAML.load("./swagger_docs/swagger.yaml");

app.use("/home", (req, res) => {
  res.send(
    "Hello World from Keshab Aryal, building a REST API based on Inventory Management System"
  );
  res.end();
});

app.use(ErrorMiddleware);

app.use("/api/auth", usersRoutes);
app.use("/api/customer", customerRoutes);
app.use("/api/vendor", vendorRoutes);
app.use("/api/product", productRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/purchase", purchaseRoutes);
app.use("/api/sales", salesRoutes);
app.listen(2122, "192.168.1.72", () => {
  console.log("Server running on http://192.168.1.72:2122");
});
