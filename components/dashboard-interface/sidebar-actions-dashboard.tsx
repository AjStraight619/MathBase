import Link from "next/link";

const routes = [
  {
    name: "Chats",
    path: "/chat",
  },
];

export default function SidebarActions() {
  return (
    <div className="flex flex-col w-full space-y-2">
      {routes.map((route) => (
        <Link href={route.path} key={route.name} />
      ))}
    </div>
  );
}
