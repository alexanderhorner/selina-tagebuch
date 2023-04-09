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
        <meta
          name="apple-mobile-web-app-capable"
          content="yes"
        />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />
      </Head>
      <body className="bg-slate-800 text-slate-50 flex flex-col h-full">
        <Navbar />

        {children}

        
      </body>
    </html>
  )
}
