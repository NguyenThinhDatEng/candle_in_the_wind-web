"use strict";
require("dotenv").config();
const Response = require(`../../../utils/response`);

const login = async (ctx) => {
  const { email, password } = ctx.request.body;
  // get user
  let user = null;
  try {
    user = await strapi.query(`customer`).findOne({ email, password });
  } catch (error) {
    return strapi.services.customer.err500(ctx, error, "get user");
  }
  // check account
  if (!user) {
    return Response.ok(ctx, {
      data: null,
      msg: `User account or password incorrect`,
      status: 0,
    });
  }
  // create data to response
  let data = {
    id: user.id,
    username: user.username,
    email: user.email,
    gender: user.gender,
    dateOfBirth: user.dateOfBirth,
    phoneNumber: user.phoneNumber,
    loyal: user.loyal,
    cart: user.cart.id,
    avatar: user.avatar?.id,
  };
  return Response.ok(ctx, { data: data, msg: `OK`, status: 200 });
};

const signup = async (ctx) => {
  // get information
  const { username, email, password, gender, dateOfBirth, phoneNumber } =
    ctx.request.body;
  // check email
  let user = null;
  try {
    user = await strapi.services.customer.findOneEmail(email);
  } catch (error) {
    return strapi.services.customer.err500(error, "check email");
  }
  if (user)
    return Response.notAcceptable(ctx, {
      msg: `${email} already exists. Please try a different email`,
      status: 406,
    });

  // create new user
  try {
    user = await strapi
      .query(`customer`)
      .create({ username, email, password, gender, dateOfBirth, phoneNumber });
  } catch (error) {
    return strapi.services.customer.err500(error, "create new user");
  }
  // create new cart
  let cart = null;
  try {
    cart = await strapi.services.cart.create(user.id);
  } catch (error) {
    return strapi.services.customer.err500(error, "create new cart");
  }
  // customize data response
  if (user) {
    let data = {
      id: user.id,
      username: user.username,
      email: user.email,
      gender: user.gender,
      dateOfBirth: user.dateOfBirth,
      phoneNumber: user.phoneNumber,
      loyal: user.loyal,
      cart: cart.id,
    };
    return Response.created(ctx, {
      data: data,
      msg: `OK`,
      status: 201,
    });
  }
};

const resetPassWord = async (ctx) => {
  const { email, otp } = ctx.request.body;
  let user = null;
  try {
    user = await strapi.services.customer.findOneEmail(email);
  } catch (error) {
    console.log(error);
    return Response.internalServerError(ctx, {
      status: 500,
      msg: "Error Server",
    });
  }
  if (!user)
    return Response.badRequest(ctx, {
      status: 400,
      msg: `${email} not found!`,
    });

  const OTP = strapi.services.customer.generateOTP();
  try {
    await strapi.services.customer.updateOTP(email, OTP);
    strapi.services.email.send(
      process.env.user,
      email,
      "Code Verification",
      `Your password reset OTP is ${OTP}`
    );
    return Response.ok(ctx, {
      status: 200,
      msg: `Successfully`,
      data: { email, id: user.id },
    });
  } catch (error) {
    console.log(error);
    return Response.internalServerError(ctx, {
      status: 500,
      msg: "Error Server",
    });
  }
};

const verifyOTP = async (ctx) => {
  const { email, OTP } = ctx.request.body;
  let user = null;
  try {
    user = await strapi.services.customer.findOneEmail(email);
  } catch (error) {
    console.log(error);
    return Response.internalServerError(ctx, {
      status: 500,
      msg: "Error Server",
    });
  }
  if (user.OTP === OTP)
    return Response.ok(ctx, {
      msg: "OK",
      status: 200,
      data: { email, OTP },
    });
  return Response.conflict(ctx, {
    msg: `You've entered incorrect OTP code`,
    status: 409,
  });
};

const changePassword = async (ctx) => {
  const { email, password, newPassword } = ctx.request.body;
  let user = null;
  try {
    user = await strapi.services.customer.checkLogin(email, password);
  } catch (error) {
    return Response.internalServerError(ctx, {
      msg: "Server Error",
      status: 500,
    });
  }
  if (!user) {
    return Response.notFound(ctx, {
      msg: "Your password is wrong",
      status: 400,
    });
  }
  try {
    await strapi.services.customer.updatePassword(email, newPassword);
  } catch (error) {
    return Response.internalServerError(ctx, {
      msg: "Server Error",
      status: 500,
    });
  }
  return Response.ok(ctx, {
    msg: "Updated password successfully!",
    data: newPassword,
    status: 200,
  });
};

const getOrders = async (ctx) => {
  // get customer id
  const url = ctx.request.url.split("/");
  const id = url[url.length - 1];
  // get user
  let user = null;
  try {
    user = await strapi.query("customer").findOne({ id });
  } catch (error) {
    return strapi.services.customer.err500(ctx, error, "get user");
  }
  // create data to response
  return user.orders;
};

const getLoyal = async (ctx) => {
  // get customer id
  const url = ctx.request.url.split("/");
  const id = url[url.length - 1];
  // get user
  let user = null;
  try {
    user = await strapi.query("customer").findOne({ id });
  } catch (error) {
    return strapi.services.customer.err500(ctx, error, "get user");
  }

  if (user.loyal) return true;

  // get orders
  const orders = user.orders;
  let grandTotal = 0;
  for (var order of orders) {
    if (order.published_at) {
      grandTotal += order.grand_total;
    }
    if (grandTotal >= 100) {
      // update loyal
      try {
        await strapi.query("customer").update({ id }, { loyal: true });
      } catch (error) {
        return strapi.services.customer.err500(ctx, error, " update loyal");
      }
      return true;
    }
  }
  return false;
};

module.exports = {
  changePassword,
  resetPassWord,
  signup,
  login,
  verifyOTP,
  getOrders,
  getLoyal,
};
