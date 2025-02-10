import { findUser } from "@/utils/database"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const username = formData.get("username") as string
    const password = formData.get("password") as string

    const user = await findUser(username)

    if (user && user.password === password) {
      cookies().set("userId", user.id.toString(), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
      })

      return Response.json({ success: true })
    }

    return Response.json({ success: false, error: "Invalid username or password" }, { status: 401 })
  } catch (error) {
    return Response.json({ success: false, error: "An error occurred" }, { status: 500 })
  }
}

