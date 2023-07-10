const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createPurchaseOrder(req, res) {
  try {
    const { purchaseOrderNo, vendorId, remarks, userId, orders } = req.body;
    // check if the vendor exists
    const vendor = await prisma.vendor.findUnique({
      where: { id: vendorId },
    });
    if (!vendor) {
      res.status(400).json({ error: "Vendor does not exist" });
      return;
    }
    // check if the productId exists
    const productIds = orders.map((order) => order.productId);
    const products = await prisma.product.findMany({
      where: {
        id: {
          in: productIds,
        },
      },
    });
    if (products.length !== productIds.length) {
      res.status(400).json({ error: "Product does not exist" });
      return;
    }
    // check if the quantity is available
    // const productMap = {};
    // products.forEach((product) => {
    //   productMap[product.id] = product;
    // });
    // const invalidOrders = orders.filter(
    //   (order) => order.quantity > productMap[order.productId].quantity
    // );
    // if (invalidOrders.length > 0) {
    //   res.status(400).json({ error: "Quantity not available" });
    //   return;
    // }

    const ordersData = orders.map((order) => {
      return {
        product: {
          connect: {
            id: order.productId,
          },
        },
        quantity: order.quantity,
        purchasePrice: order.purchasePrice,
        total: order.quantity * order.purchasePrice,
      };
    });
    console.log(ordersData);
    const grandTotal = ordersData.reduce((acc, order) => {
      return acc + order.total;
    }, 0);

    const purchaseOrder = await prisma.purchaseOrder.create({
      data: {
        remarks,
        purchaseOrderNo: purchaseOrderNo,
        user: {
          connect: {
            id: userId,
          },
        },
        total: grandTotal,
        vendorName: {
          connect: {
            id: vendorId,
          },
        },
        orders: {
          create: ordersData,
        },
      },
      include: {
        orders: true,
      },
    });
    // if everything is fine, update the quantity
    const updateQuantityPromises = orders.map((order) => {
      return prisma.product.update({
        where: {
          id: order.productId,
        },
        data: {
          quantity: {
            increment: order.quantity,
          },
        },
      });
    });
    await Promise.all(updateQuantityPromises);

    const purchaseOrderNumber = "PO-" + purchaseOrder.id;

    const updateTable = await prisma.purchaseOrder.update({
      where: {
        id: purchaseOrder.id,
      },
      data: {
        purchaseOrderNo: purchaseOrderNumber,
      },
      include: {
        orders: true,
      },
    });
    res.json({
      success: true,
      message: "Purchase Order created successfully",
      data: updateTable,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

async function getPurchaseOrders(req, res) {
  const { purchaseOrderNo, customerName } = req.params;
  try {
    const customer = await prisma.customer.findone({
      where: {
        customerName: customerName,
      },
    });
    const customerId = customer.id;
    if (customerId || purchaseOrderNo) {
      const purchaseOrders = await prisma.purchaseOrder.findMany({
        where: {
          purchaseOrderNo: purchaseOrderNo,
          customerId: customerId,
        },
        include: {
          orders: true,
        },
      });
      res.json({
        success: true,
        data: purchaseOrders,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

module.exports = {
  createPurchaseOrder,
  getPurchaseOrders,
};
