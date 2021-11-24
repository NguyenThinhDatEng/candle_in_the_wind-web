'use strict';

const Response = require(`../../../utils/response`);

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async login(context){
        const { email , pw } = context.request.body;
        const rs = await strapi.query(`customer`).findOne({ email, pw});
        if(rs){
            return Response.ok(context, { data: rs, msg: `OK`, status: 0 });
        }
        return Response.badRequest(context, {data: null, msg: `Not Found`, status: 0 });
    }
};
