"use client";

import { useSelector } from "@xstate/react";
import { useAppContext } from "./useAppContext";

export const useDocumentContext = () => {
  const {
    data: { documentRef },
  } = useAppContext();
  const document = useSelector(documentRef, (s: any) => s.context.document);
  const isOpen = useSelector(documentRef, (s: any) => s.matches("open"))


  return {
    state: { isOpen,  },
    data: { document,  },
    actions: {

    },
  };
};

