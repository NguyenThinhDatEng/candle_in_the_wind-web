"use strict";
const Response = require(`../../../utils/response`);

const createItems = async (ctx) => {
  // get items
  const items = ctx.request.body;
  // create items
  for (var item of items) {
    try {
      await strapi.query("cart_item").create({
        cart: item.cart,
        product: item.product,
        quantity: item.quantity,
      });
    } catch (error) {
      return strapi.services.cart_item.err500(ctx, error, "create items");
    }
  }

  Response.created(ctx, {
    msg: "create items successfully",
    data: items,
    status: 201,
  });
};

module.exports = { createItems };
