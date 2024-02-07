import SchemaBuilder from "@pothos/core";
import PrismaPlugin from "@pothos/plugin-prisma";
import prisma from "@/lib/prisma";
import { createContext } from "./context";

const builder = new SchemaBuilder({
  plugins: [PrismaPlugin],
  prisma: {
    client: prisma,
  },
  context: createContext,
  defaultFieldNullability: true,
});
builder.queryType({
  fields: (t) => ({
    ok: t.boolean({
      resolve: () => true,
    }),
  }),
});
builder.mutationType({});
export { builder };
