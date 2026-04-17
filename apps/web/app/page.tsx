import PaymentForm from "@/components/payment-form"
import { Button } from "@workspace/ui/components/button"

export default function Page() {
  return (
    <div className="flex min-h-svh flex-col gap-2 p-6">
      <PaymentForm />
    </div>
  )
}
