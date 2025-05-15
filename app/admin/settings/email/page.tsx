"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { Mail, Send, Save } from "lucide-react"

export default function EmailSettingsPage() {
  const [smtpSettings, setSmtpSettings] = useState({
    host: "",
    port: "587",
    secure: false,
    user: "",
    password: "",
  })
  const [testEmail, setTestEmail] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [isSending, setIsSending] = useState(false)
  const { toast } = useToast()

  const handleSmtpChange = (field: string, value: string | boolean) => {
    setSmtpSettings({
      ...smtpSettings,
      [field]: value,
    })
  }

  const handleSaveSettings = async () => {
    setIsSaving(true)

    // 実際のシステムではAPIを呼び出して設定を保存
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "設定を保存しました",
        description: "メール設定が正常に保存されました。",
        variant: "success",
      })
    }, 1000)
  }

  const handleSendTestEmail = async () => {
    if (!testEmail) {
      toast({
        title: "入力エラー",
        description: "テストメールの送信先を入力してください。",
        variant: "destructive",
      })
      return
    }

    setIsSending(true)

    // 実際のシステムではAPIを呼び出してテストメールを送信
    setTimeout(() => {
      setIsSending(false)
      toast({
        title: "テストメール送信",
        description: `${testEmail} 宛にテストメールを送信しました。`,
        variant: "success",
      })
    }, 1500)
  }

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">メール設定</h1>
      </div>

      <Tabs defaultValue="smtp">
        <TabsList className="mb-4">
          <TabsTrigger value="smtp">SMTP設定</TabsTrigger>
          <TabsTrigger value="templates">メールテンプレート</TabsTrigger>
          <TabsTrigger value="notifications">通知設定</TabsTrigger>
        </TabsList>

        <TabsContent value="smtp">
          <Card>
            <CardHeader>
              <CardTitle>SMTP設定</CardTitle>
              <CardDescription>メール送信に使用するSMTPサーバーの設定を行います</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-3">
                <Label htmlFor="smtp_host">
                  SMTPサーバー <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="smtp_host"
                  placeholder="例：smtp.gmail.com"
                  value={smtpSettings.host}
                  onChange={(e) => handleSmtpChange("host", e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="smtp_port">
                    ポート <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="smtp_port"
                    placeholder="例：587"
                    value={smtpSettings.port}
                    onChange={(e) => handleSmtpChange("port", e.target.value)}
                  />
                </div>

                <div className="grid gap-3">
                  <Label htmlFor="smtp_secure" className="mb-2">
                    セキュア接続 (SSL/TLS)
                  </Label>
                  <Switch
                    id="smtp_secure"
                    checked={smtpSettings.secure}
                    onCheckedChange={(checked) => handleSmtpChange("secure", checked)}
                  />
                </div>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="smtp_user">
                  ユーザー名 <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="smtp_user"
                  placeholder="例：your-email@gmail.com"
                  value={smtpSettings.user}
                  onChange={(e) => handleSmtpChange("user", e.target.value)}
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="smtp_password">
                  パスワード <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="smtp_password"
                  type="password"
                  placeholder="SMTPパスワードまたはアプリパスワード"
                  value={smtpSettings.password}
                  onChange={(e) => handleSmtpChange("password", e.target.value)}
                />
                <p className="text-xs text-gray-500">
                  Gmailを使用する場合は、アカウントの2段階認証を有効にし、アプリパスワードを生成してください。
                </p>
              </div>

              <div className="grid gap-3">
                <Label htmlFor="test_email">テストメール送信</Label>
                <div className="flex gap-2">
                  <Input
                    id="test_email"
                    type="email"
                    placeholder="テスト送信先のメールアドレス"
                    value={testEmail}
                    onChange={(e) => setTestEmail(e.target.value)}
                  />
                  <Button onClick={handleSendTestEmail} disabled={isSending}>
                    <Send className="w-4 h-4 mr-2" />
                    {isSending ? "送信中..." : "テスト送信"}
                  </Button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={handleSaveSettings} disabled={isSaving}>
                  <Save className="w-4 h-4 mr-2" />
                  {isSaving ? "保存中..." : "設定を保存"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle>メールテンプレート</CardTitle>
              <CardDescription>各種メールのテンプレートをカスタマイズできます</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-gray-200">
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">予約確認メール</CardTitle>
                      <Mail className="w-5 h-5 text-gray-500" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-gray-600 mb-3">
                      予約が完了した際に自動送信されるメールテンプレートです。
                    </p>
                    <Button variant="outline" size="sm">
                      編集する
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-gray-200">
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">予約リマインダー</CardTitle>
                      <Mail className="w-5 h-5 text-gray-500" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-gray-600 mb-3">
                      予約日の前日に送信されるリマインダーメールのテンプレートです。
                    </p>
                    <Button variant="outline" size="sm">
                      編集する
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-gray-200">
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">キャンセル確認</CardTitle>
                      <Mail className="w-5 h-5 text-gray-500" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-gray-600 mb-3">
                      予約がキャンセルされた際に送信されるメールのテンプレートです。
                    </p>
                    <Button variant="outline" size="sm">
                      編集する
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-gray-200">
                  <CardHeader className="p-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">管理者通知</CardTitle>
                      <Mail className="w-5 h-5 text-gray-500" />
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 pt-0">
                    <p className="text-sm text-gray-600 mb-3">
                      新規予約があった際に管理者に送信される通知メールのテンプレートです。
                    </p>
                    <Button variant="outline" size="sm">
                      編集する
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>通知設定</CardTitle>
              <CardDescription>メール通知の送信タイミングと内容を設定します</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">予約確認メール</h3>
                    <p className="text-sm text-gray-500">予約完了時に顧客に送信されます</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">予約リマインダー</h3>
                    <p className="text-sm text-gray-500">予約日の前日に顧客に送信されます</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">キャンセル確認</h3>
                    <p className="text-sm text-gray-500">予約がキャンセルされた際に顧客に送信されます</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">管理者通知（新規予約）</h3>
                    <p className="text-sm text-gray-500">新規予約があった際に管理者に通知されます</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">管理者通知（キャンセル）</h3>
                    <p className="text-sm text-gray-500">予約がキャンセルされた際に管理者に通知されます</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>

              <div className="grid gap-3 pt-4 border-t">
                <Label htmlFor="admin_email">管理者メールアドレス</Label>
                <Input id="admin_email" placeholder="例：admin@kiwinokuni.example.com" />
                <p className="text-xs text-gray-500">
                  複数のメールアドレスを登録する場合は、カンマ（,）で区切ってください。
                </p>
              </div>

              <div className="flex justify-end">
                <Button>
                  <Save className="w-4 h-4 mr-2" />
                  設定を保存
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
