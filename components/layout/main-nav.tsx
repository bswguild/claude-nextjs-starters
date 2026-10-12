"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import type { NavItem } from "@/types/nav"

// 데스크톱 헤더 내비게이션 (현재 경로 활성 표시)
export function MainNav({ items }: { items: NavItem[] }) {
  const pathname = usePathname()

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        {items.map((item) => (
          <NavigationMenuItem key={item.href}>
            <NavigationMenuLink
              render={<Link href={item.href} />}
              active={pathname === item.href}
            >
              {item.title}
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}
