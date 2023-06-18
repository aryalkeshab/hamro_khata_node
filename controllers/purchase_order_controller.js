// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

// async function createPurchaseOrder(req, res) {
//   try {
//     const {
//       purchaseOrderNo,
//       vendorId,
//       remarks,
//       userId,
//       orders,
//       total,
//       vendorName,
//     } = req.body;

//     const ordersData = orders.map((order) => {
//       return {
//         purchaseOrder: {
//           connect: {
//             id: order.purchaseOrderId,
//           },
//         },
//         product: {
//           connect: {
//             id: order.productId,
//           },
//         },
//         quantity: order.quantity,
//         purchasePrice: order.purchasePrice,
//         total: order.total,
//       };
//     });
//     console.log(ordersData);
//     const vendorName1 = await prisma.vendor.findUnique({
//       where: { id: vendorId },
//     });
//     console.log(vendorName1.name);

//     const purchaseOrder = await prisma.purchaseOrder.create({
//       data: {
//         purchaseOrderNo,
//         remarks,
//         vendorName: vendorName1.name,
//         user: {
//           connect: {
//             id: userId,
//           },
//         },
//         total,
//         vendor: {
//           connect: {
//             id: vendorId,
//           },
//         },
//         orders: {
//           create: ordersData,
//         },
//       },
//       include: {
//         orders: true,
//       },
//     });
//     res.json({
//       success: true,
//       message: "Purchase Order created successfully",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// }
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createPurchaseOrder(req, res) {
  try {
    const { purchaseOrderNo, vendorId, remarks, userId, orders, total } =
      req.body;

    const ordersData = orders.map((order) => {
      return {
        product: {
          connect: {
            id: order.productId,
          },
        },
        quantity: order.quantity,
        purchasePrice: order.purchasePrice,
        total: order.total,
      };
    });
    console.log(ordersData);

    const purchaseOrder = await prisma.purchaseOrder.create({
      data: {
        purchaseOrderNo,
        remarks,
        user: {
          connect: {
            id: userId,
          },
        },
        total,
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
    res.json({
      success: true,
      message: "Purchase Order created successfully",
      data: purchaseOrder,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

module.exports = {
  createPurchaseOrder,
};
