import { Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata = {
  title: 'UK North East Tech Skills Shortage Dashboard',
  description: 'Interactive dashboard analyzing the technology skills gap and shortage in the North East region of the United Kingdom, offering strategic recommendations.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={outfit.variable}>
      <body>
        {children}
      </body>
    </html>
  );
}
