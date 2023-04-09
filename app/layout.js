import '@/styles/globals.css'
import Head from 'next/head';
import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'Selinas Tagebuch',
  description: 'Ein Urlaubstagebuch für meine Freundin Selina.',
}
 
export default function RootLayout({ children }) {
 return (
    <html lang="de" className="h-full bg-slate-500">
      <Head>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#1e313b" />
        <meta name="apple-mobile-web-app-title" content="Tagebuch" />
        <meta name="application-name" content="Tagebuch" />
        <meta name="msapplication-TileColor" content="#1e313b" />
        <meta name="theme-color" content="#1e313b" />
      </Head>
      <body className="bg-slate-800 text-slate-50 flex flex-col h-full">
        <Navbar />

        {children}

        
      </body>
    </html>
  )
}
