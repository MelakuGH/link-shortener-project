"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { usePathname, useRouter } from "next/navigation";

export function RedirectToDashboard() {
  const { isLoaded, isSignedIn } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && isSignedIn && pathname === "/") {
      router.replace("/dashboard");
    }
  }, [isLoaded, isSignedIn, pathname, router]);

  return null;
}
