"use client";

import { useSyncExternalStore } from "react";
import { AppSidebar } from "./sidebar";
import { useAppContext } from "../hooks/useAppContext";
import { useDocumentContext } from "../hooks/useDocumentContext"
import { chakra, Flex } from "@chakra-ui/react";


const emptySubscribe = () => () => {};

export function LayoutShell({ children }: { children: React.ReactNode }) {

  return (
    <chakra.div
      css={{
        position: "fixed",
        inset: 0,
        display: "flex",
        overflow: "hidden",
      }}
    >
      <AppSidebar />
      <Flex
        id="main-layout"
        css={{
          flexDirection: "row",
          flex: 1,
          overflow: "hidden",
        }}
      >
        <Flex
          id="main-content"
          css={{
            width: "100px",
          }}
        >
          <chakra.div
            css={{
              display: "flex",
              h: "full",
              flexDirection: "column",
              overflow: "hidden",
            }}
          >
            <chakra.main
              css={{
                display: "flex",
                minH: 0,
                flex: 1,
                flexDirection: "column",
                overflow: "hidden",
                bg: "bg.panel"
              }}

            >
              {children}
            </chakra.main>
          </chakra.div>
        </Flex>
      </Flex>
    </chakra.div>
  )
}
