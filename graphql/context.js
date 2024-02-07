const { getSession } = require("@auth0/nextjs-auth0");

async function createContext({ req, res }) {
  const session = await getSession(req, res);
  if (!session || typeof session === "undefined") return {};

  const { user, accessToken } = session;

  return {
    user,
    accessToken,
  };
}

module.exports = { createContext };
