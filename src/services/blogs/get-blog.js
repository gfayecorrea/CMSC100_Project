import { getDB } from '../../utils/db/index.js';

export const getBlog = async (request, reply) => {
  const { params, username } = request;
  const { blogId: id } = params;

  // check if there is username (meaning logged in)
  if (!username) {
    return reply.badRequest('Sorry, you are not logged in.');
  }

  const db = await getDB();

  const { blogs } = db;

  if (!blogs[id]) {
    return reply.notFound('Blog not found.');
  }

  const comments = Object
    .entries(blogs[id].comments)
    .map(function ([id, comment]) {
      return {
        id,
        ...comment
      };
    })
    .sort(function (comment1, comment2) {
      return comment2.createdDate - comment1.createdDate;
    })
    .filter((comment) => (username === comment.username));

  blogs[id].comments = comments;

  return {
    id,
    ...blogs[id]
  };
};
