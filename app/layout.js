// app/layout.js

import { SessionProvider } from './SessionContext';  
import './globals.css';  
import Header from '../components/Header.js';  
import Footer from '../components/Footer.js';
  
export const metadata = {  
  title: 'Tepki',  
  description: 'Lightning fast reaction video search engine',  
}  
  
export default function RootLayout({ children }) {  
  return (  
    <html lang="en">  
      <head>   
        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>  
        <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4779648569779492" crossorigin="anonymous"></script> 
        <meta name="monetag" content="16c8ddcbde529956528d0afd72ae1a65"></meta>
      </head>  
      <body>  
        <SessionProvider>  
          <Header />  
          {children}  
          <Footer />
        </SessionProvider>  
      </body>  
    </html>  
  )  
}  
