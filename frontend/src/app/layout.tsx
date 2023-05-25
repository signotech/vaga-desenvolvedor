import { Inter } from 'next/font/google'
import '../styles/global.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Sistema de pedidos',
  description: 'Sistema de gerenciamento de pedidos, produtos e clientes.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </head>
        <body className={inter.className}>{children}</body>
    </html>
  )
}
