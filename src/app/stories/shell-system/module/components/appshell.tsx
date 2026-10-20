"use client"
import React from "react"
import { Button, Flex, IconButton } from "@chakra-ui/react"
import { LuFolder as IconFolder, LuFolderOpen as IconFolderOpen } from "react-icons/lu"
import { MdCenterFocusStrong as IconPush, MdOutlineCenterFocusStrong as IconOverlay } from "react-icons/md"
import { DraggablePanel } from "./draggable-panel"
import { useAppShell } from "../providers"

export function AppShell() {
  const {
    appShellConfig,
    expandLeftPanel,
    expandRightPanel,
    expandBottomPanel,
    setLeftPanelExpanded,
    setRightPanelExpanded,
    setBottomPanelExpanded,
    toggleLeftPanelMode,
    toggleRightPanelMode,
    toggleBottomPanelMode,
    isLeftPanelPush,
    isLeftPanelOverlay,
    isRightPanelPush,
    isRightPanelOverlay,
    isBottomPanelPush,
    isBottomPanelOverlay,
  } = useAppShell()

  return (
    <Flex data-test-id="shell-root" direction="column" height="100%" position="relative" width="100%">
      {/* Header */}
      <Flex
        data-test-id="shell-header"
        direction="row"
        css={{
          justifyContent: "space-between",
          width: "full",
          height: "50px",
          borderBottom: "1px solid",
          borderBottomColor: "border",
          p: 2,
        }}
      >
        {/* Header - Start */}
        <Flex
          data-test-id="shell-header-start"
          direction="row"
          css={{
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Button onClick={expandLeftPanel} size="xs" variant={appShellConfig.leftPanel.isExpanded ? "subtle" : "ghost"}>
            {appShellConfig.leftPanel.isExpanded ? <IconFolderOpen /> : <IconFolder />} Left Expand
          </Button>
          <Button onClick={toggleLeftPanelMode} size="xs" variant={isLeftPanelPush ? "subtle" : "ghost"}>
            {isLeftPanelPush ? <IconPush /> : <IconOverlay />} Left {isLeftPanelPush ? "Push" : "Overlay"}
          </Button>
        </Flex>
        {/* Header - center */}
        <Flex
          data-test-id="shell-header-center"
          direction={"row"}
          css={{
            flex: 1,
            justifyContent: "center",
            borderLeft: "1px dotted",
            borderLeftColor: "border",
            borderRight: "1px dotted",
            borderRightColor: "border",
            gap: 2,
          }}
        >
          <Button onClick={expandBottomPanel} size="xs" variant={appShellConfig.bottomPanel.isExpanded ? "subtle" : "ghost"}>
            {appShellConfig.bottomPanel.isExpanded ? <IconFolderOpen /> : <IconFolder />} Bottom Panel
          </Button>
          <Button onClick={toggleBottomPanelMode} size="xs" variant={isBottomPanelPush ? "subtle" : "ghost"}>
            {isBottomPanelPush ? <IconPush /> : <IconOverlay />} Bottom {isBottomPanelPush ? "Push" : "Overlay"}
          </Button>
        </Flex>

        {/* Header - end */}
        <Flex
          data-test-id="shell-header-end"
          direction={"row"}
          css={{
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Button onClick={expandRightPanel} size="xs" variant={appShellConfig.rightPanel.isExpanded ? "subtle" : "ghost"}>
            {appShellConfig.rightPanel.isExpanded ? <IconFolderOpen /> : <IconFolder />} Right Expand
          </Button>
          <Button onClick={toggleRightPanelMode} size="xs" variant={isRightPanelPush ? "subtle" : "ghost"}>
            {isRightPanelPush ? <IconPush /> : <IconOverlay />} Right {isRightPanelPush ? "Push" : "Overlay"}
          </Button>
        </Flex>
      </Flex>

      {/* main */}

      <Flex data-test-id="shell-main" direction="row" width="100%" height="100%" maxWidth="100vw" overflow="hidden" position="relative">
        {/* Left Sidebar */}
        <Flex
          data-test-id="shell-left-sidebar"
          direction="column"
          css={{
            justifyContent: "space-between",
            width: "50px",
            height: "full",
            borderRight: "1px solid",
            borderRightColor: "border",
            p: 2,
          }}
        >
          {/* Left Sidebar - Start */}
          <Flex
            data-test-id="shell-left-sidebar-start"
            direction="column"
            css={{
              justifyContent: "center",
              gap: 2,
            }}
          >
            <IconButton onClick={expandLeftPanel} size="xs" variant={appShellConfig.leftPanel.isExpanded ? "subtle" : "ghost"}>
              {appShellConfig.leftPanel.isExpanded ? <IconFolderOpen /> : <IconFolder />}
            </IconButton>
            <IconButton size="xs" variant="ghost" disabled>
              <IconFolder />
            </IconButton>
          </Flex>
          {/* Left Sidebar - center */}
          <Flex
            data-test-id="shell-left-sidebar-center"
            direction={"column"}
            css={{
              flex: 1,
              justifyContent: "center",
              borderTop: "1px dotted",
              borderTopColor: "border",
              borderBottom: "1px dotted",
              borderBottomColor: "border",
              gap: 2,
            }}
          >
            <IconButton size="xs" variant="ghost" disabled>
              <IconFolder />
            </IconButton>
            <IconButton size="xs" variant="ghost" disabled>
              <IconFolder />
            </IconButton>
          </Flex>

          {/* Left Sidebar - end */}
          <Flex
            data-test-id="shell-left-sidebar-end"
            direction={"column"}
            css={{
              justifyContent: "center",
              gap: 2,
            }}
          >
            <IconButton size="xs" variant="ghost" disabled>
              <IconFolder />
            </IconButton>
            <IconButton size="xs" variant="ghost" disabled>
              <IconFolder />
            </IconButton>
          </Flex>
        </Flex>

        {/* left draggable panel */}
        <DraggablePanel
          data-test-id="shell-left-sidepanel"
          expand={appShellConfig.leftPanel.isExpanded}
          mode={appShellConfig.leftPanel.mode}
          css={
            isLeftPanelOverlay && {
              left: "50px",
            }
          }
          showHandleHighlight={true}
          placement="left"
          onExpandChange={setLeftPanelExpanded}
          onModeChange={toggleLeftPanelMode}
        >
          <DraggablePanel.Container style={{ flex: 1 }}>
            <DraggablePanel.Header data-test-id="shell-left-sidepanel-header" title="Header Left" />
            <DraggablePanel.Body data-test-id="shell-left-sidepanel-body">DraggablePanel Left DraggablePanel Left DraggablePanel Left DraggablePanel Left DraggablePanel Left </DraggablePanel.Body>
            <DraggablePanel.Footer data-test-id="shell-left-sidepanel-footer">Footer Left</DraggablePanel.Footer>
          </DraggablePanel.Container>
        </DraggablePanel>

        {/* content */}
        <Flex data-test-id="shell-content" flex={1} direction="column" width="100%" height="100%" overflow="hidden" position="relative">
          <Flex flex={1} direction="column" overflow="hidden auto" position="relative" backgroundColor="white" p={1}>
            content
          </Flex>
          <DraggablePanel
            showHandleHighlight={true}
            expand={appShellConfig.bottomPanel.isExpanded}
            mode={appShellConfig.bottomPanel.mode}
            placement="bottom"
            onExpandChange={setBottomPanelExpanded}
            onModeChange={toggleBottomPanelMode}
          >
            <DraggablePanel.Container style={{ flex: 1 }}>
              <DraggablePanel.Header title="Header Bottom" />
              <DraggablePanel.Body>
                DraggablePanel Bottom DraggablePanel Bottom DraggablePanel Bottom DraggablePanel Bottom DraggablePanel Bottom DraggablePanel Bottom DraggablePanel Bottom DraggablePanel Bottom
                DraggablePanel Bottom DraggablePanel Bottom DraggablePanel Bottom DraggablePanel Bottom DraggablePanel Bottom DraggablePanel Bottom DraggablePanel Bottom DraggablePanel Bottom
                DraggablePanel Bottom{" "}
              </DraggablePanel.Body>
              <DraggablePanel.Footer>Footer Bottom</DraggablePanel.Footer>
            </DraggablePanel.Container>
          </DraggablePanel>
        </Flex>

        {/* right draggable panel */}
        <DraggablePanel
          showHandleHighlight={true}
          expand={appShellConfig.rightPanel.isExpanded}
          mode={appShellConfig.rightPanel.mode}
          css={
            isRightPanelOverlay && {
              right: "50px",
            }
          }
          placement="right"
          onExpandChange={setRightPanelExpanded}
          onModeChange={toggleRightPanelMode}
        >
          <DraggablePanel.Container style={{ flex: 1 }}>
            <DraggablePanel.Header title="Header Right" />
            <DraggablePanel.Body>DraggablePanel Right</DraggablePanel.Body>
            <DraggablePanel.Footer>Footer Right</DraggablePanel.Footer>
          </DraggablePanel.Container>
        </DraggablePanel>

        {/* Right Sidebar */}
        <Flex
          direction="column"
          css={{
            justifyContent: "space-between",
            width: "50px",
            height: "full",
            borderLeft: "1px solid",
            borderLeftColor: "border",
            p: 2,
          }}
        >
          {/* Right Sidebar - Start */}
          <Flex
            direction="column"
            css={{
              justifyContent: "center",
              gap: 2,
            }}
          >
            <IconButton onClick={expandRightPanel} size="xs" variant={appShellConfig.rightPanel.isExpanded ? "subtle" : "ghost"}>
              {appShellConfig.rightPanel.isExpanded ? <IconFolderOpen /> : <IconFolder />}
            </IconButton>
          </Flex>
          {/* Left Sidebar - center */}
          <Flex
            direction={"column"}
            css={{
              flex: 1,
              justifyContent: "center",
              borderTop: "1px dotted",
              borderTopColor: "border",
              borderBottom: "1px dotted",
              borderBottomColor: "border",
              gap: 2,
            }}
          >
            <IconButton size="xs" variant="ghost" disabled>
              <IconFolder />
            </IconButton>
            <IconButton size="xs" variant="ghost" disabled>
              <IconFolder />
            </IconButton>
          </Flex>

          {/* Right Sidebar - end */}
          <Flex
            direction={"column"}
            css={{
              justifyContent: "center",
              gap: 2,
            }}
          >
            <IconButton size="xs" variant="ghost" disabled>
              <IconFolder />
            </IconButton>
            <IconButton size="xs" variant="ghost" disabled>
              <IconFolder />
            </IconButton>
          </Flex>
        </Flex>
      </Flex>

      {/* Status Bar */}
      <Flex
        data-test-id="shell-bottom"
        direction="row"
        css={{
          justifyContent: "space-between",
          width: "full",
          height: "50px",
          borderTop: "1px solid",
          borderTopColor: "border",
          p: 2,
        }}
      >
        {/* Header - Start */}
        <Flex
          direction="row"
          css={{
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Button onClick={expandLeftPanel} size="xs" variant={appShellConfig.leftPanel.isExpanded ? "subtle" : "ghost"}>
            {appShellConfig.leftPanel.isExpanded ? <IconFolderOpen /> : <IconFolder />} Left Panel
          </Button>
        </Flex>
        {/* Header - center */}
        <Flex
          direction={"row"}
          css={{
            flex: 1,
            justifyContent: "center",
            borderLeft: "1px dotted",
            borderLeftColor: "border",
            borderRight: "1px dotted",
            borderRightColor: "border",
            gap: 2,
          }}
        >
          <Button onClick={expandBottomPanel} size="xs" variant={appShellConfig.bottomPanel.isExpanded ? "subtle" : "ghost"}>
            {appShellConfig.bottomPanel.isExpanded ? <IconFolderOpen /> : <IconFolder />} Bottom Panel
          </Button>
        </Flex>

        {/* Header - end */}
        <Flex
          direction={"row"}
          css={{
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Button onClick={expandRightPanel} size="xs" variant={appShellConfig.rightPanel.isExpanded ? "subtle" : "ghost"}>
            {appShellConfig.rightPanel.isExpanded ? <IconFolderOpen /> : <IconFolder />} Right Panel
          </Button>
        </Flex>
      </Flex>
    </Flex>
  )
}
