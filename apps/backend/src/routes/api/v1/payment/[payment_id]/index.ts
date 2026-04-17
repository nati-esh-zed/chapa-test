import { CHASECK } from "@/config"
import {
  json,
  parseQuery,
  Status,
  status,
  type CTXQuery,
  type RouterHandlers,
} from "@bepalo/router"

// ROUTE /api/v1/payment/:payment_id
export default {
  CRUD: {
    FILTER: [parseQuery()],
    HANDLER: async (req, { params }) => {
      const { payment_id } = params
      const res = await fetch(
        `https://api.chapa.co/v1/transaction/verify/${payment_id}`,
        {
          headers: {
            Authorization: `Bearer ${CHASECK}`,
          },
        }
      )
      const resp = res.ok ? await res.json() : undefined
      if (resp?.status !== "success") {
        return status(Status._400_BadRequest, "Payment failed or cancelled")
      }
      const transaction = resp.data
      return json({ transaction })
    },
  },
} satisfies RouterHandlers<
  {},
  {
    CRUD: CTXQuery
  }
>
