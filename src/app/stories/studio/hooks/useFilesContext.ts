"use client";

import { useCallback } from "react";
import { useSelector } from "@xstate/react";
import { AppMachineContext } from "../providers/app-machine.provider";
import { useAppContext } from "./useAppContext";

export const useFilesContext = () => {
  const appRef = AppMachineContext.useActorRef();
  const {
    data: { filesRef },
  } = useAppContext();
  const documents = useSelector(filesRef, (s: any) => s.context.documents);
  const error = useSelector(filesRef, (s: any) => s.context.error);
  const isLoading = useSelector(filesRef, (s: any) => s.matches("loading"));
  const isBusy = useSelector(filesRef, (s: any) => !s.matches("ready"));
  const openId = AppMachineContext.useSelector((s: any) => s.context.openId);

  const open = useCallback(
    (id: string) => appRef.send({ type: "user.openDocument", id }),
    [appRef],
  );
  const close = useCallback(() => appRef.send({ type: "user.closeDocument" }), [appRef]);

  return {
    state: { isLoading, isBusy, error },
    data: { documents, openId },
    actions: {
      open: { document: open, list: close },
    },
  };
};

