"use strict";

const findOneID = async (id) => {
  return strapi.query("product").findOne({ id });
};

module.exports = { findOneID };
