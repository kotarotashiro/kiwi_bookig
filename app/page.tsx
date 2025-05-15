import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="container flex items-center justify-between h-16 px-4 mx-auto">
          <h1 className="text-xl font-bold">Kiwi no Kuni</h1>
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
        <section className="max-w-4xl mx-auto mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold">
            【福島・大熊町】震災からの復活を目指す畑で、未来を彩るキウイ植樹体験+キウイ券♪
          </h2>
          <p className="mb-6 text-gray-600">
            当園自慢の有機栽培キウイを収穫する貴重な体験ができます。収穫したキウイは持ち帰りができ、農園スタッフがキウイの栽培方法や選び方のコツを丁寧に教えます。
          </p>
          <div className="flex justify-center gap-4">
            <Button asChild>
              <Link href="/experiences/booking">予約する</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/experiences">体験一覧を見る</Link>
            </Button>
          </div>
        </section>

        <section className="max-w-4xl p-6 mx-auto mb-12 bg-green-50 rounded-lg">
          <h3 className="mb-4 text-xl font-bold text-center">人気の体験</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="overflow-hidden bg-white border rounded-lg">
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold">キウイ収穫体験</h4>
                  <span className="px-2 py-1 text-xs text-white bg-orange-500 rounded">秋限定</span>
                </div>
                <div className="flex items-center mb-2 text-yellow-500">
                  ★★★★☆ <span className="ml-1 text-sm text-gray-600">4.5 (28件)</span>
                </div>
                <p className="mb-4 text-sm text-gray-600">
                  当園自慢の有機栽培キウイを収穫する貴重な体験ができます。収穫したキウイは持ち帰りができます。
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold">¥3,800 / 1名</span>
                  <Button size="sm" asChild>
                    <Link href="/experiences/booking">予約する</Link>
                  </Button>
                </div>
              </div>
            </div>
            <div className="overflow-hidden bg-white border rounded-lg">
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold">キウイ植樹体験</h4>
                  <span className="px-2 py-1 text-xs text-white bg-green-500 rounded">通年</span>
                </div>
                <div className="flex items-center mb-2 text-yellow-500">
                  ★★★★★ <span className="ml-1 text-sm text-gray-600">4.8 (42件)</span>
                </div>
                <p className="mb-4 text-sm text-gray-600">
                  キウイの苗木を植える体験ができます。植えた木には名前プレートを付けることができ、成長を見守れます。
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold">¥4,500 / 1名</span>
                  <Button size="sm" asChild>
                    <Link href="/experiences/booking">予約する</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 text-center text-sm text-gray-600 border-t">
        <p>© 2023 Kiwi no Kuni - All Rights Reserved</p>
      </footer>
    </div>
  )
}
