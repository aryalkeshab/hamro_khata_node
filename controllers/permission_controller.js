const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function addPermission(req, res) {
  try {
    const { name, slug, roleid } = req.body;
    const permission = await prisma.Permission.create({
      data: {
        name,
        slug,
      },
    });
    const rolepermission = await prisma.rolesPermission.create({
      data: {
        permission: {
          connect: {
            id: permission.id,
          },
        },
        role: {
          connect: {
            id: roleid,
          },
        },
      },
    });
    res.json({
      success: true,
      message: "Permission added successfully",
      data: permission,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
// addPermission({
//   body: {
//     name: "Purchase Order Create",
//     slug: "purchase_order_create",
//   },
// });
async function getPermissions(req, res) {
  try {
    const permissions = await prisma.Permission.findMany();
    res.json({
      success: true,
      message: "Permission fetched successfully",
      data: permissions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
module.exports = {
  addPermission,
  getPermissions,
};
