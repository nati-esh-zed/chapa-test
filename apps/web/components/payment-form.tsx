import { Button } from "@workspace/ui/components/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card"
import { Input } from "@workspace/ui/components/input"

export default function PaymentForm() {
  return (
    <Card>
      <CardHeader className="gap-4">
        <CardTitle className="text-3xl font-bold">Chapa Test</CardTitle>
      </CardHeader>
      <CardContent>
        <form
          method="post"
          action="/api/v1/payment"
          encType="application/x-www-form-urlencoded"
          className="flex flex-col gap-2"
        >
          <div>
            <Input
              name="amount"
              type="text"
              defaultValue={100}
              placeholder="amount"
            />
          </div>
          <div>
            <Input name="email" type="email" placeholder="user@example.com" />
          </div>
          <div>
            <Input name="first_name" type="text" placeholder="first name" />
          </div>
          <div>
            <Input name="last_name" type="text" placeholder="last name" />
          </div>
          <div>
            <Input name="phone_number" type="text" placeholder="phone number" />
          </div>
          <Button type="submit">Pay</Button>
        </form>
      </CardContent>
    </Card>
  )
}
