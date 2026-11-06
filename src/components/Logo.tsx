import Image from "next/image";
import { profile } from "@/data/profile";

// The mark below is cropped directly from the reference design (it's tied to
// the "RP" initials as drawn there). If you change your name, replace
// /public/images/logo-mark.png with new artwork for your own initials.
export default function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative h-12 w-12 shrink-0">
        <Image src="/images/logo-mark.png" alt="" fill className="object-contain" />
      </div>

      <span className="h-9 w-px bg-border" aria-hidden="true" />

      <div className="flex flex-col leading-none">
        <span className="font-sans text-sm font-semibold uppercase tracking-[0.2em] text-foreground">
          {profile.name}
        </span>
        <span className="mt-1 font-sans text-[10px] font-medium uppercase tracking-[0.3em] text-muted">
          {profile.brandLabel}
        </span>
      </div>
    </div>
  );
}
