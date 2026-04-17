import { text, type RouterHandlers } from "@bepalo/router"

// ROUTE /
export default {
  GET: {
    HANDLER: () => text("API v1"),
  },
} satisfies RouterHandlers
