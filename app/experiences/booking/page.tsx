"use client"

import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import ReservationForm from "@/components/reservation-form"

export default function BookingPage() {
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
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Link href="/experiences" className="flex items-center text-sm text-gray-600 hover:underline">
              <ChevronLeft className="w-4 h-4 mr-1" />
              体験一覧に戻る
            </Link>
          </div>

          <h2 className="mb-6 text-2xl font-bold">キウイ収穫体験の予約</h2>

          <ReservationForm />
        </div>
      </main>

      <footer className="py-6 text-center text-sm text-gray-600 border-t">
        <p>© 2023 Kiwi no Kuni - All Rights Reserved</p>
      </footer>
    </div>
  )
}
