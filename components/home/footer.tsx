import Link from "next/link";

type FooterProps = {
  footerData: Array<{ href: string; title: string }>;
};

export default function Footer({ footerData }: FooterProps) {
  return (
    <footer className="mt-auto w-full p-6">
      <div className="flex flex-row justify-center space-x-4">
        {footerData.map((footer) => (
          <Link
            key={footer.title}
            href={footer.href}
            className="text-muted-foreground hover:underline hover:text-primary"
          >
            {footer.title}
          </Link>
        ))}
      </div>
    </footer>
  );
}
