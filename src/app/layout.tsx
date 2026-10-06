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
        <Provider>
          <chakra.div id="app" css={{ height: "100%" }}>
            <chakra.div css={{ minH: "100dvh", display: "grid" }}>
              <chakra.div
                css={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100dvh",
                }}
              >
                <chakra.div
                  css={{
                    flexShrink: 0,
                    height: "48px",
                  }}
                ></chakra.div>

                <chakra.main
                  css={{
                    overflow: "hidden",
                    flex: "1 1 0%",
                    minHeight: "0px",
                    display: "grid",
                    position: "relative",
                  }}
                >
                  {/**
                   * <!---------------------------------------------------->
                   */}

                  <chakra.div css={{ position: "relative" }}>
                    <chakra.div
                      css={{ bg: "bg.subtle", flexDirection: "column", width: "100%", height: "calc(100dvh - 48px)", display: "flex", position: "relative", fontSize: "14px", lineHeight: 1.5 }}
                    >
                      <chakra.header
                        css={{
                          alignItems: "center",
                          flexShrink: 0,
                          height: "48px",
                          display: "flex",
                        }}
                      >
                        <chakra.div
                          css={{
                            paddingLeft: "12px",
                            paddingRight: "8px",
                            alignItems: "center",
                            gridTemplateColumns: "1fr auto",
                            width: "100%",
                            height: "48px",
                            display: "grid",
                          }}
                        >
                          <chakra.div
                            css={{
                              paddingRight: "2px",
                              gap: "4px",
                              alignItems: "center",
                              minWidth: "0px",
                              display: "flex",
                            }}
                          >
                            {/**
                             * Header
                             */}
                          </chakra.div>
                        </chakra.div>
                      </chakra.header>
                      <chakra.div
                        css={{
                          flex: "1 1 0%",
                          minHeight: "0px",
                          display: "flex",
                        }}
                      >
                        {children}
                      </chakra.div>
                    </chakra.div>
                  </chakra.div>
                </chakra.main>
              </chakra.div>
            </chakra.div>
          </chakra.div>
        </Provider>
      </body>
    </html>
  )
}
