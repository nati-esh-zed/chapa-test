import { text, type RouterHandlers } from "@bepalo/router";

// ROUTE /
export default {
  GET: {
    HANDLER: () => text("Hello There"),
  },
} satisfies RouterHandlers;
