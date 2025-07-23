"use client";

import * as motion from "motion/react-client";
import Link from "next/link";
import Image from "next/image";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./mode-toggle";

export default function NavBar() {
  return (
    <div className="border-b">
      <div className="flex px-6 py-4 items-center gap-4 max-w-screen-2xl mx-auto justify-between">
        <div className="flex gap-4">
          <motion.div
            animate={{ rotate: 180 }}
            transition={{ duration: 1, ease: "linear" }}
            whileHover={{
              rotate: -180,
              transition: { duration: 0.5, ease: "linear" },
            }}
          >
            <Link href="/" className="cursor-none">
              <Image src="/logo.svg" alt="minimotto" width={32} height={32} />
            </Link>
          </motion.div>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Docs</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <NavigationMenuLink asChild>
                    <Link href="/docs">Docs</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="/docs">How To</Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="/docs">Best Practices</Link>
                  </NavigationMenuLink>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                    <li className="row-span-3">
                      <NavigationMenuLink asChild>
                        <Link
                          className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                          href="/"
                        >
                          <div className="mt-4 mb-2 text-lg font-medium">
                            Docs
                          </div>
                          <p className="text-muted-foreground text-sm leading-tight">
                            How this site works and how to use it.
                          </p>
                        </Link>
                      </NavigationMenuLink>
                    </li>
                    <ListItem href="/docs" title="Best Practices">
                      Best practices for using this site.
                    </ListItem>
                    <ListItem href="/docs/installation" title="How To">
                      How to install dependencies and structure your app.
                    </ListItem>
                    <ListItem
                      href="/docs/primitives/typography"
                      title="Typography"
                    >
                      Styles for headings, paragraphs, lists...etc
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link href={href}>
          <div className="text-sm leading-none font-medium">{title}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
