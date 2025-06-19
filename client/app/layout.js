import "./globals.css";

export const metadata = {
  title: "Barc | Quiz App",
  description: "A simple quiz app for BARC exam preparation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-blue-200 via-blue-50 to-indigo-200 min-h-screen text-gray-800">
        {children}
      </body>
    </html>
  );
}
