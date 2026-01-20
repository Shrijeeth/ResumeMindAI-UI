import { NextResponse } from "next/server";
import { createClient } from "@/app/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const forwardedHost =
        request.headers.get("x-forwarded-host") || request.headers.get("host");
      const forwardedProto =
        request.headers.get("x-forwarded-proto") || "https";
      const base = forwardedHost
        ? `${forwardedProto}://${forwardedHost}`
        : origin;
      return NextResponse.redirect(`${base}${next}`);
    }
  }

  // Return the user to an error page with instructions
  return NextResponse.redirect(
    `${origin}/auth/login?error=auth_callback_error`,
  );
}
