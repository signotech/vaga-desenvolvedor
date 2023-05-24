'use client'
import { MainHome } from '@components/organisms/MainHome'
import { Header } from '@components/molecules/Header'
import { DashboardLayout } from '@components/models/DashboardLayout'

export default function Home() {
  return (
    <DashboardLayout>
      <MainHome />
    </DashboardLayout>
  )

}
