"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Save, Bell, Database, User, Shield } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

export default function ConfiguracoesPage() {
  const { toast } = useToast()
  const [settings, setSettings] = useState({
    itemsPorPagina: "10",
    notificacaoEmail: true,
    notificacaoSistema: true,
    backupAutomatico: true,
    tema: "sistema",
    idioma: "pt-BR",
    nomeEmpresa: "Minha Empresa",
    emailContato: "contato@empresa.com",
  })

  const handleSave = () => {
    toast({
      title: "Configurações salvas!",
      description: "Suas preferências foram atualizadas com sucesso.",
    })
  }

  const handleSettingChange = (key: string, value: string | boolean) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center space-x-2">
        <SidebarTrigger />
        <h2 className="text-3xl font-bold tracking-tight">Configurações</h2>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Informações da Empresa
            </CardTitle>
            <CardDescription>Configure as informações básicas da sua empresa</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nomeEmpresa">Nome da Empresa</Label>
                <Input
                  id="nomeEmpresa"
                  value={settings.nomeEmpresa}
                  onChange={(e) => handleSettingChange("nomeEmpresa", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="emailContato">Email de Contato</Label>
                <Input
                  id="emailContato"
                  type="email"
                  value={settings.emailContato}
                  onChange={(e) => handleSettingChange("emailContato", e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Preferências de Exibição
            </CardTitle>
            <CardDescription>Configure como os dados são exibidos no sistema</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="itemsPorPagina">Itens por Página</Label>
                <Select
                  value={settings.itemsPorPagina}
                  onValueChange={(value) => handleSettingChange("itemsPorPagina", value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 itens</SelectItem>
                    <SelectItem value="10">10 itens</SelectItem>
                    <SelectItem value="20">20 itens</SelectItem>
                    <SelectItem value="50">50 itens</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tema">Tema</Label>
                <Select value={settings.tema} onValueChange={(value) => handleSettingChange("tema", value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="claro">Claro</SelectItem>
                    <SelectItem value="escuro">Escuro</SelectItem>
                    <SelectItem value="sistema">Sistema</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notificações
            </CardTitle>
            <CardDescription>Configure suas preferências de notificação</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificações por Email</Label>
                <p className="text-sm text-muted-foreground">
                  Receba notificações sobre novas inscrições e atualizações
                </p>
              </div>
              <Switch
                checked={settings.notificacaoEmail}
                onCheckedChange={(checked) => handleSettingChange("notificacaoEmail", checked)}
              />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Notificações do Sistema</Label>
                <p className="text-sm text-muted-foreground">Receba notificações dentro do sistema</p>
              </div>
              <Switch
                checked={settings.notificacaoSistema}
                onCheckedChange={(checked) => handleSettingChange("notificacaoSistema", checked)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Segurança e Backup
            </CardTitle>
            <CardDescription>Configure opções de segurança e backup dos dados</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Backup Automático</Label>
                <p className="text-sm text-muted-foreground">Realizar backup automático dos dados diariamente</p>
              </div>
              <Switch
                checked={settings.backupAutomatico}
                onCheckedChange={(checked) => handleSettingChange("backupAutomatico", checked)}
              />
            </div>
            <Separator />
            <div className="space-y-2">
              <Label>Último Backup</Label>
              <p className="text-sm text-muted-foreground">25 de Janeiro de 2024 às 03:00</p>
              <Button variant="outline" size="sm">
                Fazer Backup Agora
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Salvar Configurações
          </Button>
        </div>
      </div>
    </div>
  )
}
