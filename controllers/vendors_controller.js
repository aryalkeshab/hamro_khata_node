const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function createVendor(req, res) {
  console.log("Inside createVendor");
  try {
    const { name, address, phone } = req.body;
    await prisma.vendor.create({
      data: {
        name,
        address,
        phone,
      },
    });
    res.json({
      success: true,
      message: "Vendor created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Something went wrong" });
  }
}

async function getVendors(req, res) {
  try {
    const name = req.query.name;

    if (name) {
      const vendors = await prisma.vendor.findMany({
        where: {
          name: {
            contains: name,
            // mode: "insensitive",
          },
        },
      });
      res.json(vendors);
      return;
    } else {
      const vendors = await prisma.vendor.findMany();
      res.json(vendors);
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Something went wrong" });
  }
}

async function deleteVendor(req, res) {
  try {
    const { id } = req.params;
    await prisma.vendor.delete({
      where: {
        id: parseInt(id),
      },
    });
    res.json({
      success: true,
      message: "Vendor deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Something went wrong" });
  }
}

module.exports = { createVendor, getVendors, deleteVendor };
