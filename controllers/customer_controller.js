const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createCustomer(req, res) {
  try {
    const { name, address, phone } = req.body;
    const customer = await prisma.customer.create({
      data: {
        name,
        address,
        phone,
      },
    });
    res.json({
      success: true,
      message: "Customer created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Something went wrong" });
  }
}

async function getCustomers(req, res) {
  const name = req.query.name;
  try {
    if (name) {
      const customers = await prisma.customer.findMany({
        where: {
          name: {
            contains: name,
            // mode: "insensitive",
          },
        },
      });
      res.json(customers);
      return;
    } else {
      const customers = await prisma.customer.findMany();
      res.json(customers);
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Something went wrong" });
  }
}
async function deleteCustomers(req, res) {
  try {
    const { id } = req.params;
    await prisma.customer.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Something went wrong" });
  }
}
module.exports = { createCustomer, getCustomers, deleteCustomers };
