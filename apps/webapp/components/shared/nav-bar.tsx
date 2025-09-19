"use client";

import * as motion from "motion/react-client";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ModeToggle } from "./mode-toggle";
import { useSession, signOut } from "@/lib/auth-client";
import { Button } from "../ui/button";
import UserMenu from "./user-menu";
import { siteContent } from "@/content/content";

export default function NavBar() {
  const { data: session, isPending } = useSession();

  console.log(session);

  return (
    <div className="border-b-2 dark:border-accent border-secondary">
      <div className="flex px-6 py-4 items-center gap-4 max-w-screen-2xl mx-auto justify-between">
        <div className="flex gap-4">
          <Link href="/" className="p-1">
            <motion.svg
              height="30"
              width="30"
              viewBox="0 0 40 40"
              className="rotate-[12deg]"
              animate={{ rotate: 180 }}
              transition={{ duration: 1, ease: "linear" }}
              whileHover={{
                rotate: -180,
                transition: { duration: 0.5, ease: "linear" },
              }}
            >
              <rect
                stroke="currentColor"
                fill="none"
                strokeWidth="22"
                x="0"
                y="0"
                width="40"
                height="40"
              />
              <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fill="currentColor" fontSize="12" className="text-black dark:text-white">M</text>
            </motion.svg>
          </Link>

          <NavigationMenu>
            <NavigationMenuList>
              {siteContent.header.menus.map((menu: any, index: number) => (
                <NavigationMenuItem key={`${menu.trigger}-${index}`}>
                  <NavigationMenuTrigger>{menu.trigger}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    {menu.featured ? (
                      <ul className="grid gap-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                        <li className="row-span-3">
                          <NavigationMenuLink asChild>
                            <Link
                              className="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-6 no-underline outline-hidden select-none focus:shadow-md"
                              href={menu.featured.href}
                            >
                              <div className="mt-4 mb-2 text-lg font-medium">
                                {menu.featured.title}
                              </div>
                              <p className="text-muted-foreground text-sm leading-tight">
                                {menu.featured.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                        {menu.links?.map((link: any) => (
                          <ListItem
                            key={link.href}
                            href={link.href}
                            title={link.title || link.label}
                          >
                            {link.description}
                          </ListItem>
                        ))}
                      </ul>
                    ) : (
                      <>
                        {menu.links?.map((link: any) => (
                          <NavigationMenuLink asChild key={link.href}>
                            <Link href={link.href}>{link.label || link.title}</Link>
                          </NavigationMenuLink>
                        ))}
                      </>
                    )}
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-4">
          <ModeToggle />
          {isPending ? (
            <div className="w-8 h-8 bg-zinc-200 dark:bg-zinc-600 rounded-full animate-pulse" />
          ) : (
            session ? (
              <UserMenu user={session.user} onSignOut={() => signOut()} />
            ) : (
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
            )
          )}
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
