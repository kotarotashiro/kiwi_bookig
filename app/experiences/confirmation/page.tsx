"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Calendar, Clock, Users, ChevronLeft, Home } from "lucide-react"

export default function ConfirmationPage() {
  const searchParams = useSearchParams()
  const reservationId = searchParams.get("reservationId")
  const [countdown, setCountdown] = useState(10)

  // カウントダウンタイマー
  useEffect(() => {
    if (countdown <= 0) return

    const timer = setTimeout(() => {
      setCountdown(countdown - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [countdown])

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto">
          <h1 className="text-xl font-bold">
            <Link href="/">Kiwi no Kuni</Link>
          </h1>
          <nav className="flex items-center space-x-4">
            <Link href="/" className="text-sm font-medium hover:underline">
              ホーム
            </Link>
            <Link href="/products" className="text-sm font-medium hover:underline">
              商品
            </Link>
            <Link href="/experiences" className="text-sm font-medium hover:underline">
              体験
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:underline">
              お問い合わせ
            </Link>
          </nav>
        </div>
      </header>

      <main className="container px-4 py-8 mx-auto">
        <div className="max-w-2xl mx-auto">
          <Card className="border-green-100">
            <CardHeader className="text-center bg-green-50 border-b border-green-100">
              <div className="flex justify-center mb-4">
                <CheckCircle className="w-16 h-16 text-green-500" />
              </div>
              <CardTitle className="text-2xl text-green-800">予約が完了しました</CardTitle>
              <CardDescription>
                ご予約ありがとうございます。確認メールをお送りしましたのでご確認ください。
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="mb-6 p-4 bg-gray-50 rounded-md">
                <h3 className="mb-2 font-medium">予約番号: {reservationId}</h3>
                <p className="text-sm text-gray-600">
                  この予約番号は確認メールにも記載されています。お問い合わせの際にご提示ください。
                </p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start">
                  <Calendar className="w-5 h-5 mr-3 text-gray-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">キウイ収穫体験</h4>
                    <p className="text-sm text-gray-600">
                      当園自慢の有機栽培キウイを収穫する貴重な体験ができます。収穫したキウイは持ち帰りができます。
                    </p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-3 text-gray-500" />
                  <div>
                    <h4 className="font-medium">所要時間</h4>
                    <p className="text-sm text-gray-600">約90分</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Users className="w-5 h-5 mr-3 text-gray-500" />
                  <div>
                    <h4 className="font-medium">持ち物</h4>
                    <p className="text-sm text-gray-600">動きやすい服装、タオル、飲み物</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center gap-3 pt-4 border-t">
                <p className="text-sm text-gray-500">
                  {countdown > 0 ? `${countdown}秒後にホームページに戻ります...` : "ホームページに戻ることができます"}
                </p>
                <div className="flex gap-3">
                  <Button variant="outline" asChild>
                    <Link href="/experiences">
                      <ChevronLeft className="w-4 h-4 mr-2" />
                      体験一覧に戻る
                    </Link>
                  </Button>
                  <Button asChild>
                    <Link href="/">
                      <Home className="w-4 h-4 mr-2" />
                      ホームに戻る
                    </Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-gray-600 border-t">
        <p>© 2023 Kiwi no Kuni - All Rights Reserved</p>
      </footer>
    </div>
  )
}
