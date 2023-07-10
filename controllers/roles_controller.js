const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function addRoles(req, res) {
  try {
    const { name } = req.body;
    const userPermission = req.body.permissions;

    // userPermissionList = userPermission.map((permission) => {
    //   return { id: permission };
    // });

    const role = await prisma.roles.create({
      data: {
        name,
        userPermission: {
          connect: userPermission,
        },
      },
    });
    res.json({
      success: true,
      message: "Role added successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}
// addRoles({
//   body: {
//     name: "Admin",
//     userPermission: [
//       {
//         id: 1,
//       },
//       {
//         id: 2,
//       },
//     ],
//   },
// });

async function getRoles(req, res) {
  const { roleid } = req.body;
  try {
    const roles = await prisma.roles.findMany();
    res.json({
      success: true,
      message: "Roles fetched successfully",
      data: roles,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
}

module.exports = {
  addRoles,
  getRoles,
};
