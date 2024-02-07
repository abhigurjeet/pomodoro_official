import { builder } from "../builder";
import prisma from "@/lib/prisma";
builder.prismaObject("User", {
  fields: (t) => ({
    id: t.exposeID("id"),
    createdAt: t.exposeString("createdAt"),
    updatedAt: t.exposeString("updatedAt"),
    email: t.exposeString("email"),
    role: t.expose("role", { type: Role }),
    tasks: t.relation("tasks"),
    timerSettings: t.relation("timersettings"),
    tomatoDetails: t.relation("tomatodetails"),
  }),
});
const Role = builder.enumType("Role", {
  values: ["USER", "ADMIN"],
});
