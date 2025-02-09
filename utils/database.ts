import fs from "fs/promises"
import path from "path"
import nodemailer from "nodemailer"

const DB_PATH = path.join(process.cwd(), "data", "users.json")

export interface User {
  id: number
  username: string
  password: string
  balance: number
  lastCheckIn: string
  email: string
}

export interface InterestTier {
  maxAmount: number
  rate: number
  period: "week" | "month" | "year"
}

const interestTiers: InterestTier[] = [
  { maxAmount: 500, rate: 0.1, period: "week" },
  { maxAmount: 10000, rate: 0.1, period: "month" },
  { maxAmount: Number.POSITIVE_INFINITY, rate: 0.1, period: "year" },
]

export async function readUsers(): Promise<User[]> {
  const data = await fs.readFile(DB_PATH, "utf-8")
  return JSON.parse(data)
}

export async function writeUsers(users: User[]): Promise<void> {
  await fs.writeFile(DB_PATH, JSON.stringify(users, null, 2))
}

export async function findUser(username: string): Promise<User | undefined> {
  const users = await readUsers()
  return users.find((user) => user.username === username)
}

export async function updateUser(updatedUser: User): Promise<void> {
  const users = await readUsers()
  const index = users.findIndex((user) => user.id === updatedUser.id)
  if (index !== -1) {
    users[index] = updatedUser
    await writeUsers(users)
  }
}

export async function createUser(
  username: string,
  password: string,
  email: string,
  initialBalance: number,
): Promise<User> {
  const users = await readUsers()
  const newUser: User = {
    id: users.length + 1,
    username,
    password,
    balance: initialBalance,
    lastCheckIn: new Date().toISOString(),
    email,
  }
  users.push(newUser)
  await writeUsers(users)
  return newUser
}

export function calculateInterest(balance: number): { interest: number; period: "week" | "month" | "year" } {
  for (const tier of interestTiers) {
    if (balance <= tier.maxAmount) {
      return { interest: balance * tier.rate, period: tier.period }
    }
  }
  return { interest: 0, period: "year" }
}

const transporter = nodemailer.createTransport({
  // Configure your email service here
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "your-email@gmail.com",
    pass: "your-email-password",
  },
})

export async function sendInterestNotification(user: User, interest: number, period: string) {
  const mailOptions = {
    from: '"Invest Bloom Bank" <your-email@gmail.com>',
    to: user.email,
    cc: "sigala.hector@gmail.com",
    subject: `Interest Paid - ${user.username}`,
    text: `Hello ${user.username},

Your account has been credited with $${interest.toFixed(2)} interest for this ${period}.
Your new balance is $${user.balance.toFixed(2)}.

Thank you for banking with Invest Bloom Bank!`,
  }

  await transporter.sendMail(mailOptions)
}

export async function sendWeeklySummary() {
  const users = await readUsers()
  let summaryText = "Weekly Summary of All Accounts:\n\n"

  for (const user of users) {
    summaryText += `${user.username}: $${user.balance.toFixed(2)}\n`
  }

  const mailOptions = {
    from: '"Invest Bloom Bank" <your-email@gmail.com>',
    to: "sigala.hector@gmail.com",
    subject: "Weekly Account Summary",
    text: summaryText,
  }

  await transporter.sendMail(mailOptions)
}

