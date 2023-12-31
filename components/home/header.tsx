import Image from "next/image";

export default function Header() {
  return (
    <div className="flex items-center justify-center space-x-4 z-10">
      <Image
        src="/logo.png"
        alt="Math Base Logo"
        width={100}
        height={100}
        layout="fixed"
        priority={true}
        quality={100}
        className="rounded-full"
      />
      <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
        Math Base
      </h1>
    </div>
  );
}
