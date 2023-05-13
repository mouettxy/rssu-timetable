import Hapi from "@hapi/hapi";
import { JWT_SECRET } from "./config.js";
import Jwt from "@hapi/jwt";
import { User } from "./db/models/user.js";

export async function createServer() {
  const server = Hapi.server({
    port: 8090,
    host: "localhost",
    "routes": {
      "cors": true
  }
  });

  // Register the JWT plugin
  await server.register(Jwt);

  // Define the JWT authentication strategy
  server.auth.strategy("jwt", "jwt", {
    keys: JWT_SECRET,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      nbf: false,
      exp: true,
      maxAgeSec: 3600,
      timeSkewSec: 15,
    },
    validate: async (artifacts, request, h) => {
      try {
        const user = await User.findById(artifacts.decoded.payload.id);

        if (!user) {
          return { isValid: false };
        }

        return { isValid: true, credentials: { user } };
      } catch (err) {
        return { isValid: false };
      }
    },
  });

  await server.start();

  console.log("Server running on %s", server.info.uri);

  return server;
}
