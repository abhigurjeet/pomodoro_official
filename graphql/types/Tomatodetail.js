import { builder } from "../builder";
import prisma from "@/lib/prisma";

builder.prismaObject("Tomatodetail", {
  fields: (t) => ({
    id: t.exposeID("id"),
    user: t.relation("user"),
    activeTask: t.exposeInt("activeTask"),
    currentDate: t.exposeString("currentDate"),
    weeklyTomato: t.exposeIntList("weeklyTomato"),
    weeklyFocusTime: t.exposeIntList("weeklyFocusTime"),
  }),
});
builder.queryField("tomatoDetailsByEmail", (t) =>
  t.prismaField({
    type: ["Tomatodetail"],
    args: {
      email: t.arg.string({ required: true }),
    },
    resolve: (query, _parent, args, _ctx, _info) => {
      let { email } = args;
      return prisma.tomatodetail.findMany({
        ...query,
        where: { user: { email } },
      });
    },
  })
);
builder.mutationField("updateActiveTask", (t) =>
  t.prismaField({
    type: "Tomatodetail",
    args: {
      id: t.arg.int({ required: true }),
      activeTask: t.arg.int({ required: true }),
    },
    resolve: async (query, _parent, args, ctx) => {
      let { id, activeTask } = args;
      if (!(await ctx).user) {
        throw new Error("You have to be logged in to perform this action");
      }
      return prisma.tomatodetail.update({
        ...query,
        where: { id },
        data: { activeTask: activeTask },
      });
    },
  })
);
builder.mutationField("updateWeeklyTomato", (t) =>
  t.prismaField({
    type: "Tomatodetail",
    args: {
      id: t.arg.int({ required: true }),
      currentDate: t.arg.string(),
      weeklyTomato: t.arg.intList({ required: true }),
      weeklyFocusTime: t.arg.intList({ required: true }),
    },
    resolve: async (query, _parent, args, ctx) => {
      let { id, currentDate, weeklyTomato, weeklyFocusTime } = args;
      if (!(await ctx).user) {
        throw new Error("You have to be logged in to perform this action");
      }
      return prisma.tomatodetail.update({
        ...query,
        where: { id },
        data: { weeklyTomato, currentDate, weeklyFocusTime },
      });
    },
  })
);
