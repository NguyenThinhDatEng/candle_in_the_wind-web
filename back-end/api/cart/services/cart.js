"use strict";

const create = async (customer) => {
  return await strapi.query("cart").create({ customer });
};

module.exports = { create };
