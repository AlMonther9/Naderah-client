import './globals.css'
import { Navbar } from '@/components/Navbar'
import { LanguageProvider } from '@/context/language-context'
import NextAuthProvider from './providers/NextAuthProvider'
import { ToastProvider } from './providers/ToastProvider'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <NextAuthProvider>
          <ToastProvider />
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
        </NextAuthProvider>
      </body>
    </html>
  )
}
