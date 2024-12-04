import { ICSForm } from '@/components/ICSForm'

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 bg-slate-600">
      <h1 className="text-2xl font-bold mb-4">Gerador de ICS</h1>
      <ICSForm />
    </div>
  )
}

