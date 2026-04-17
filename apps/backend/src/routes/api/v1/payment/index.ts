import { CHASECK, BASE_URL } from "@/config"
import {
  json,
  parseBody,
  redirect,
  Status,
  status,
  type CTXBody,
  type RouterHandlers,
} from "@bepalo/router"

// console.log({ CHASECK, CALLBACK_URL: BASE_URL + "/api/v1/payment_callback" })

// ROUTE /api/v1/payment
export default {
  POST: {
    FILTER: [
      parseBody({
        accept: ["application/json", "application/x-www-form-urlencoded"],
        maxSize: 4 * 1024,
        once: true,
      }),
    ],
    HANDLER: async (req, { body }) => {
      const tx_ref = crypto.randomUUID()
      const res = await fetch(
        "https://api.chapa.co/v1/transaction/initialize",
        {
          method: "POST",
          headers: [
            ["Content-Type", "application/json"],
            ["Authorization", `Bearer ${CHASECK}`],
          ],
          body: JSON.stringify({
            amount: body.amount, // "100",
            currency: "ETB",
            email: body.email, //"the.defalt8@gmail.com",
            first_name: body.first_name, //"Natnael",
            last_name: body.last_name, //"Eshetu",
            phone_number: body.phone_number, //"0906639085",
            // tx_ref: "pid_1234",
            tx_ref,
            callback_url: BASE_URL + "/api/v1/payment_callback",
            // callback_url:
            //   "https://webhook.site/ba0094e4-ac04-4f22-ad68-96aae1cffaf8",
            return_url: BASE_URL + "/api/v1/payment/" + tx_ref,
            "customization[title]": "Payment for Medicine",
            "customization[description]": "Pay for provided items",
            "meta[hide_receipt]": "true",
            "meta[invoices]": [
              { key: "Paracetamol", value: "2pcs" },
              { key: "Ibuprofen", value: "1pcs" },
            ],
          }),
        }
      )
      if (!res.ok) {
        return json(
          {
            status: res.status,
            statusText: res.statusText,
            message: await res.json(),
          },
          { status: 401 }
        )
      }
      const data = await res.json()
      if (!data?.data) {
        return status(401)
      }
      const checkoutUrl = data.data.checkout_url
      return redirect(checkoutUrl)
    },
  },
} satisfies RouterHandlers<
  {},
  {
    POST: CTXBody & {
      body: {
        amount: string
        email: string
        first_name: string
        last_name: string
        phone_number: string
      }
    }
  }
>
