"use server";

import { getCloudflareContext } from "@opennextjs/cloudflare";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  createSessionCookieValue,
  verifyCredentials,
} from "@/lib/admin/auth";
// Add by Ayan
export async function login(formData: FormData) {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const { env } = await getCloudflareContext({ async: true });

  if (!env.ADMIN_USERNAME || !env.ADMIN_PASSWORD) {
    redirect("/admin/login?error=not-configured");
  }

  if (!verifyCredentials(username, password, env)) {
    redirect("/admin/login?error=invalid");
  }

  const cookieValue = await createSessionCookieValue(username, env);
  if (!cookieValue) {
    redirect("/admin/login?error=not-configured");
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, cookieValue, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/admin",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });

  redirect("/admin/applications");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete({ name: SESSION_COOKIE_NAME, path: "/admin" });
  redirect("/admin/login");
}
