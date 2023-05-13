import jwt from 'jsonwebtoken'
import Joi from 'joi'
import { JWT_SECRET } from '../config.js';
import { User } from '../db/models/user.js'

export function buildAuthRoutes(server) {
  server.route({
    method: "POST",
    path: "/auth/register",
    handler: async (request, h) => {
      try {
        const { email, password, group } = request.payload;
        const user = new User({ email, password, group });

        try {
          await user.save();
        } catch (error) {
          if (error.code === 11000) {
            return h.response({ message: 'Аккаунт уже существует' }).code(400);
          }
        }

        const token = jwt.sign(
          { id: user._id, email: user.email, group: user.group, telegramAuthKey: user.telegramAuthKey, telegramId: user.telegramId },
          JWT_SECRET,
          {
            expiresIn: "14d",
          }
        );

        return h.response({ token, message: "User registered successfully" }).code(200);
      } catch (err) {
        return h.response({ message: err.message }).code(400);
      }
    },
    options: {
      validate: {
        payload: Joi.object({
          email: Joi.string().required(),
          password: Joi.string().required(),
          group: Joi.string().required(),
        }),
      },
    },
  });
  
  server.route({
    method: "POST",
    path: "/auth/authenticate",
    handler: async (request, h) => {
      const { email, password } = request.payload;
      const user = await User.findOne({ email });
  
      if (!user) {
        return h.response({ message: "Invalid username or password" }).code(401);
      }
  
      const isPasswordValid = await user.comparePassword(password);
  
      if (!isPasswordValid) {
        return h.response({ message: "Invalid username or password" }).code(401);
      }
  
      const token = jwt.sign(
        { id: user._id, email: user.email, group: user.group, telegramAuthKey: user.telegramAuthKey, telegramId: user.telegramId },
        JWT_SECRET,
        {
          expiresIn: "14d",
        }
      );
  
      return h
        .response({ token, message: "Authentication successful" })
        .code(200);
    },
    options: {
      validate: {
        payload: Joi.object({
          email: Joi.string().required(),
          password: Joi.string().required(),
        }),
      },
    },
  });  
}