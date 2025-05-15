import { NextResponse } from "next/server"
import { sendReservationConfirmationEmail } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { customerName, email, experienceName, date, timeSlot, participants, totalPrice } = body

    if (!customerName || !email || !experienceName || !date || !timeSlot || !participants) {
      return NextResponse.json({ error: "必須項目が不足しています" }, { status: 400 })
    }

    // メール送信
    const result = await sendReservationConfirmationEmail({
      customerName,
      email,
      experienceName,
      date: new Date(date),
      timeSlot,
      participants,
      totalPrice,
    })

    if (result.success) {
      return NextResponse.json({
        success: true,
        reservationId: result.reservationId,
        message: "予約確認メールを送信しました",
      })
    } else {
      return NextResponse.json({ error: "メール送信に失敗しました", details: result.error }, { status: 500 })
    }
  } catch (error) {
    console.error("Error in send-confirmation API:", error)
    return NextResponse.json({ error: "サーバーエラーが発生しました" }, { status: 500 })
  }
}
