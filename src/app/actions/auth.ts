"use server";

import { dbRepository } from "@/db";
import { loginSchema, registerSchema } from "@/lib/validation";
import { setSessionCookie, clearSessionCookie, getSession } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function loginAction(formData: FormData) {
  try {
    const email = (formData.get("email") as string) || "";
    const password = (formData.get("password") as string) || "";

    loginSchema.parse({ email, password });

    const user = await dbRepository.getUserByEmail(email);
    if (!user) {
      return { success: false, error: "Invalid email or password." };
    }

    const isMatch = bcrypt.compareSync(password, user.passwordHash);
    if (!isMatch) {
      return { success: false, error: "Invalid email or password." };
    }

    await setSessionCookie({
      userId: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
    });

    return {
      success: true,
      role: user.role,
      redirectTo: user.role === "CUSTOMER" ? "/account" : "/admin/dashboard",
    };
  } catch (error: any) {
    return { success: false, error: error.message || "Login failed" };
  }
}

export async function registerAction(formData: FormData) {
  try {
    const name = (formData.get("name") as string) || "";
    const email = (formData.get("email") as string) || "";
    const password = (formData.get("password") as string) || "";
    const phone = (formData.get("phone") as string) || undefined;

    registerSchema.parse({ name, email, password, phone });

    const existing = await dbRepository.getUserByEmail(email);
    if (existing) {
      return { success: false, error: "An account with this email address already exists." };
    }

    const newUser = await dbRepository.createUser({
      name,
      email,
      password,
      phone,
    });

    await setSessionCookie({
      userId: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
    });

    return { success: true, redirectTo: "/account" };
  } catch (error: any) {
    return { success: false, error: error.message || "Registration failed" };
  }
}

export async function logoutAction() {
  await clearSessionCookie();
}

export async function getSessionUser() {
  return await getSession();
}
