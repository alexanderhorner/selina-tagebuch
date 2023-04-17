"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"

export default function RouteAwareLink({ href, className, children }) {
  const currentRoute = usePathname()

  {/* Render Link */}
  return <Link href={href}
    className={`
      ${currentRoute === href ? "opacity-70" : "opacity-100"}
      ${className}
      `}
    >
      { children }
  </Link>
}

