const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function createUser(req, res) {
  try {
    const { firstName, lastName, email, address, password, role } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    const selectedRole = await prisma.roles.findUnique({
      where: { name: role },
    });

    //
    const firstNameAndPasswordSame = password.includes(firstName);

    if (firstNameAndPasswordSame) {
      res
        .status(400)
        .json({ status: false, message: "Password cannot contain first name" });
      return;
    }
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "Email already exists",
      });
      return;
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword2 = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        address,
        password: hashedPassword2,
      },
    });
    const userRole = await prisma.userRolePermission.create({
      data: {
        user: {
          connect: {
            id: user.id,
          },
        },
        role: {
          connect: {
            // TODO: Change this to actual role id
            id: selectedRole.id,
          },
        },
      },
    });
    res.json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      succcess: false,
      message: "Something went wrong" + error,
    });
  }
}

async function loginUser(req, res) {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !bcrypt.compare(password, user.password)) {
      res.status(401).json({
        status: false,
        message: "Invalid username or password",
      });
      return;
    }

    const userId = user.id;

    const existingToken = await prisma.userTokens.findFirst({
      where: { userId },
    });

    if (existingToken) {
      clearTimeout(existingToken.expiry);
      await prisma.userTokens.delete({
        where: { id: existingToken.id },
      });
    }

    const token = jwt.sign(
      { userId: user.id, roleId: 5 },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    const tokenExpiry = setTimeout(async () => {
      await prisma.userTokens.delete({
        where: { userId },
      });
    }, 3600000);

    await prisma.userTokens.create({
      data: {
        userId: user.id,
        token,
        expiry: new Date(Date.now() + 3600000), // Set the token expiry time
      },
    });

    res.json({
      success: true,
      message: "User logged in successfully",
      userId: user.id,
      token: {
        accessToken: token,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ status: false, message: "Error authenticating user" });
    // next(error);
  }
}
module.exports = { createUser, loginUser };
