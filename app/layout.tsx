import "@/styles/main.scss";
import Navbar from "./Navbar";
import { Plus_Jakarta_Sans } from "@next/font/google";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={jakarta.className}>
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <>
          <Navbar />
          {children}
        </>
      </body>
    </html>
  );
}
