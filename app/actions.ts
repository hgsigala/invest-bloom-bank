"use server"

import {
  findUser,
  updateUser,
  createUser,
  calculateInterest,
  sendInterestNotification,
  type User,
} from "@/utils/database"
import { cookies } from "next/headers"

export async function login(formData: FormData) {
  const username = formData.get("username") as string
  const password = formData.get("password") as string

  const user = await findUser(username)

  if (user && user.password === password) {
    cookies().set("userId", user.id.toString(), { httpOnly: true })
    return { success: true, user }
  }

  return { success: false, error: "Invalid username or password" }
}

export async function register(formData: FormData) {
  const username = formData.get("username") as string
  const password = formData.get("password") as string
  const email = formData.get("email") as string
  const initialBalance = Number.parseFloat(formData.get("initialBalance") as string) || 0

  if (await findUser(username)) {
    return { success: false, error: "Username already exists" }
  }

  const newUser = await createUser(username, password, email, initialBalance)
  cookies().set("userId", newUser.id.toString(), { httpOnly: true })
  return { success: true, user: newUser }
}

export async function checkIn() {
  const userId = cookies().get("userId")?.value
  if (!userId) return { success: false, error: "Not logged in" }

  const user = await findUser(userId)
  if (!user) return { success: false, error: "User not found" }

  const now = new Date()
  const lastCheckIn = new Date(user.lastCheckIn)
  const daysSinceLastCheckIn = Math.floor((now.getTime() - lastCheckIn.getTime()) / (1000 * 60 * 60 * 24))

  if (daysSinceLastCheckIn < 7) {
    return { success: false, error: "You can only check in once a week" }
  }

  const { interest, period } = calculateInterest(user.balance)

  const updatedUser: User = {
    ...user,
    balance: user.balance + interest,
    lastCheckIn: now.toISOString(),
  }

  await updateUser(updatedUser)
  await sendInterestNotification(updatedUser, interest, period)

  return { success: true, user: updatedUser, interest, period }
}

export async function getAmortizationTable(balance: number, years: number) {
  const table = []
  let currentBalance = balance

  for (let i = 0; i < years * 12; i++) {
    const { interest, period } = calculateInterest(currentBalance)
    const monthlyInterest = period === "week" ? interest * 4 : period === "month" ? interest : interest / 12
    currentBalance += monthlyInterest
    table.push({
      month: i + 1,
      balance: currentBalance,
      interest: monthlyInterest,
    })
  }

  return table
}

export async function getS500Comparison(initialInvestment: number, years: number) {
  // This is a simplified calculation and doesn't account for dividends or exact historical data
  const averageAnnualReturn = 0.1 // 10% average annual return
  const s500Growth = []
  let currentValue = initialInvestment

  for (let i = 0; i < years; i++) {
    currentValue *= 1 + averageAnnualReturn
    s500Growth.push({
      year: i + 1,
      value: currentValue,
    })
  }

  return s500Growth
}

