import Image from "next/image";

export function Logo({
  className = "",
  href = "/#top",
}: {
  className?: string;
  href?: string;
}) {
  return (
    <a
      href={href}
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="Vayumi home"
    >
      <Image
        src="/brand/vayumi-mark.png"
        alt="Vayumi"
        width={26}
        height={26}
        priority
        className="h-[26px] w-[26px] object-contain transition-transform duration-300 group-hover:rotate-45"
      />
      <span className="font-display text-2xl leading-none tracking-tight text-ink">
        Vayumi
      </span>
    </a>
  );
}
