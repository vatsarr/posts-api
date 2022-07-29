const { restart } = require("nodemon");
const postsModel = require("../models/posts-model");

function getAll(ctx) {
  ctx.body = postsModel.posts;
}

function getById(ctx) {
  const index = ctx.request.params.id;
  if (
    ctx.request.params.id < 0 ||
    ctx.request.params.id > postsModel.posts.length - 1
  ) {
    ctx.status = 404;
    return;
  }

  ctx.body = postsModel.posts[index];
}

function deleteById(ctx) {
  const index = ctx.request.params.id;
  postsModel.posts.splice(index, 1);

  ctx.status = 204;
}

function create(ctx) {
  const text = ctx.request.body.text;
  if (!text || text === " ") {
    ctx.status = 400;
    return;
  }

  postsModel.posts.push({ text });
  ctx.status = 201;
}

module.exports = { getAll, getById, deleteById, create };
