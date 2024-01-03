import Image from "next/image";

type IconProps = {
  className?: string;
  height?: number;
  width?: number;
};

export default function Icon({ className, height, width }: IconProps) {
  return (
    <Image
      src="/logo.png"
      alt="Math Base"
      width={width}
      height={height}
      quality="95"
      priority={true}
      className={className}
    />
  );
}
