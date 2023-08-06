// These styles apply to every route in the application
import './globals.css'
 
export const metadata = {
  title: 'Tappki',
  description: 'Lightning fast reaction video search engine',
}
 
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>  
      </head>
      <body>{children}</body>
    </html>
  )
}