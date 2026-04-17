import { serve } from "bun"
import { RouterFramework } from "@bepalo/router"
import { BASE_URL } from "./config"

const router = new RouterFramework({
  rootPath: "./src/routes",
  normalizeTrailingSlash: true,
})

await router.load()

const server = serve({
  port: 4000,
  fetch: async (req) => {
    const res = await router.respond(req)
    console.log(
      `${Date.now()} ${req.method} ${req.url} ${res.status} ${res.statusText}`
    )
    return res
  },

  // development: process.env.NODE_ENV !== "production" && {
  //   // Enable browser hot reloading in development
  //   // hmr: true,
  //   // Echo console logs from the browser to the server
  //   // console: true,
  // },
})

console.log({ BASE_URL })
console.log(`🚀 Server running at ${server.url}`)
