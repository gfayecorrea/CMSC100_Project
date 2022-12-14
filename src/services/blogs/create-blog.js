import { getDB, saveDB } from '../../utils/db/index.js';
import { v4 } from 'uuid';

export const createBlog = async (request, reply) => {
  const { body, username } = request;
  const { title, description, isDone = false } = body;
  const db = await getDB();

  const id = v4();

  // check if there is username (meaning logged in)
  if (!username) {
    return reply.badRequest('Sorry, you are not logged in.');
  }

  const blog = {
    title,
    description,
    isDone,
    username,
    comments: {},
    createdDate: new Date().getTime(),
    updatedDate: new Date().getTime()
  };

  db.blogs[id] = blog;

  await saveDB(db);

  return {
    id,
    ...blog
  };
};
