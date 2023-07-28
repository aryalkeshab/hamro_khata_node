// seed.js
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

// async function cleanup() {
//   await prisma.user.deleteMany({});
//   await prisma.roles.deleteMany();
//   await prisma.permissions.deleteMany();
//   await prisma.userRolePermission.deleteMany();
//   await prisma.product.deleteMany();
//   await prisma.customer.deleteMany();
//   await prisma.vendor.deleteMany();
//   await prisma.salesOrder.deleteMany();
//   await prisma.purchaseOrder.deleteMany();
//   await prisma.salesOrderProduct.deleteMany();
//   await prisma.purchaseOrderProduct.deleteMany();
// }

async function main() {
  //   await cleanup();
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash("Admin123", salt);

  const users = {
    firstName: "Keshab",
    lastName: "Aryal",
    email: "keshabaryal03@gmail.com",
    address: "Pokhara",
    password: hashedPassword,
  };

  await prisma.user.create({
    data: users,
  });

  const roles = [
    {
      name: "Admin",
    },
    {
      name: "Staff",
    },
    {
      name: "User",
    },
  ];

  for (const role of roles) {
    await prisma.roles.create({
      data: role,
    });
  }
  const permissions = [
    {
      name: "Purchase Order Create",
      slug: "purchase_order_create",
    },
    {
      name: "Purchase Order List",
      slug: "purchase_order_list",
    },
    {
      name: "Sales Order Create",
      slug: "sales_order_create",
    },
    {
      name: "Sales Order List",
      slug: "sales_order_list",
    },

    {
      name: "Get Customer List",
      slug: "get_customer_list",
    },
    { name: "Create Customer", slug: "create_customer_list" },
    {
      name: "create_vendor",
      slug: "create_vendor",
    },
    {
      name: "get_vendor_list",
      slug: "get_vendor_list",
    },
    {
      name: "delete_vendor",
      slug: "delete_vendor",
    },
    {
      name: "update_vendor",
      slug: "update_vendor",
    },
    {
      name: "get_vendor",
      slug: "get_vendor",
    },
    {
      name: "Update Customer",
      slug: "update_customer",
    },
    {
      name: "Delete Customer",
      slug: "delete_customer",
    },
    {
      name: "Add Product",
      slug: "add_product",
    },
    {
      name: "update Product",
      slug: "update_product",
    },
    {
      name: "delete Product",
      slug: "delete_product",
    },
    {
      name: "get Product",
      slug: "get_product",
    },
  ];
  for (const permission of permissions) {
    await prisma.permission.create({
      data: permission,
    });
  }
  await prisma.userRolePermission.create({
    data: {
      user: {
        connect: {
          id: 1,
        },
      },
      role: {
        connect: {
          // TODO: Change this to actual role id
          id: 1,
        },
      },
    },
  });

  console.log("Seed data created successfully!");
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
