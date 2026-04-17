import { CHASECK } from "@/config"
import {
  json,
  parseQuery,
  status,
  Status,
  type CTXQuery,
  type RouterHandlers,
} from "@bepalo/router"

// ROUTE /api/v1/payment_callback
export default {
  GET: {
    FILTER: [parseQuery()],
    HANDLER: async (req, { query }) => {
      const { trx_ref, status: st } = query
      if (st !== "success") {
        return status(Status._400_BadRequest, "Payment failed or cancelled")
      }
      const res = await fetch(
        `https://api.chapa.co/v1/transaction/verify/${trx_ref}`,
        {
          headers: {
            Authorization: `Bearer ${CHASECK}`,
          },
        }
      )
      const resp = res.ok ? await res.json() : undefined
      console.log({ resp: resp })
      if (resp?.status !== "success") {
        return status(Status._403_Forbidden, "Payment verification failed")
      }
      return status(Status._200_OK)
    },
  },
} satisfies RouterHandlers<
  {},
  {
    GET: CTXQuery
  }
>
