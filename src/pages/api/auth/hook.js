import prisma from "@/lib/prisma";
import Cors from "micro-cors";

const cors = Cors({
  allowedMethods: ["GET", "POST"], // Allow only certain HTTP methods
  origin: "*", // Allow requests from any origin (replace '*' with your domain)
});

const handler = async (req, res) => {
  try {
    const { email, secret } = req.body;
    if (req.method !== "POST") {
      return res.status(403).json({ message: "Method not allowed" });
    }
    if (req.body.secret !== process.env.AUTH0_HOOK_SECRET) {
      return res
        .status(403)
        .json({ message: `You must provide the secret 🤫` });
    }
    if (email) {
      const existingUser = await prisma.user.findUnique({ where: { email } });
      if (existingUser) {
        return res
          .status(200)
          .json({ message: "User with the same email already exists" });
      }
      const newUser = await prisma.user.create({
        data: { email },
      });
      await prisma.timersetting.create({
        data: {
          user: { connect: { id: newUser.id } },
        },
      });
      let currentDate = new Date();
      currentDate.setHours(0, 0, 0, 0);
      currentDate = currentDate.toISOString();
      await prisma.tomatodetail.create({
        data: {
          user: { connect: { id: newUser.id } },
          currentDate: currentDate,
        },
      });
      return res.status(200).json({
        message: `User with email: ${email} has been created successfully!`,
      });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default cors(handler);
