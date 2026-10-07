"use client"
import React from "react"
import { Flexbox } from "react-layout-kit"
import { Button, HStack, Flex, IconButton, Text } from "@chakra-ui/react"
import { LuFolder as IconFolder, LuFolderOpen as IconFolderOpen } from "react-icons/lu"
import { DraggablePanel } from "#components/draggable-panel"
import { useAppShell } from "../providers"

function AppShell() {
  const {
    appShellConfig,
    expandLeftPanel,
    expandRightPanel,
    expandBottomPanel,
    pinLeftPanel,
    pinRightPanel,
    pinBottomPanel
  } = useAppShell()


  return (
    <Flexbox direction={"vertical"} height={"100%"} style={{ position: "relative" }} width={"100%"}>
      {/* Header */}
      <Flex
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
          direction="row"
          css={{
            justifyContent: "center",
            gap: 2,
          }}
        >
          <Button
            onClick={expandLeftPanel}
            size="xs"
            variant={appShellConfig.leftPanel.isExpanded ? "subtle" : "ghost"}
          >
            {appShellConfig.leftPanel.isExpanded ? <IconFolderOpen /> : <IconFolder />} Left Expand
          </Button>
          <Button onClick={pinLeftPanel} size="xs" variant={appShellConfig.leftPanel.isPinned ? "subtle" : "ghost"}>
            {appShellConfig.leftPanel.isPinned ? <IconFolderOpen /> : <IconFolder />} Left Pin
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
          <Button
            onClick={expandBottomPanel}
            size="xs"
            variant={appShellConfig.bottomPanel.isExpanded ? "subtle" : "ghost"}
          >
            {appShellConfig.bottomPanel.isExpanded ? <IconFolderOpen /> : <IconFolder />} Bottom Panel
          </Button>
          <Button onClick={pinBottomPanel} size="xs" variant={appShellConfig.bottomPanel.isPinned ? "subtle" : "ghost"}>
            {appShellConfig.bottomPanel.isPinned ? <IconFolderOpen /> : <IconFolder />} Bottom Pin
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
          <Button
            onClick={expandRightPanel}
            size="xs"
            variant={appShellConfig.rightPanel.isExpanded ? "subtle" : "ghost"}
          >
            {appShellConfig.rightPanel.isExpanded ? <IconFolderOpen /> : <IconFolder />} Right Expand
          </Button>
          <Button onClick={pinRightPanel} size="xs" variant={appShellConfig.rightPanel.isPinned ? "subtle" : "ghost"}>
            {appShellConfig.rightPanel.isPinned ? <IconFolderOpen /> : <IconFolder />} Right Pin
          </Button>
        </Flex>
      </Flex>

      {/* main */}

      <Flexbox
        direction="horizontal"
        width="100%"
        height="100%"
        style={{ maxWidth: "100vw", overflow: "hidden", position: "relative" }}
      >
        {/* Left Sidebar */}
        <Flex
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
            direction="column"
            css={{
              justifyContent: "center",
              gap: 2,
            }}
          >
            <IconButton
              onClick={expandLeftPanel}
              size="xs"
              variant={appShellConfig.leftPanel.isExpanded ? "subtle" : "ghost"}
            >
              {appShellConfig.leftPanel.isExpanded ? <IconFolderOpen /> : <IconFolder />}
            </IconButton>
            <IconButton size="xs" variant="ghost" disabled>
              <IconFolder />
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

          {/* Left Sidebar - end */}
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

        {/* left draggable panel */}
        <DraggablePanel
          expand={appShellConfig.leftPanel.isExpanded}
          mode={appShellConfig.leftPanel.isPinned ? "fixed" : "float"}
          css={
            !appShellConfig.leftPanel.isPinned && {
              left: "50px",
            }
          }
          showHandleHighlight={true}
          pin={appShellConfig.leftPanel.isPinned}
          placement="left"
          onExpandChange={expandLeftPanel}
        >
          <DraggablePanel.Container style={{ flex: 1 }}>
            <DraggablePanel.Header
              pin={appShellConfig.leftPanel.isPinned}
              position="left"
              setExpand={expandLeftPanel}
              setPin={pinLeftPanel}
              title="Header Left"
            />
            <DraggablePanel.Body>
              DraggablePanel Left DraggablePanel Left DraggablePanel Left DraggablePanel Left DraggablePanel Left{" "}
            </DraggablePanel.Body>
            <DraggablePanel.Footer>Footer Left</DraggablePanel.Footer>
          </DraggablePanel.Container>
        </DraggablePanel>

        {/* content */}
        <Flexbox
          flex={1}
          direction={"vertical"}
          width={"100%"}
          height={"100%"}
          style={{ overflow: "hidden", position: "relative" }}
        >
          <Flexbox
            flex={1}
            direction={"vertical"}
            style={{
              overflow: "hidden auto",
              position: "relative",
              backgroundColor: "white",
              padding: 1,
            }}
          >
            content
          </Flexbox>
          <DraggablePanel
            showHandleHighlight={true}
            expand={appShellConfig.bottomPanel.isExpanded}
            mode={appShellConfig.bottomPanel.isPinned ? "fixed" : "float"}
            pin={appShellConfig.bottomPanel.isPinned}
            placement="bottom"
            onExpandChange={expandBottomPanel}
          >
            <DraggablePanel.Container style={{ flex: 1 }}>
              <DraggablePanel.Header
                pin={appShellConfig.bottomPanel.isPinned}
                position="right"
                setExpand={expandBottomPanel}
                setPin={pinBottomPanel}
                title="Header Bottom"
              />
              <DraggablePanel.Body>
                DraggablePanel Bottom DraggablePanel Bottom DraggablePanel Bottom DraggablePanel Bottom DraggablePanel
                Bottom DraggablePanel Bottom DraggablePanel Bottom DraggablePanel Bottom DraggablePanel Bottom{" "}
                DraggablePanel Bottom DraggablePanel Bottom DraggablePanel Bottom DraggablePanel Bottom DraggablePanel
                Bottom DraggablePanel Bottom DraggablePanel Bottom DraggablePanel Bottom{" "}
              </DraggablePanel.Body>
              <DraggablePanel.Footer>Footer Bottom</DraggablePanel.Footer>
            </DraggablePanel.Container>
          </DraggablePanel>
        </Flexbox>

        {/* right draggable panel */}
        <DraggablePanel
          showHandleHighlight={true}
          expand={appShellConfig.rightPanel.isExpanded}
          mode={appShellConfig.rightPanel.isPinned ? "fixed" : "float"}
          pin={appShellConfig.rightPanel.isPinned}
          css={
            !appShellConfig.rightPanel.isPinned && {
              right: "50px",
            }
          }
          placement="right"
          onExpandChange={expandRightPanel}
        >
          <DraggablePanel.Container style={{ flex: 1 }}>
            <DraggablePanel.Header
              pin={appShellConfig.rightPanel.isPinned}
              position="right"
              setExpand={expandRightPanel}
              setPin={pinRightPanel}
              title="Header Right"
            />
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
            <IconButton
              onClick={expandRightPanel}
              size="xs"
              variant={appShellConfig.rightPanel.isExpanded ? "subtle" : "ghost"}
            >
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
      </Flexbox>

      {/* Status Bar */}
      <Flex
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
    </Flexbox>
  )
}

export default AppShell
