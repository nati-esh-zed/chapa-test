import {
  json,
  parseBody,
  parseQuery,
  status,
  type CTXBody,
  type CTXQuery,
  type RouterHandlers,
} from "@bepalo/router";

// ROUTE /api/v1/payment/:payment_id
export default {
  CRUD: {
    FILTER: [
      parseBody({
        accept: ["application/json", "application/x-www-form-urlencoded"],
        maxSize: 4 * 1024,
        once: true,
      }),
      parseQuery(),
    ],
    HANDLER: (req, { query, body }) => {
      return json({ query, body });
    },
  },
} satisfies RouterHandlers<
  {},
  {
    CRUD: CTXBody & CTXQuery;
  }
>;
