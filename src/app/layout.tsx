import { MedievalSharp } from 'next/font/google'
import './globals.css'

const medievalFont = MedievalSharp({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-medieval'
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={medievalFont.variable}>
      <body className="min-h-screen bg-background font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
