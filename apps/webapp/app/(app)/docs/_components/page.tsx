import type React from "react"
import { DocsSidebar } from "./sidebar"
import { DocsBreadcrumb } from "./breadcrumb"
// import { DocsHeader } from "./header"

interface BreadcrumbItem {
  title: string
  href?: string
}

interface DocsLayoutProps {
  children: React.ReactNode
  title: string
  description?: string
  breadcrumbs: BreadcrumbItem[]
}

export function DocsLayout({ children,  breadcrumbs }: DocsLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        <DocsSidebar />
        <main className="flex-1">
          <div className="max-w-4xl mx-auto px-6 py-8">
            <DocsBreadcrumb items={breadcrumbs} className="mb-6" />
            {/* <DocsHeader title={title} description={description} /> */}
            <div className="prose prose-neutral dark:prose-invert max-w-none">{children}</div>
          </div>
        </main>
      </div>
    </div>
  )
}
