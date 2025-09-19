"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDown, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

interface DocsSidebarItem {
  title: string
  href?: string
  items?: DocsSidebarItem[]
}

const docsNavigation: DocsSidebarItem[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Installation", href: "/docs/installation" },
      { title: "Quick Start", href: "/docs/quick-start" },
      { title: "Configuration", href: "/docs/configuration" },
    ],
  },
  {
    title: "Trackers",
    items: [
      { title: "The Pirate Bay", href: "/docs/trackers/the-pirate-bay" },
      { title: "YTS", href: "/docs/trackers/yts" },
      { title: "1337x", href: "/docs/trackers/1337x" },
      { title: "RARBG", href: "/docs/trackers/rarbg" },
      { title: "EZTV", href: "/docs/trackers/eztv" },
      { title: "Torlock", href: "/docs/trackers/torlock" },
      { title: "Torren.to", href: "/docs/trackers/torren.to" },
      { title: "1337x", href: "/docs/trackers/1337x" },
      { title: "RARBG", href: "/docs/trackers/rarbg" },
      { title: "EZTV", href: "/docs/trackers/eztv" },
      { title: "Torlock", href: "/docs/trackers/torlock" },
      { title: "Torren.to", href: "/docs/trackers/torren.to" },
    ],
  },
  {
    title: "Guides",
    items: [
      { title: "Deployment", href: "/docs/guides/deployment" },
      { title: "Best Practices", href: "/docs/guides/best-practices" },
      { title: "Troubleshooting", href: "/docs/guides/troubleshooting" },
    ],
  },
]

interface NavItemProps {
  item: DocsSidebarItem
  level?: number
}

function NavItemComponent({ item, level = 0 }: NavItemProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(true)
  const hasChildren = item.items && item.items.length > 0
  const isActive = item.href === pathname
  const hasActiveChild = item.items?.some((child: DocsSidebarItem) => child.href === pathname)

  if (hasChildren) {
    return (
      <div className="space-y-1">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-2 px-2 py-1.5 h-auto font-bold text-sm",
            level > 0 && "ml-4",
            (isActive || hasActiveChild) && "bg-sidebar-accent text-sidebar-accent-foreground",
          )}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="flex-1 text-left">{item.title}</span>
          {isOpen ? <ChevronDown className="h-4 w-4 shrink-0" /> : <ChevronRight className="h-4 w-4 shrink-0" />}
        </Button>
        {isOpen && (
          <div className="space-y-1">
            {item.items?.map((child, index) => (
              <NavItemComponent key={index} item={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    )
  }

  return (
    <Button
      variant="ghost"
      className={cn(
        "w-full justify-start gap-2 px-2 py-1.5 h-auto font-normal text-sm",
        level > 0 && "ml-4",
        isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-medium",
      )}
      asChild
    >
      <Link href={item.href || "#"}>
        {item.title}
      </Link>
    </Button>
  )
}

export function DocsSidebar() {
  return (
    <div className="w-64 border-r border-sidebar-border bg-sidebar">
      <div className="p-4 border-b border-sidebar-border">
        <h2 className="font-semibold text-sidebar-foreground">Documentation</h2>
      </div>
      <ScrollArea className="h-[calc(100vh-5rem)]">
        <div className="p-4 space-y-2">
          {docsNavigation.map((item, index) => (
            <NavItemComponent key={index} item={item} />
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}