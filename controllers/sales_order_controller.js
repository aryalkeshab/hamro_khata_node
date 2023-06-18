const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createSalesOrder(req, res) {
  try {
    const { customerId, remarks, userId, orders } = req.body;
    const ordersData = orders.map((order) => {
      return {
        product: {
          connect: {
            id: order.productId,
          },
        },
        quantity: order.quantity,
        sellingPrice: order.sellingPrice,
        total: order.quantity * order.sellingPrice,
      };
    });

    console.log(ordersData);

    const grandTotal = ordersData.reduce((acc, order) => {
      return acc + order.total;
    }, 0);
    // check if the product is available in the stock
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: orders.map((order) => order.productId),
        },
      },
    });
    const productsMap = {};
    products.forEach((product) => {
      productsMap[product.id] = product;
    });
    const invalidOrders = orders.filter(
      (order) => order.quantity > productsMap[order.productId].quantity
    );
    if (invalidOrders.length > 0) {
      res.status(400).json({ error: "Quantity not available" });
      return;
    }

    const salesOrder = await prisma.salesOrder.create({
      data: {
        salesOrderNo: "121",
        remarks,
        customerName: {
          connect: {
            id: customerId,
          },
        },
        User: {
          connect: {
            id: userId,
          },
        },
        total: grandTotal,

        orders: {
          create: ordersData,
        },
      },
    });
    // decrease the quantity of the product
    const updateQuantityPromises = orders.map((order) => {
      return prisma.product.update({
        where: {
          id: order.productId,
        },
        data: {
          quantity: {
            decrement: order.quantity,
          },
        },
      });
    });
    await Promise.all(updateQuantityPromises);
    console.log(salesOrder);
    res.json({
      success: true,
      message: "Sales Order created successfully",
      data: salesOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
async function getSalesOrders(req, res) {
  try {
    const salesOrders = await prisma.salesOrder.findMany({
      include: {
        orders: true,
      },
    });
    res.json({
      success: true,
      data: salesOrders,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
module.exports = {
  createSalesOrder,
  getSalesOrders,
};
