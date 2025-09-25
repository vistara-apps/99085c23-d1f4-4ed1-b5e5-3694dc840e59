import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { ThemeProvider } from './components/ThemeProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Onchain Oracle - Blockchain Fortune Teller',
  description: 'Uncover your blockchain destiny with personalized, verifiable fortunes powered by Base network data.',
  keywords: ['blockchain', 'fortune', 'oracle', 'base', 'crypto', 'web3'],
  authors: [{ name: 'Onchain Oracle' }],
  openGraph: {
    title: 'Onchain Oracle - Blockchain Fortune Teller',
    description: 'Uncover your blockchain destiny with personalized, verifiable fortunes.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Onchain Oracle - Blockchain Fortune Teller',
    description: 'Uncover your blockchain destiny with personalized, verifiable fortunes.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <Providers>
            {children}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
