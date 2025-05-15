"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Clock, Info, ImageIcon, DollarSign } from "lucide-react"

export default function NewExperiencePage() {
  const [timeSlots, setTimeSlots] = useState([
    { id: 1, time: "11:00 ~ 12:00", enabled: true, capacity: 2 },
    { id: 2, time: "12:00 ~ 13:00", enabled: true, capacity: 2 },
    { id: 3, time: "13:00 ~ 14:00", enabled: true, capacity: 2 },
    { id: 4, time: "14:00 ~ 15:00", enabled: false, capacity: 0 },
    { id: 5, time: "15:00 ~ 16:00", enabled: false, capacity: 0 },
  ])

  const handleTimeSlotToggle = (id: number) => {
    setTimeSlots(timeSlots.map((slot) => (slot.id === id ? { ...slot, enabled: !slot.enabled } : slot)))
  }

  const handleCapacityChange = (id: number, capacity: number) => {
    setTimeSlots(timeSlots.map((slot) => (slot.id === id ? { ...slot, capacity } : slot)))
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link href="/admin/experiences" className="flex items-center text-sm text-gray-600 hover:underline">
          <ChevronLeft className="w-4 h-4 mr-1" />
          体験一覧に戻る
        </Link>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">新規体験の追加</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">下書き保存</Button>
          <Button>公開する</Button>
        </div>
      </div>

      <Tabs defaultValue="basic">
        <TabsList className="mb-4">
          <TabsTrigger value="basic">基本情報</TabsTrigger>
          <TabsTrigger value="schedule">予約枠設定</TabsTrigger>
          <TabsTrigger value="images">画像</TabsTrigger>
          <TabsTrigger value="price">料金設定</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle>基本情報</CardTitle>
              <CardDescription>体験の基本情報を入力してください</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-3">
                <Label htmlFor="title">
                  体験名 <span className="text-red-500">*</span>
                </Label>
                <Input id="title" placeholder="例：キウイ収穫体験" />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="description">
                  説明文 <span className="text-red-500">*</span>
                </Label>
                <Textarea id="description" placeholder="体験の詳細な説明を入力してください" className="min-h-[150px]" />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="short_description">短い説明</Label>
                <Input id="short_description" placeholder="一覧表示用の短い説明" />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="duration">
                    所要時間（分） <span className="text-red-500">*</span>
                  </Label>
                  <Input id="duration" type="number" placeholder="例：90" />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="season">
                    開催シーズン <span className="text-red-500">*</span>
                  </Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="シーズンを選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="spring">春（3月〜5月）</SelectItem>
                      <SelectItem value="summer">夏（6月〜8月）</SelectItem>
                      <SelectItem value="autumn">秋（9月〜11月）</SelectItem>
                      <SelectItem value="winter">冬（12月〜2月）</SelectItem>
                      <SelectItem value="all_year">通年</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-3">
                <Label>タグ</Label>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm">
                    <span className="mr-1">+</span> 家族向け
                  </Button>
                  <Button variant="outline" size="sm">
                    <span className="mr-1">+</span> 子供向け
                  </Button>
                  <Button variant="outline" size="sm">
                    <span className="mr-1">+</span> 初心者歓迎
                  </Button>
                  <Button variant="outline" size="sm">
                    <span className="mr-1">+</span> 雨天可
                  </Button>
                  <Button variant="outline" size="sm">
                    <span className="mr-1">+</span> 記念品あり
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>予約枠設定</CardTitle>
              <CardDescription>予約可能な時間帯と定員を設定してください</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-3">
                <Label>開催期間</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="start_date" className="text-sm text-gray-500">
                      開始日
                    </Label>
                    <Input id="start_date" type="date" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="end_date" className="text-sm text-gray-500">
                      終了日
                    </Label>
                    <Input id="end_date" type="date" />
                  </div>
                </div>
              </div>

              <div className="grid gap-3">
                <Label>開催曜日</Label>
                <div className="flex flex-wrap gap-2">
                  {["月", "火", "水", "木", "金", "土", "日"].map((day, index) => (
                    <Button key={index} variant="outline" size="sm" className="w-10 h-10">
                      {day}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="grid gap-3">
                <Label>時間帯設定</Label>
                <div className="border rounded-md">
                  <div className="grid grid-cols-[1fr_100px_150px] gap-4 p-3 font-medium bg-gray-50 border-b">
                    <div>時間帯</div>
                    <div className="text-center">有効</div>
                    <div className="text-center">定員</div>
                  </div>

                  {timeSlots.map((slot) => (
                    <div key={slot.id} className="grid grid-cols-[1fr_100px_150px] gap-4 p-3 border-b items-center">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-gray-500" />
                        {slot.time}
                      </div>
                      <div className="flex justify-center">
                        <Switch checked={slot.enabled} onCheckedChange={() => handleTimeSlotToggle(slot.id)} />
                      </div>
                      <div className="flex items-center justify-center">
                        <Input
                          type="number"
                          value={slot.capacity}
                          onChange={(e) => handleCapacityChange(slot.id, Number.parseInt(e.target.value, 10))}
                          disabled={!slot.enabled}
                          className="w-20 text-center"
                          min="0"
                        />
                        <span className="ml-2">名</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-3">
                <Label>予約設定</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="min_participants" className="text-sm text-gray-500">
                      最小参加人数
                    </Label>
                    <Input id="min_participants" type="number" defaultValue="1" min="1" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="max_participants" className="text-sm text-gray-500">
                      最大参加人数
                    </Label>
                    <Input id="max_participants" type="number" defaultValue="10" min="1" />
                  </div>
                </div>
              </div>

              <div className="grid gap-3">
                <Label>予約受付期限</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="booking_start_days" className="text-sm text-gray-500">
                      予約開始日（何日前から）
                    </Label>
                    <Input id="booking_start_days" type="number" defaultValue="30" min="0" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="booking_deadline_hours" className="text-sm text-gray-500">
                      予約締切（何時間前まで）
                    </Label>
                    <Input id="booking_deadline_hours" type="number" defaultValue="24" min="0" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="images">
          <Card>
            <CardHeader>
              <CardTitle>画像設定</CardTitle>
              <CardDescription>体験の画像をアップロードしてください</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-3">
                <Label>
                  メイン画像 <span className="text-red-500">*</span>
                </Label>
                <div className="flex items-center justify-center border-2 border-dashed rounded-md h-60">
                  <div className="text-center">
                    <ImageIcon className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">
                      ドラッグ＆ドロップ、または
                      <Button variant="link" className="h-auto p-0">
                        ファイルを選択
                      </Button>
                    </p>
                    <p className="text-xs text-gray-400">推奨サイズ: 1200 x 800px, 最大5MB</p>
                  </div>
                </div>
              </div>

              <div className="grid gap-3">
                <Label>ギャラリー画像（最大5枚）</Label>
                <div className="flex items-center justify-center border-2 border-dashed rounded-md h-40">
                  <div className="text-center">
                    <ImageIcon className="w-10 h-10 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-500">
                      ドラッグ＆ドロップ、または
                      <Button variant="link" className="h-auto p-0">
                        ファイルを選択
                      </Button>
                    </p>
                    <p className="text-xs text-gray-400">推奨サイズ: 800 x 600px, 最大3MB/枚</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="price">
          <Card>
            <CardHeader>
              <CardTitle>料金設定</CardTitle>
              <CardDescription>体験の料金を設定してください</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-3">
                <Label htmlFor="price_adult">
                  大人料金（1名あたり） <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                  <Input id="price_adult" className="pl-9" placeholder="例：3800" />
                </div>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="price_child">子供料金（1名あたり）</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
                  <Input id="price_child" className="pl-9" placeholder="例：1900" />
                </div>
                <p className="text-xs text-gray-500">※子供料金を設定しない場合は空欄にしてください。</p>
              </div>

              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="group_discount">団体割引</Label>
                  <Switch id="group_discount" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="group_min" className="text-sm text-gray-500">
                      最小人数
                    </Label>
                    <Input id="group_min" type="number" placeholder="例：5" disabled />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="group_discount_rate" className="text-sm text-gray-500">
                      割引率（%）
                    </Label>
                    <Input id="group_discount_rate" type="number" placeholder="例：10" disabled />
                  </div>
                </div>
              </div>

              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <Label htmlFor="seasonal_pricing">季節料金</Label>
                  <Switch id="seasonal_pricing" />
                </div>
                <div className="p-4 bg-gray-50 rounded-md">
                  <p className="flex items-center text-sm text-gray-600">
                    <Info className="w-4 h-4 mr-2" />
                    季節料金を有効にすると、特定の期間に異なる料金を設定できます。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
