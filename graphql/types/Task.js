import { builder } from "../builder";
import prisma from "@/lib/prisma";
builder.prismaObject("Task", {
  fields: (t) => ({
    id: t.exposeID("id"),
    user: t.relation("user"),
    title: t.exposeString("title"),
    description: t.exposeString("description"),
    dueDate: t.exposeString("dueDate"),
    estTomato: t.exposeInt("estTomato"),
    tomato: t.exposeInt("tomato"),
    createDate: t.exposeString("createDate"),
    completedOn: t.exposeString("completedOn"),
    taskStatus: t.exposeString("taskStatus"),
  }),
});
builder.queryField("tasksByEmail", (t) =>
  t.prismaField({
    type: ["Task"],
    args: {
      email: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, ctx) => {
      const { email } = args;
      return prisma.task.findMany({
        ...query,
        where: { user: { email } },
      });
    },
  })
);
builder.mutationField("createTask", (t) =>
  t.prismaField({
    type: "Task",
    args: {
      title: t.arg.string({ required: true }),
      description: t.arg.string({ required: true }),
      dueDate: t.arg.string({ required: true }),
      estTomato: t.arg.int({ required: true }),
      completedOn: t.arg.string(),
      taskStatus: t.arg.string(),
      email: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, ctx) => {
      let {
        title,
        description,
        dueDate,
        estTomato,
        completedOn,
        taskStatus,
        email,
      } = args;

      if (!(await ctx).user) {
        throw new Error("You have to be logged in to perform this action");
      }
      return prisma.task.create({
        ...query,
        data: {
          title,
          description,
          dueDate,
          estTomato,
          completedOn,
          taskStatus,
          user: { connect: { email } },
        },
      });
    },
  })
);
builder.mutationField("deleteTask", (t) =>
  t.prismaField({
    type: "Task",
    args: {
      id: t.arg.int({ required: true }),
    },
    resolve: async (query, _parent, args, ctx) => {
      let { id } = args;
      if (!(await ctx).user) {
        throw new Error("You have to be logged in to perform this action");
      }
      return prisma.task.delete({
        ...query,
        where: { id: Number(id) },
      });
    },
  })
);
builder.mutationField("updateTaskStatus", (t) =>
  t.prismaField({
    type: "Task",
    args: {
      id: t.arg.int({ required: true }),
      taskStatus: t.arg.string({ required: true }),
      completedOn: t.arg.string(),
    },
    resolve: async (query, _parent, args, ctx) => {
      let { id, taskStatus, completedOn } = args;
      if (!(await ctx).user) {
        throw new Error("You have to be logged in to perform this action");
      }
      return prisma.task.update({
        ...query,
        where: { id },
        data: { taskStatus, completedOn },
      });
    },
  })
);
builder.mutationField("updateTaskTomato", (t) =>
  t.prismaField({
    type: "Task",
    args: {
      id: t.arg.int({ required: true }),
      tomato: t.arg.int(),
    },
    resolve: async (query, _parent, args, ctx) => {
      let { id, tomato } = args;
      if (!(await ctx).user) {
        throw new Error("You have to be logged in to perform this action");
      }
      return prisma.task.update({
        ...query,
        where: { id },
        data: { tomato },
      });
    },
  })
);
