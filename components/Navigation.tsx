"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

const components: { title: string; href: string; description: string }[] = [
  { title: "Dashboard", href: "/dashboard", description: "Your dashboard" },
  { title: "Chat", href: "/dashboard/1", description: "Chat with friends" },
  { title: "Settings", href: "/settings", description: "Change your settings" },
  { title: "Profile", href: "/profile", description: "Your profile" },
  { title: "Logout", href: "/logout", description: "Log out of your account" },
];

export default function Navigation() {
  return (
    <NavigationMenu className="fixed top-4 left-0 ml-[12rem]">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Item One</NavigationMenuTrigger>
          <NavigationMenuContent>
            <NavigationMenuLink href="/dashboard">Dashboard</NavigationMenuLink>
            <NavigationMenuLink href="/dashboard/1">Chat</NavigationMenuLink>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
