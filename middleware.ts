export { default } from "next-auth/middleware";

import { NextRequest } from "next/server";

export const config: { matcher: string[] } = {
  matcher: [],
};
