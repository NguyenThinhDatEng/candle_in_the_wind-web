"use strict";

const Response = require(`../../../utils/response`);

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  signup: async (ctx) => {
    const { username, email, password, gender, dateOfBirth, phoneNumber } = ctx.request.body;
    const emailCheck = await strapi.query(`customer`).findOne({email})
    if (emailCheck)
        return Response.notAcceptable(ctx, {
            msg: `${email} already exists`,
        })
    const rs = await strapi.query(`customer`).create({username, email, password, gender, dateOfBirth, phoneNumber});
    if (rs) {
      return Response.created(ctx, { data: rs, msg: `Successful`, status: 0 });
    }
  },

  login: async (ctx) => {
    const { email, password } = ctx.request.body;
    const rs = await strapi.query(`customer`).findOne({ email, password });
    if (rs) {
      return Response.ok(ctx, { data: rs, msg: `OK`, status: 0 });
    }
    return Response.badRequest(ctx, {
      data: null,
      msg: `Not Found`,
      status: 0,
    });
  },
};
