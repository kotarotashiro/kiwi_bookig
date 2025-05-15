import type React from "react"
import Link from "next/link"
import { LayoutDashboard, ShoppingBag, Calendar, FileText, Leaf, BarChart, Settings, LogOut } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* サイドバー */}
        <aside className="fixed inset-y-0 left-0 z-10 w-64 bg-white border-r">
          <div className="flex items-center h-16 px-6 border-b">
            <h1 className="text-xl font-bold">Kiwi no Kuni+</h1>
          </div>
          <nav className="p-4 space-y-1">
            <Link href="/admin" className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100">
              <LayoutDashboard className="w-5 h-5 mr-3 text-gray-500" />
              ダッシュボード
            </Link>
            <Link
              href="/admin/products"
              className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
            >
              <ShoppingBag className="w-5 h-5 mr-3 text-gray-500" />
              商品管理
            </Link>
            <Link
              href="/admin/experiences"
              className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
            >
              <Calendar className="w-5 h-5 mr-3 text-gray-500" />
              体験管理
            </Link>
            <Link
              href="/admin/posts"
              className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
            >
              <FileText className="w-5 h-5 mr-3 text-gray-500" />
              投稿
            </Link>
            <Link
              href="/admin/seasons"
              className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
            >
              <Leaf className="w-5 h-5 mr-3 text-gray-500" />
              季節設定
            </Link>
            <Link
              href="/admin/analytics"
              className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
            >
              <BarChart className="w-5 h-5 mr-3 text-gray-500" />
              売上分析
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100"
            >
              <Settings className="w-5 h-5 mr-3 text-gray-500" />
              設定
            </Link>
          </nav>
          <div className="absolute bottom-0 w-full p-4 border-t">
            <Link href="/logout" className="flex items-center px-4 py-2 text-gray-700 rounded-md hover:bg-gray-100">
              <LogOut className="w-5 h-5 mr-3 text-gray-500" />
              ログアウト
            </Link>
          </div>
        </aside>

        {/* メインコンテンツ */}
        <div className="flex-1 ml-64">{children}</div>
      </div>
    </div>
  )
}
