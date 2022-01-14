"use strict";

const deleteItem = async (id) => {
  return strapi.query("cart_item").delete({ id });
};

module.exports = { deleteItem };
