"use strict";
const Response = require(`../../../utils/response`);

const findOne = async (ctx) => {
  // get post id
  const url = ctx.request.url.split("/");
  const id = url[url.length - 1];
  // get post
  let post = null;
  try {
    post = await strapi.query("post").findOne({ id });
  } catch (error) {
    return strapi.services.post.err500(ctx, error, "get post");
  }
  // get comments
  const comments = post.comments;
  // create data to response
  let data = [];
  let o = null;
  //   let
  for (var element in comments) {
    // get comment
    try {
    } catch (error) {
      return strapi.services.post.err500(ctx, error, "get comment");
    }
  }
};

module.exports = { findOne };
