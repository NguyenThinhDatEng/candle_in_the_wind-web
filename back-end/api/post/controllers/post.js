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
  //   console.log(post);
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
      username: comment.customer.username,
      url: comment.customer.avatar?.url,
    };
    allOfComments.push(o);
  }
  data = {
    id: post.id,
    lockComment: post.lockComment,
    title: post.title,
    content: post.content,
    published_at: post.published_at,
    username: post.customer.username,
    avatar: post.avatar?.url,
    comments: allOfComments,
  };

  return data;
};

module.exports = { findOne };
