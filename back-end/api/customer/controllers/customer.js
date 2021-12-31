"use strict";
require("dotenv").config();
const Response = require(`../../../utils/response`);

const logIn = async (ctx) => {
  const { email, password } = ctx.request.body;
  console.log(`email: ${email}, password: ${password}`);
  const user = await strapi
    .query(`customer`)
    .findOne({ email, password }, ["customer.email"]);
  if (user) {
    return Response.ok(ctx, { data: user.email, msg: `OK`, status: 1 });
  }
  return Response.ok(ctx, {
    data: null,
    msg: `User account or password incorrect`,
    status: 0,
  });
};

const signUp = async (ctx) => {
  const { username, email, password, gender, dateOfBirth, phoneNumber } =
    ctx.request.body;
  console.log(ctx.request.body);
  const emailCheck = await strapi.query(`customer`).findOne({ email });
  if (emailCheck)
    return Response.notAcceptable(ctx, {
      msg: `${email} already exists. Please try a different email`,
      status: 0,
    });
  const user = await strapi
    .query(`customer`)
    .create({ username, email, password, gender, dateOfBirth, phoneNumber });
  if (user) {
    let data = {
      username: user.username,
      email: user.email,
      id: user.id,
    };
    return Response.created(ctx, {
      data: data,
      msg: `OK`,
      status: 1,
    });
  }
  return Response.internalServerError(ctx, {
    data: null,
    msg: `Server Error`,
    status: 0,
  });
};

module.exports = {
  resetPassWord: async (ctx) => {
    const { email } = ctx.request.body;
    const emailCheck = await strapi.query("customer").findOne({ email });
    if (emailCheck) {
      strapi.services.email.send(
        process.env.user,
        email,
        "Password Reset",
        "Your code is: 123abc"
      );
      return Response.ok(ctx, {
        status: 200,
        msg: `FOUND`,
      });
    } else {
      return Response.badRequest(ctx, {
        status: 400,
        msg: "Not Found",
      });
    }
  },

  signup: signUp,

  login: logIn,
};
