"use strict";
const Response = require(`../../../utils/response`);

const findOne = async (ctx) => {
  // get cart id
  const url = ctx.request.url.split("/");
  const id = url[url.length - 1];

  // get cart
  let cart = null;
  try {
    cart = await strapi.query("cart").findOne({ id });
  } catch (error) {
    return strapi.services.cart.err500(ctx, error, "get cart");
  }

  // get items
  const items = cart.cart_items;
  // create data to response
  let data = [];
  let product = null;
  let tmp = null;
  for (var item of items) {
    // get product
    try {
      product = await strapi.services.product.findOneID(item.product);
    } catch (error) {
      return strapi.services.cart.err500(ctx, error, "get product");
    }
    // create data
    tmp = {
      name: product.name,
      quantity: item.quantity,
      price: product.price,
      product: product.id,
      discount: product.discount,
      url: product.avatar.url,
    };
    data.push(tmp);
  }

  return Response.ok(ctx, {
    msg: "ok",
    data: data,
    status: 200,
  });
};

const deleteItems = async (ctx) => {
  // get cart id
  const url = ctx.request.url.split("/");
  const id = url[url.length - 1];
  // get cart
  let cart = null;
  try {
    cart = await strapi.query("cart").findOne({ id });
  } catch (error) {
    return strapi.services.cart.err500(ctx, error, "get cart");
  }
  // get cart-items
  const items = cart.cart_items;

  // delete all of items
  for (var item of items) {
    try {
      await strapi.services.cart_item.deleteItem(item.id);
    } catch (error) {
      return strapi.services.cart.err500(ctx, error, "delete all of items");
    }
  }

  Response.success(ctx, {
    msg: "Removed all of items",
    status: 200,
    data: cart.cart_items,
  });
};

module.exports = { findOne, deleteItems };
