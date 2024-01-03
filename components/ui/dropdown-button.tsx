type DropdownButtonProps = {
  children: React.ReactNode;
};

export default function DropdownButton({ children }: DropdownButtonProps) {
  return <button>{children}</button>;
}
