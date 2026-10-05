import { chakra } from "@chakra-ui/react"

/**
 * Layout
 */
export const Root = ({ children }: { children: React.ReactNode }) => {
  return (
    <chakra.div
      css={{
        display: "grid",
        minHeight: "100vh",
        gridTemplateAreas: `
            "banner"
            "top-bar"
            "main"
            "aside"
       `,
        gridTemplateColumns: "minmax(0, 1fr)",
        gridTemplateRows: "auto auto 1fr auto",
      }}
    >
      {children}
    </chakra.div>
  )
}

export const Aside = ({ children }: { children: React.ReactNode }) => {
  return <chakra.div>{children}</chakra.div>
}

export const Banner = ({ children }: { children: React.ReactNode }) => {
  return <chakra.div>{children}</chakra.div>
}

export const Main = ({ children }: { children: React.ReactNode }) => {
  return <chakra.div>{children}</chakra.div>
}

export const Panel = ({ children }: { children: React.ReactNode }) => {
  return <chakra.div>{children}</chakra.div>
}

export const PanelSplitter = ({ children }: { children: React.ReactNode }) => {
  return <chakra.div>{children}</chakra.div>
}

/**
 * TopNav
 */
export const TopNav = ({ children }: { children: React.ReactNode }) => {
  return (
    <chakra.header
      css={{
        gridArea: "top-bar",
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        paddingInline: "12px",
        gap: "8px",
        alignItems: "center",
        backgroundColor: "bg.panel",
        boxSizing: "border-box",
        borderBlockEnd: "1px solid #0b120e24",
        height: "48px",
        insetBlockStart: 0,
        position: "sticky",
        zIndex: 4,
      }}
    >
      {children}
    </chakra.header>
  )
}

export const TopNavStart = ({ children }: { children: React.ReactNode }) => {
  return (
    <chakra.div
      css={{
        boxSizing: "border-box",
        paddingInlineStart: "12px",
        height: "100%",
        alignItems: "center",
        display: "flex",
        gap: "4px",
        gridColumn: 1,
      }}
    >
      <chakra.div
        css={{
          display: "inherit",
          gap: "inherit",
          alignItems: "center",
          minWidth: 0,
        }}
      >
        {children}
      </chakra.div>
    </chakra.div>
  )
}

export const TopNavMiddle = ({ children }: { children: React.ReactNode }) => {
  return (
    <chakra.div
      css={{
        justifyItems: "end",
        gridAutoColumns: "max-content",
        gridAutoFlow: "column",
        gridTemplateColumns: "minmax(min-content, 780px)",
        display: "grid",
        justifyContent: "end",
        width: "100%",
        alignItems: "center",
        gridColumn: 2,
        gap: "8px",
      }}
    >
      {children}
    </chakra.div>
  )
}

export const TopNavEnd = ({ children }: { children: React.ReactNode }) => {
  return (
    <chakra.nav
      css={{
        justifySelf: "end",
        boxSizing: "border-box",
        width: "max-content",
        justifyContent: "end",
        display: "flex",
        gridColumn: 3,
      }}
    >
      <chakra.div
        role="list"
        css={{
          alignItems: "center",
          gap: "4px",
          display: "flex",
        }}
      >
        {children}
      </chakra.div>
    </chakra.nav>
  )
}


/**
 * TopNavItems
 */
export const AppLogo = ({ children }: { children: React.ReactNode }) => {
  return <chakra.div>{children}</chakra.div>
}

export const AppSwitcher = ({ children }: { children: React.ReactNode }) => {
  return <chakra.div>{children}</chakra.div>
}

export const CreateButton = ({ children }: { children: React.ReactNode }) => {
  return <chakra.div>{children}</chakra.div>
}

export const Help = ({ children }: { children: React.ReactNode }) => {
  return <chakra.div>{children}</chakra.div>
}

export const Notifications = ({ children }: { children: React.ReactNode }) => {
  return <chakra.div>{children}</chakra.div>
}

export const Profile = ({ children }: { children: React.ReactNode }) => {
  return <chakra.div>{children}</chakra.div>
}

export const Search = ({ children }: { children: React.ReactNode }) => {
  return <chakra.div>{children}</chakra.div>
}

export const Settings = ({ children }: { children: React.ReactNode }) => {
  return <chakra.div>{children}</chakra.div>
}

/**
 * SideNav
 */
export const SideNav = ({ children }: { children: React.ReactNode }) => {
  return <chakra.div>{children}</chakra.div>
}

export const SideNavHeader = ({ children }: { children: React.ReactNode }) => {
  return <chakra.div>{children}</chakra.div>
}

export const SideNavBody = ({ children }: { children: React.ReactNode }) => {
  return <chakra.div>{children}</chakra.div>
}

export const SideNavFooter = ({ children }: { children: React.ReactNode }) => {
  return <chakra.div>{children}</chakra.div>
}

export const SideNavPanelSplitter = ({ children }: { children: React.ReactNode }) => {
  return <chakra.div>{children}</chakra.div>
}

/**
 * SideNavItems
 */
export const ButtonMenuItem = ({ children }: { children: React.ReactNode }) => {
  return <chakra.div>{children}</chakra.div>
}

export const ExpandableMenuItem = ({ children }: { children: React.ReactNode }) => {
  return <chakra.div>{children}</chakra.div>
}

export const ExpandableMenuItemContent = ({ children }: { children: React.ReactNode }) => {
  return <chakra.div>{children}</chakra.div>
}

export const ExpandableMenuItemTrigger = ({ children }: { children: React.ReactNode }) => {
  return <chakra.div>{children}</chakra.div>
}

export const FlyoutMenuItem = ({ children }: { children: React.ReactNode }) => {
  return <chakra.div>{children}</chakra.div>
}

export const FlyoutMenuItemContent = ({ children }: { children: React.ReactNode }) => {
  return <chakra.div>{children}</chakra.div>
}

export const FlyoutMenuItemTrigger = ({ children }: { children: React.ReactNode }) => {
  return <chakra.div>{children}</chakra.div>
}

export const LinkMenuItem = ({ children }: { children: React.ReactNode }) => {
  return <chakra.div>{children}</chakra.div>
}

export const MenuList = ({ children }: { children: React.ReactNode }) => {
  return <chakra.div>{children}</chakra.div>
}

export const Divider = ({ children }: { children: React.ReactNode }) => {
  return <chakra.div>{children}</chakra.div>
}


