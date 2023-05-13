import { getGroupsList } from '../parser/parser.js';
 
export function buildMiscRoutes(server) {
  server.route({
    method: "GET",
    path: "/misc/groups",
    handler: async (request, h) => {
      try {
        const collegeFaculty = 20;
        const groups = await getGroupsList(collegeFaculty);
        
        return h.response({ groups }).code(200);
      } catch (err) {
        return h.response({ message: err.message }).code(400);
      }
    },
  });
}