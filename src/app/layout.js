import './globals.css'
import { Inter } from 'next/font/google'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AuthProvider from './contextProvider/AuthProvider';
import Favicon from "../../public/favicon.ico"
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'SDMS',
  description: 'Capstone Project For PreRequisites in Graduation',
  icons: [{ rel: 'icon', url: Favicon.src }],
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
            {children}
        </AuthProvider>
      </body>
    </html>
  )
}
