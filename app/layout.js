import './globals.css';

export const metadata = {
  title: 'TheoGrace Christmas Gift',
  description: 'A gift before the gift'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
