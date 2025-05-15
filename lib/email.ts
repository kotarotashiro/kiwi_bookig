import nodemailer from "nodemailer"
import { format } from "date-fns"
import { ja } from "date-fns/locale"

// メール送信用のトランスポーター設定
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: Number.parseInt(process.env.SMTP_PORT || "587", 10),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

// 予約確認メールのテンプレート
export const generateReservationEmailHtml = ({
  reservationId,
  customerName,
  experienceName,
  date,
  timeSlot,
  participants,
  totalPrice,
  email,
}: {
  reservationId: string
  customerName: string
  experienceName: string
  date: Date
  timeSlot: string
  participants: number
  totalPrice: number
  email: string
}) => {
  const formattedDate = format(date, "yyyy年MM月dd日 (E)", { locale: ja })

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>予約確認 - Kiwi no Kuni</title>
      <style>
        body {
          font-family: 'Helvetica Neue', Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
        .header {
          background-color: #4ade80;
          padding: 20px;
          text-align: center;
          color: white;
          border-radius: 5px 5px 0 0;
        }
        .content {
          padding: 20px;
          border: 1px solid #e5e5e5;
          border-top: none;
          border-radius: 0 0 5px 5px;
        }
        .reservation-details {
          margin: 20px 0;
          background-color: #f9f9f9;
          padding: 15px;
          border-radius: 5px;
        }
        .detail-row {
          display: flex;
          margin-bottom: 10px;
        }
        .detail-label {
          width: 120px;
          font-weight: bold;
        }
        .detail-value {
          flex: 1;
        }
        .footer {
          margin-top: 30px;
          text-align: center;
          font-size: 12px;
          color: #777;
        }
        .button {
          display: inline-block;
          background-color: #4ade80;
          color: white;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 5px;
          margin-top: 20px;
        }
        .note {
          margin-top: 20px;
          padding: 15px;
          background-color: #fff8e1;
          border-left: 4px solid #ffc107;
          font-size: 14px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>ご予約ありがとうございます</h1>
      </div>
      <div class="content">
        <p>${customerName} 様</p>
        
        <p>Kiwi no Kuniをご利用いただき、誠にありがとうございます。<br>
        以下の内容でご予約を承りましたのでご確認ください。</p>
        
        <div class="reservation-details">
          <div class="detail-row">
            <div class="detail-label">予約番号:</div>
            <div class="detail-value">${reservationId}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">体験名:</div>
            <div class="detail-value">${experienceName}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">日付:</div>
            <div class="detail-value">${formattedDate}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">時間:</div>
            <div class="detail-value">${timeSlot}</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">参加人数:</div>
            <div class="detail-value">${participants}名</div>
          </div>
          <div class="detail-row">
            <div class="detail-label">合計金額:</div>
            <div class="detail-value">¥${totalPrice.toLocaleString()}</div>
          </div>
        </div>
        
        <div class="note">
          <p><strong>ご注意事項:</strong></p>
          <ul>
            <li>当日は開始時間の15分前までに受付にお越しください。</li>
            <li>天候により内容が変更になる場合がございます。</li>
            <li>キャンセルは3日前までにご連絡ください。</li>
          </ul>
        </div>
        
        <p>ご予約内容の変更やキャンセルをご希望の場合は、下記のボタンからマイページにアクセスいただくか、直接お電話（0123-45-6789）にてご連絡ください。</p>
        
        <div style="text-align: center;">
          <a href="https://kiwinokuni.example.com/mypage" class="button">マイページを見る</a>
        </div>
        
        <p>その他ご不明な点がございましたら、お気軽にお問い合わせください。<br>
        当日のご来園を心よりお待ちしております。</p>
        
        <p>Kiwi no Kuni<br>
        〒123-4567 福島県大熊町キウイ農園1-2-3<br>
        TEL: 0123-45-6789<br>
        Email: info@kiwinokuni.example.com</p>
      </div>
      <div class="footer">
        <p>このメールは予約システムから自動送信されています。返信はできませんのでご了承ください。</p>
        <p>© 2023 Kiwi no Kuni - All Rights Reserved</p>
      </div>
    </body>
    </html>
  `
}

// 予約確認メールの送信関数
export async function sendReservationConfirmationEmail({
  customerName,
  email,
  experienceName,
  date,
  timeSlot,
  participants,
  totalPrice,
}: {
  customerName: string
  email: string
  experienceName: string
  date: Date
  timeSlot: string
  participants: number
  totalPrice: number
}) {
  // 予約番号の生成（実際のシステムではDBから取得）
  const reservationId = `KW-${format(new Date(), "yyyyMMdd")}-${Math.floor(1000 + Math.random() * 9000)}`

  const mailOptions = {
    from: `"Kiwi no Kuni" <${process.env.SMTP_USER}>`,
    to: email,
    subject: `【Kiwi no Kuni】ご予約確認 (${reservationId})`,
    html: generateReservationEmailHtml({
      reservationId,
      customerName,
      experienceName,
      date,
      timeSlot,
      participants,
      totalPrice,
      email,
    }),
  }

  try {
    const info = await transporter.sendMail(mailOptions)
    console.log("Message sent: %s", info.messageId)
    return { success: true, messageId: info.messageId, reservationId }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error }
  }
}
