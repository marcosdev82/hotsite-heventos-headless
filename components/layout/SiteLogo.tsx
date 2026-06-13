import Image from "next/image";
import Link from "next/link";

type SiteLogoProps = {
  title: string;
  className?: string;
  imageClassName?: string;
  titleClassName?: string;
};

export function SiteLogo({
  title,
  className,
  imageClassName,
  titleClassName,
}: SiteLogoProps) {
  return (
    <Link
      href="/"
      aria-label={`Ir para a página inicial de ${title}`}
      className={className || "inline-flex items-center gap-3"}
    >
      <Image
        src="/logo-demo.webp"
        alt={title}
        width={180}
        height={56}
        priority
        className={imageClassName || "h-10 w-auto"}
      />
      <span className={titleClassName || "text-sm font-semibold tracking-tight"}>
        {title}
      </span>
    </Link>
  );
}
