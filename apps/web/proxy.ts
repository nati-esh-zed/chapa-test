import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function proxy(request: NextRequest) {
  const newUrl = new URL(request.url)
  newUrl.protocol = process.env.BACKEND_PROTOCOL || "http:"
  newUrl.host = process.env.BACKEND_URL || "localhost:4000"
  return NextResponse.rewrite(newUrl)
}

export const config = {
  matcher: "/api/:path*",
}
