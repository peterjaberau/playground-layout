import { Provider } from "./provider"
import { chakra } from "@chakra-ui/react"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning style={{ overflow: "hidden" }}>
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
