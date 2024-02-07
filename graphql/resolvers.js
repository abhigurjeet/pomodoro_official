import prisma from "../lib/prisma";
export const resolvers = {
  Query: {
    tasks: () => {
      return prisma.task.findMany();
    },
  },
};
