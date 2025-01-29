// app/layout.js
import { Poppins } from "next/font/google";
import "./globals.css"; // Ensure the correct path to your global CSS file

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "MedSphere",
  description: "Page Description",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/drugs.ico" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={`${poppins.className}`}>{children}</body>
    </html>
  );
}
