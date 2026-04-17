import {
  json,
  parseBody,
  status,
  type CTXBody,
  type RouterHandlers,
} from "@bepalo/router";

// ROUTE /api/v1/payment_callback
export default {
  GET: {
    FILTER: [
      parseBody({
        accept: ["application/json", "application/x-www-form-urlencoded"],
        maxSize: 4 * 1024,
        once: true,
      }),
    ],
    HANDLER: (req, { body }) => {
      return json(body);
    },
  },
} satisfies RouterHandlers<
  {},
  {
    GET: CTXBody;
  }
>;
