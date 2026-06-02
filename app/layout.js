import { Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata = {
  title: 'NE UK Tech Skills Shortage Dashboard | Data Analytics',
  description: 'Interactive dashboard analysing the technology skills gap in the North East UK (Newcastle, Sunderland & Durham). Explore workforce data, shortfall charts, hiring metrics, and 10 strategic recommendations.',
  keywords: ['tech skills shortage', 'North East UK', 'Newcastle', 'data dashboard', 'workforce analytics', 'cybersecurity', 'AI jobs', 'skills gap'],
  authors: [{ name: 'Seyi Musibau' }],
  openGraph: {
    title: 'North East UK Tech Skills Shortage Dashboard',
    description: 'Interactive workforce analytics dashboard for the North East UK tech sector.',
    type: 'website',
  },
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
