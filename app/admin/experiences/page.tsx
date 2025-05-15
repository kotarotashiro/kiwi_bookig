import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Filter, Calendar, Clock, ChevronLeft, ChevronRight } from "lucide-react"
import { format } from "date-fns"
import { ja } from "date-fns/locale"

const TIME_SLOTS = [
  { time: "10:00" },
  { time: "11:00" },
  { time: "12:00" },
  { time: "13:00" },
  { time: "14:00" },
  { time: "15:00" },
  { time: "16:00" },
]

export default function ExperiencesPage() {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">体験管理</h1>
        <Button asChild>
          <Link href="/admin/experiences/new">
            <Plus className="w-4 h-4 mr-2" />
            新規体験
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="list">
        <TabsList className="mb-4">
          <TabsTrigger value="list">体験一覧</TabsTrigger>
          <TabsTrigger value="schedule">予約枠管理</TabsTrigger>
          <TabsTrigger value="bookings">予約状況</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>体験一覧</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <input
                      type="search"
                      placeholder="体験を検索..."
                      className="pl-8 h-9 w-64 rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm transition-colors"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    絞り込み
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <div className="grid grid-cols-[1fr_150px_150px_100px_100px] gap-4 p-4 font-medium border-b">
                  <div>体験名</div>
                  <div>料金</div>
                  <div>開催期間</div>
                  <div>ステータス</div>
                  <div>操作</div>
                </div>

                <div className="grid grid-cols-[1fr_150px_150px_100px_100px] gap-4 p-4 border-b">
                  <div className="font-medium">キウイ収穫体験</div>
                  <div>¥3,800 / 1名</div>
                  <div>9月〜11月</div>
                  <div>
                    <span className="px-2 py-1 text-xs text-white bg-green-500 rounded-full">公開中</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      編集
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-[1fr_150px_150px_100px_100px] gap-4 p-4 border-b">
                  <div className="font-medium">キウイ植樹体験</div>
                  <div>¥4,500 / 1名</div>
                  <div>通年</div>
                  <div>
                    <span className="px-2 py-1 text-xs text-white bg-green-500 rounded-full">公開中</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      編集
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-[1fr_150px_150px_100px_100px] gap-4 p-4 border-b">
                  <div className="font-medium">キウイジャム作り体験</div>
                  <div>¥2,800 / 1名</div>
                  <div>10月〜12月</div>
                  <div>
                    <span className="px-2 py-1 text-xs text-white bg-yellow-500 rounded-full">下書き</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      編集
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>予約枠管理</CardTitle>
                  <CardDescription>日付と時間帯ごとの予約枠数を設定できます</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <select className="h-9 rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm">
                    <option>キウイ収穫体験</option>
                    <option>キウイ植樹体験</option>
                    <option>キウイジャム作り体験</option>
                  </select>
                  <Button variant="outline" size="sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    日付指定
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4 p-4 bg-gray-50 rounded-md">
                <h3 className="flex items-center mb-2 font-medium">
                  <Calendar className="w-4 h-4 mr-2" />
                  販売設定の一括変更
                  <span className="ml-2 text-sm text-gray-500">
                    (予約・販売枠の販売設定を14個まで一括変更できます。)
                  </span>
                </h3>
                <div className="text-right">
                  <span className="text-sm font-medium">0/14 選択中</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Button variant="outline" size="sm">
                    日付指定
                  </Button>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="flex items-center">
                      <span className="inline-block w-3 h-3 mr-1 bg-green-500 rounded-full"></span>
                      即時予約
                    </span>
                    <span className="flex items-center">
                      <span className="inline-block w-3 h-3 mr-1 bg-purple-500 rounded-full"></span>
                      リクエスト予約
                    </span>
                    <span className="flex items-center">
                      <span className="inline-block w-3 h-3 mr-1 bg-orange-500 rounded-full"></span>
                      併用
                    </span>
                    <span className="flex items-center">
                      <span className="inline-block w-3 h-3 mr-1 bg-gray-300 rounded-full"></span>
                      催行なし
                    </span>
                  </div>
                </div>

                <div className="overflow-x-auto border rounded-md">
                  <table className="w-full">
                    <thead>
                      <tr className="text-center bg-gray-50">
                        <th className="p-3 border-r">
                          <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                            <ChevronLeft className="w-4 h-4" />
                          </Button>
                        </th>
                        {Array.from({ length: 14 }).map((_, index) => {
                          const date = new Date()
                          date.setDate(date.getDate() + index)
                          const day = date.getDay()
                          const isWeekend = day === 0 || day === 6

                          return (
                            <th key={index} className={`p-2 border-r text-sm ${isWeekend ? "text-red-500" : ""}`}>
                              <div>{format(date, "M/d", { locale: ja })}</div>
                              <div className="text-xs">({format(date, "E", { locale: ja })})</div>
                            </th>
                          )
                        })}
                        <th className="p-3 border-r">
                          <Button variant="outline" size="sm" className="w-8 h-8 p-0">
                            <ChevronRight className="w-4 h-4" />
                          </Button>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {TIME_SLOTS.map((slot, index) => (
                        <tr key={index} className="border-t">
                          <td className="p-3 border-r">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-2 text-gray-500" />
                              <span>{slot.time}</span>
                            </div>
                            <div className="text-xs text-gray-500">(受付制限)</div>
                          </td>
                          {Array.from({ length: 14 }).map((_, dateIndex) => (
                            <td key={dateIndex} className="p-2 text-center border-r">
                              <div className="flex flex-col items-center">
                                <div className="mb-1">
                                  <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                                </div>
                                <div className="font-bold">2</div>
                                <div className="text-xs text-gray-500">(2件)</div>
                                <div className="flex items-center mt-1">
                                  <Button variant="outline" size="sm" className="w-6 h-6 p-0 min-w-0">
                                    +
                                  </Button>
                                  <Button variant="outline" size="sm" className="w-6 h-6 p-0 min-w-0 ml-1">
                                    -
                                  </Button>
                                </div>
                              </div>
                            </td>
                          ))}
                          <td className="p-2 text-center border-r">
                            <Button variant="outline" size="sm">
                              一括
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline">キャンセル</Button>
                <Button>変更を保存</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>予約状況</CardTitle>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                    <input
                      type="search"
                      placeholder="予約を検索..."
                      className="pl-8 h-9 w-64 rounded-md border border-input bg-white px-3 py-1 text-sm shadow-sm transition-colors"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    絞り込み
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="border rounded-md">
                <div className="grid grid-cols-[150px_1fr_150px_100px_150px_100px] gap-4 p-4 font-medium border-b">
                  <div>予約番号</div>
                  <div>体験名</div>
                  <div>予約日時</div>
                  <div>人数</div>
                  <div>予約者</div>
                  <div>ステータス</div>
                </div>

                <div className="grid grid-cols-[150px_1fr_150px_100px_150px_100px] gap-4 p-4 border-b">
                  <div className="font-medium">KW-2023-0001</div>
                  <div>キウイ収穫体験</div>
                  <div>2023/10/15 11:00</div>
                  <div>2名</div>
                  <div>山田太郎</div>
                  <div>
                    <span className="px-2 py-1 text-xs text-white bg-green-500 rounded-full">確定</span>
                  </div>
                </div>

                <div className="grid grid-cols-[150px_1fr_150px_100px_150px_100px] gap-4 p-4 border-b">
                  <div className="font-medium">KW-2023-0002</div>
                  <div>キウイ植樹体験</div>
                  <div>2023/10/16 13:00</div>
                  <div>3名</div>
                  <div>佐藤花子</div>
                  <div>
                    <span className="px-2 py-1 text-xs text-white bg-yellow-500 rounded-full">保留中</span>
                  </div>
                </div>

                <div className="grid grid-cols-[150px_1fr_150px_100px_150px_100px] gap-4 p-4 border-b">
                  <div className="font-medium">KW-2023-0003</div>
                  <div>キウイ収穫体験</div>
                  <div>2023/10/18 15:00</div>
                  <div>1名</div>
                  <div>鈴木一郎</div>
                  <div>
                    <span className="px-2 py-1 text-xs text-white bg-green-500 rounded-full">確定</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
