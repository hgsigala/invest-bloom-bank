import { Resend } from "resend"

// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendInterestNotification(
  user: {
    username: string
    email: string
    balance: number
  },
  interest: number,
  period: string,
) {
  try {
    await resend.emails.send({
      from: "Invest Bloom Bank <notifications@investbloombank.com>",
      to: user.email,
      cc: "sigala.hector@gmail.com",
      subject: `Interest Paid - ${user.username}`,
      html: `
        <h1>Interest Payment Notification</h1>
        <p>Hello ${user.username},</p>
        <p>Your account has been credited with $${interest.toFixed(2)} interest for this ${period}.</p>
        <p>Your new balance is $${user.balance.toFixed(2)}.</p>
        <p>Thank you for banking with Invest Bloom Bank!</p>
      `,
    })
  } catch (error) {
    console.error("Failed to send email:", error)
  }
}

export async function sendWeeklySummary(users: Array<{ username: string; balance: number }>) {
  try {
    const summaryHtml = `
      <h1>Weekly Account Summary</h1>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Account</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: right;">Balance</th>
        </tr>
        ${users
          .map(
            (user) => `
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">${user.username}</td>
            <td style="border: 1px solid #ddd; padding: 8px; text-align: right;">$${user.balance.toFixed(2)}</td>
          </tr>
        `,
          )
          .join("")}
      </table>
    `

    await resend.emails.send({
      from: "Invest Bloom Bank <notifications@investbloombank.com>",
      to: "sigala.hector@gmail.com",
      subject: "Weekly Account Summary",
      html: summaryHtml,
    })
  } catch (error) {
    console.error("Failed to send weekly summary:", error)
  }
}

