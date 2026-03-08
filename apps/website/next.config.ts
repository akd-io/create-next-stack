import type { NextConfig } from "next"
import { withPlausibleProxy } from "next-plausible"

const config: NextConfig = {
  reactStrictMode: true,
}

export default withPlausibleProxy()(config)
