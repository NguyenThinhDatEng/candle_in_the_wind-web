"use strict";

const findOneEmail = async function (email) {
  return await strapi.query(`customer`).findOne({ email });
};

module.exports = { findOneEmail };
