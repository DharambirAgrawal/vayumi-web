import Image from "next/image";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <a
      href="#top"
      className={`group inline-flex items-center gap-2.5 ${className}`}
      aria-label="Vayumi home"
    >
      <span className="relative inline-flex h-7 w-7 items-center justify-center transition-transform duration-300 group-hover:scale-110">
        <span
          aria-hidden
          className="absolute inset-0 rounded-full opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-70"
          style={{ background: "var(--brand-gold)" }}
        />
        <Image
          src="/brand/vayumi-mark.png"
          alt="Vayumi"
          width={28}
          height={28}
          priority
          className="relative h-7 w-7 object-contain"
        />
      </span>
      <span className="font-serif text-xl tracking-tight text-text-primary">
        Vayumi
      </span>
    </a>
  );
}
