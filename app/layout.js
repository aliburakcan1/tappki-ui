// app/layout.js

import { SessionProvider } from './SessionContext';  
import './globals.css';  
import Header from '../components/Header.js';  
  
export const metadata = {  
  title: 'Tepki',  
  description: 'Lightning fast reaction video search engine',  
}  
  
export default function RootLayout({ children }) {  
  return (  
    <html lang="en">  
      <head>   
        <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>    
      </head>  
      <body>  
        <SessionProvider>  
          <Header />  
          {children}  
        </SessionProvider>  
      </body>  
    </html>  
  )  
}  
