import { chakra, Button } from "@chakra-ui/react"

const EnvironmentRail = () => {
  return (
    <chakra.div
      //className="flex w-[72px] shrink-0 flex-col border-r border-border"
      css={{
        display: "flex",
        width: "72px",
        flexShrink: 0,
        flexDirection: "column",
        borderRightWidth: "1px",
        borderRightColor: "border",
        borderStyle: "solid",
      }}
    ></chakra.div>
  )
}

const AppShell = () => {
  return (
    <chakra.div
      //className="flex h-full min-h-0 w-full overflow-hidden bg-muted/40"
      css={{
        display: "flex",
        height: "full",
        minHeight: 0,
        width: "full",
        overflow: "hidden",
        backgroundColor: "bg.subtle",
      }}
    >
      <EnvironmentRail/>

    </chakra.div>
  )
}



const TitleBarMenu = ({ children }: any) => {
  return (
    <Button
      variant={"ghost"}
      size={"sm"}
      css={{
        height: "7",
        gap: "1.5",
        paddingLeft: "2",
        paddingRight: "2",
        fontSize: "xs",
      }}
    >
      {children}
    </Button>
  )
}

const TitleBar = ({ children }: any) => {
  return (
    <chakra.header
      data-drag-region
      //className="relative flex h-9 shrink-0 select-none items-center border-b border-border pl-2"
      css={{
        position: "relative",
        display: "flex",
        height: "9",
        flexShrink: 0,
        userSelect: "none",
        alignItems: "center",
        borderBottomWidth: "1px",
        borderBottomColor: "border",
        borderStyle: "solid",
        paddingLeft: "2",
      }}
    >
      <chakra.div
        data-drag-region
        css={{
          display: "flex",
          minWidth: 0,
          flex: 1,
          alignItems: "center",
          alignSelf: "stretch",
        }}
      >
        {children}
      </chakra.div>
    </chakra.header>
  )
}

const App = ({ children }: any) => {
  return (
    <chakra.div
      //className="flex h-screen flex-col overflow-hidden bg-background text-foreground"
      css={{
        display: "flex",
        h: "100vh",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {children}
    </chakra.div>
  )
}

export default () => {
  return (
    <App>
      <TitleBar>
        {/* left side. */}
        <TitleBarMenu>File</TitleBarMenu>
        <TitleBarMenu>Window</TitleBarMenu>
        <TitleBarMenu>View</TitleBarMenu>
        <TitleBarMenu>Help</TitleBarMenu>
        {/* Centred breadcrumb — absolutely positioned so it stays in the
              middle of the bar regardless of action button widths. */}

        <chakra.div
          css={{
            pointerEvents: "none",
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <chakra.div
            css={{
              display: "flex",
              alignItems: "center",
              gap: "2",
              fontFamily: "monospace",
              fontSize: "sm",
            }}
          >
            <chakra.span
              css={{
                fontWeight: "semibold",
                letterSpacing: "tight",
              }}
            >
              huginndb
            </chakra.span>
          </chakra.div>
        </chakra.div>

        {/* Right — the notification bell, then the panel toggles. The bell
              sits with the chrome controls rather than in the status bar: it is
              a thing you click, its unread badge has to be noticed, and the
              status bar's 10px row gave it neither the size nor the contrast to
              be either. */}

        <chakra.div
          // className="ml-auto flex items-center gap-1"
          css={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: "1",
          }}
        >
          <TitleBarMenu>Notify</TitleBarMenu>
          <chakra.span
            aria-hidden
            // className="mx-0.5 h-4 w-px bg-border"
            css={{
              marginLeft: "0.5",
              marginRight: "0.5",
              height: "4",
              width: "1px",
              backgroundColor: "bg.subtle",
            }}
          />
          <TitleBarMenu>Toggle</TitleBarMenu>
        </chakra.div>
      </TitleBar>

      <chakra.div
        css={{
          display: "flex",
          flex: 1,
          minHeight: 0,
          overflow: "hidden",
        }}
      >

        <AppShell />

      </chakra.div>
    </App>
  )
}
