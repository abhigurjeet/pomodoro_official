import { builder } from "../builder";
import prisma from "@/lib/prisma";
builder.prismaObject("Timersetting", {
  fields: (t) => ({
    id: t.exposeID("id"),
    user: t.relation("user"),
    pomodoro: t.exposeInt("pomodoro"),
    shortBreak: t.exposeInt("shortBreak"),
    longBreak: t.exposeInt("longBreak"),
    pomoTechnique: t.exposeBoolean("pomoTechnique"),
    autoStart: t.exposeBoolean("autoStart"),
  }),
});
builder.queryField("timerSettingsByEmail", (t) =>
  t.prismaField({
    type: ["Timersetting"],
    args: {
      email: t.arg.string({ required: true }),
    },
    resolve: async (query, _parent, args, ctx) => {
      const { email } = args;
      return prisma.timersetting.findMany({
        ...query,
        where: { user: { email } },
      });
    },
  })
);
builder.mutationField("updateTimerSetting", (t) =>
  t.prismaField({
    type: "Timersetting",
    args: {
      id: t.arg.int({ required: true }),
      pomodoro: t.arg.int({ required: true }),
      shortBreak: t.arg.int({ required: true }),
      longBreak: t.arg.int({ required: true }),
      pomoTechnique: t.arg.boolean({ required: true }),
      autoStart: t.arg.boolean({ required: true }),
    },
    resolve: async (query, _parent, args, ctx) => {
      let { id, pomodoro, shortBreak, longBreak, pomoTechnique, autoStart } =
        args;

      if (!(await ctx).user) {
        throw new Error("You have to be logged in to perform this action");
      }

      return prisma.timersetting.update({
        ...query,
        where: { id },
        data: {
          pomodoro,
          shortBreak,
          longBreak,
          pomoTechnique,
          autoStart,
        },
      });
    },
  })
);
