const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

function permissionMiddleware(permissionSlug) {
  return async function (req, res, next) {
    const token = req.headers.authorization;
    const roleId = jwt.decode(token).roleId;
    const permissiondata = await prisma.Permission.findFirst({
      where: {
        slug: permissionSlug,
      },
    });
    if (!permissiondata) {
      res.status(403).json({ error: "Permission not found!" });
      return;
    }
    const rolePermission = await prisma.rolesPermission.findFirst({
      where: {
        roleid: roleId,
        permissionid: permissiondata.id,
      },
    });
    if (!rolePermission) {
      res
        .status(403)
        .json({ error: "You don't have permission to view this page!" });
      return;
    }
    console.log("permission:", permissionSlug);
    next();
  };
}
// function permissionMiddleware(permission) {
//   return function (req, res, next) {
//     const token = req.headers.authorization;

//     const roleId = jwt.decode(token).roleId;
//     console.log("permission:", permission);
//     console.log("Role ID:", roleId);

//     next();
//   };
// }

module.exports = permissionMiddleware;
