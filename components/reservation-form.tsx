"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { format, addDays, isSameDay } from "date-fns"
import { ja } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

// 予約可能な時間帯
const TIME_SLOTS = [
  { id: 1, time: "11:00 ~ 12:00", available: 2 },
  { id: 2, time: "12:00 ~ 13:00", available: 2 },
  { id: 3, time: "13:00 ~ 14:00", available: 2 },
  { id: 4, time: "14:00 ~ 15:00", available: 2 },
  { id: 5, time: "15:00 ~ 16:00", available: 2 },
]

// 予約可能日の生成（現在から30日間）
const generateAvailableDates = () => {
  const dates = []
  const today = new Date()

  for (let i = 1; i <= 30; i++) {
    const date = addDays(today, i)
    // 各日付に利用可能な枠数をランダムに設定（実際のシステムではDBから取得）
    const availableSlots = TIME_SLOTS.map((slot) => ({
      ...slot,
      available: Math.floor(Math.random() * 5) + 1, // 1-5の範囲でランダムに設定
    }))

    dates.push({
      date,
      dayOfWeek: format(date, "E", { locale: ja }),
      isWeekend: [0, 6].includes(date.getDay()),
      slots: availableSlots,
    })
  }

  return dates
}

export default function ReservationForm({ experienceName = "キウイ収穫体験", pricePerPerson = 3800 }) {
  const [availableDates] = useState(generateAvailableDates())
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string | undefined>(undefined)
  const [participants, setParticipants] = useState("1")
  const [customerName, setCustomerName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1) // 1: 日時選択, 2: 個人情報入力
  const { toast } = useToast()
  const router = useRouter()

  // 選択された日付の予約可能枠を取得
  const getAvailableSlotsForDate = () => {
    if (!selectedDate) return []

    const dateInfo = availableDates.find((d) => isSameDay(d.date, selectedDate))
    return dateInfo ? dateInfo.slots : []
  }

  // 日付選択時の処理
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date)
    setSelectedTimeSlot(undefined) // 日付変更時に時間枠をリセット
  }

  // 次のステップへ進む
  const handleNextStep = () => {
    if (!selectedDate || !selectedTimeSlot) {
      toast({
        title: "入力エラー",
        description: "日付と時間を選択してください",
        variant: "destructive",
      })
      return
    }
    setStep(2)
  }

  // 前のステップに戻る
  const handlePreviousStep = () => {
    setStep(1)
  }

  // 予約を確定する
  const handleSubmitReservation = async () => {
    if (!customerName || !email || !phone) {
      toast({
        title: "入力エラー",
        description: "すべての必須項目を入力してください",
        variant: "destructive",
      })
      return
    }

    if (!selectedDate || !selectedTimeSlot) {
      toast({
        title: "入力エラー",
        description: "日付と時間を選択してください",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // 予約APIを呼び出し
      const response = await fetch("/api/send-confirmation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerName,
          email,
          phone,
          experienceName,
          date: selectedDate.toISOString(),
          timeSlot: selectedTimeSlot,
          participants: Number.parseInt(participants, 10),
          totalPrice: pricePerPerson * Number.parseInt(participants, 10),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        toast({
          title: "予約完了",
          description: `予約が確定しました。確認メールをお送りしました。予約番号: ${data.reservationId}`,
          variant: "success",
        })

        // 予約完了ページへリダイレクト
        router.push(`/experiences/confirmation?reservationId=${data.reservationId}`)
      } else {
        throw new Error(data.error || "予約処理中にエラーが発生しました")
      }
    } catch (error) {
      console.error("予約エラー:", error)
      toast({
        title: "エラー",
        description: error instanceof Error ? error.message : "予約処理中にエラーが発生しました",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid gap-8 md:grid-cols-[1fr_300px]">
      <div>
        {step === 1 ? (
          <>
            <Card>
              <CardHeader>
                <CardTitle>日付を選択</CardTitle>
                <CardDescription>カレンダーから予約希望日を選択してください</CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateSelect}
                  locale={ja}
                  className="mx-auto"
                  disabled={{ before: new Date() }}
                />
              </CardContent>
            </Card>

            {selectedDate && (
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>時間を選択</CardTitle>
                  <CardDescription>
                    {format(selectedDate, "yyyy年MM月dd日 (E)", { locale: ja })}の予約可能時間
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {getAvailableSlotsForDate().map((slot) => (
                      <Button
                        key={slot.id}
                        variant={selectedTimeSlot === slot.time ? "default" : "outline"}
                        className="justify-between"
                        onClick={() => setSelectedTimeSlot(slot.time)}
                        disabled={slot.available === 0}
                      >
                        <span className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          {slot.time}
                        </span>
                        <span className="text-sm">残り{slot.available}枠</span>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>お客様情報</CardTitle>
              <CardDescription>予約者情報を入力してください</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">
                    お名前 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="name"
                    placeholder="例：山田 太郎"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">
                    メールアドレス <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="例：example@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <p className="text-xs text-gray-500">予約確認メールをお送りします</p>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phone">
                    電話番号 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="phone"
                    placeholder="例：090-1234-5678"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="notes">備考</Label>
                  <textarea
                    id="notes"
                    className="min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="アレルギーや特別なご要望などがあればご記入ください"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>予約内容</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="mb-1 text-sm font-medium text-gray-500">体験</h4>
                <p className="font-medium">{experienceName}</p>
              </div>

              <div>
                <h4 className="mb-1 text-sm font-medium text-gray-500">日付</h4>
                <p className="font-medium">
                  {selectedDate ? format(selectedDate, "yyyy年MM月dd日 (E)", { locale: ja }) : "日付を選択してください"}
                </p>
              </div>

              <div>
                <h4 className="mb-1 text-sm font-medium text-gray-500">時間</h4>
                <p className="font-medium">{selectedTimeSlot || "時間を選択してください"}</p>
              </div>

              <div>
                <h4 className="mb-1 text-sm font-medium text-gray-500">参加人数</h4>
                <Select value={participants} onValueChange={setParticipants}>
                  <SelectTrigger>
                    <SelectValue placeholder="人数を選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1名</SelectItem>
                    <SelectItem value="2">2名</SelectItem>
                    <SelectItem value="3">3名</SelectItem>
                    <SelectItem value="4">4名</SelectItem>
                    <SelectItem value="5">5名</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between mb-2">
                  <span>料金（1名あたり）</span>
                  <span>¥{pricePerPerson.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between mb-4 font-bold">
                  <span>合計</span>
                  <span>¥{(pricePerPerson * Number.parseInt(participants, 10)).toLocaleString()}</span>
                </div>

                {step === 1 ? (
                  <Button className="w-full" disabled={!selectedDate || !selectedTimeSlot} onClick={handleNextStep}>
                    次へ進む
                  </Button>
                ) : (
                  <div className="flex flex-col gap-2">
                    <Button className="w-full" disabled={isSubmitting} onClick={handleSubmitReservation}>
                      {isSubmitting ? "送信中..." : "予約を確定する"}
                    </Button>
                    <Button variant="outline" className="w-full" onClick={handlePreviousStep} disabled={isSubmitting}>
                      戻る
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
