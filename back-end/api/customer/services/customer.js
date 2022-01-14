"use strict";
const Response = require(`../../../utils/response`);

const findOneEmail = async function (email) {
  return await strapi.query(`customer`).findOne({ email });
};

const updateOTP = async function (email, OTP) {
  return await strapi.query(`customer`).update({ email }, { OTP });
};

const generateOTP = () => {
  // Declare a digits variable
  // which stores all digits
  var digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

const updatePassword = async function (email, newPassword) {
  return await strapi
    .query(`customer`)
    .update({ email }, { password: newPassword });
};

const checkLogin = async function (email, password) {
  return await strapi.query("customer").findOne({ email, password });
};

const err500 = (ctx, error, title) => {
  console.log(`\n${title}\n`, error);
  return Response.internalServerError(ctx, {
    data: null,
    msg: `Server Error at ${title}`,
    status: 500,
  });
};

module.exports = {
  findOneEmail,
  generateOTP,
  updateOTP,
  updatePassword,
  checkLogin,
  err500,
};
