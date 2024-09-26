"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@clerk/nextjs";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

const LandingNavbar = () => {
  const isSignedIn = useAuth();
  const [buttonVariant, setButtonVariant] = useState("secondary");
  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href="/dashboard" className="flex items-center ">
        <div className="relative w-8 h-8 mr-4">
          <Image alt="Logo" fill src="/logo2.png" className="w-10 h-10" />
        </div>
        <h1 className={cn("text-2xl font-bold text-white", font.className)}>
          Alix
        </h1>
      </Link>
      <div className=" flex item-center gap-x-2">
        ,
        <Link href={isSignedIn ? "/dashboard" : "sign-up"}>
          <Button
            variant={buttonVariant}
            className="rounded-full"
            onMouseEnter={() => {
              setButtonVariant("default");
            }}
            onMouseLeave={() => {
              setButtonVariant("secondary");
            }}
          >
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default LandingNavbar;
