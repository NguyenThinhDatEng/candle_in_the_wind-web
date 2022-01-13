"use strict";
const Response = require(`../../../utils/response`);

const err500 = (ctx, error, title) => {
  console.log(`\n${title}\n`, error);
  return Response.internalServerError(ctx, {
    data: null,
    msg: `Server Error at ${title}`,
    status: 500,
  });
};

module.exports = { err500 };
