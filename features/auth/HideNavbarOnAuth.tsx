"use client";
import { usePathname } from "next/navigation";

export default function HideNavbarOnAuth({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage =
    pathname?.startsWith("/login") || pathname?.startsWith("/register");

  if (isAuthPage) return null;
  return <>{children}</>;
}
