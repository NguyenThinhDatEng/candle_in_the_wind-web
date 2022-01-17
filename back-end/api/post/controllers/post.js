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
  let data = null;
  let allOfComments = [];
  let o = null;
  let comment = null;
  //   let
  for (var tmpComment of comments) {
    // get comment
    try {
      comment = await strapi.services.comment.findOneID(tmpComment.id);
    } catch (error) {
      return strapi.services.post.err500(ctx, error, "get comment");
    }
    // create data
    o = {
      id: comment.id,
      content: comment.content,
      username: comment.customer?.username,
      url: comment.customer.avatar?.url,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
    };
    allOfComments.push(o);
  }
  data = {
    id: post.id,
    title: post.title,
    lockComment: post.lockComment,
    overview: post.overview,
    content: post.content,
    published_at: post.published_at,
    username: post.customer?.username,
    customer: post.customer?.id,
    comments: allOfComments,
  };

  return data;
};

module.exports = { findOne };
