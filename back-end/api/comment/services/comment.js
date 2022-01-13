"use strict";

const findOneID = async (id) => {
  return strapi.query("comment").findOne({ id });
};

module.exports = { findOneID };
