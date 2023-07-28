const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function addProduct(req, res) {
  try {
    const { productName, description, purchasePrice, sellingPrice } = req.body;

    const productExists = await prisma.product.findUnique({
      where: {
        productName: productName,
      },
    });

    if (productExists) {
      res
        .status(400)
        .json({ status: false, message: "Product already exists" });
      return;
    } else if (purchasePrice > sellingPrice) {
      res
        .status(400)
        .json({
          status: false,
          message: "Selling price cannot be less than purchase price",
        });
      return;
    } else {
      const product = await prisma.product.create({
        data: {
          productName,
          description,
          purchasePrice,
          sellingPrice,
          quantity: 0,
        },
      });
      res.json({
        success: true,
        message: "Product added successfully",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Something went wrong" });
  }
}
async function getProducts(req, res) {
  const productName = req.query.productName;
  try {
    if (productName) {
      const products = await prisma.product.findMany({
        where: {
          productName: {
            contains: productName,
            // mode: "insensitive",
          },
        },
      });
      res.json(products);
      return;
    } else {
      const products = await prisma.product.findMany();
      res.json(products);
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Something went wrong" });
  }
}

async function updateProduct(req, res) {
  try {
    const { productName, description, purchasePrice, sellingPrice, quantity } =
      req.body;
    const product = await prisma.product.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: {
        productName,
        description,
        purchasePrice,
        sellingPrice,
        // quantity,
      },
    });
    res.json({
      success: true,
      message: "Product updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Something went wrong" });
  }
}
async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    await prisma.product.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Something went wrong" });
  }
}

module.exports = { addProduct, getProducts, updateProduct, deleteProduct };
