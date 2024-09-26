"use client";

import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("14ec5240-e727-419a-a5b5-d93e075fd71f");
  }, []);

  return null;
};
