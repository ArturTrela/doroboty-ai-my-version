"use client";

import Image from "next/image";
import { useState } from "react";

export function CompanyLogoImage({
  src,
  dimension,
  initials,
}: {
  src: string;
  dimension: number;
  initials: string;
}) {
  const [failedSrc, setFailedSrc] = useState<string>();
  if (failedSrc === src) return initials;

  return (
    <Image
      src={src}
      alt=""
      width={dimension}
      height={dimension}
      sizes={`${dimension}px`}
      className="size-full object-contain p-[var(--gui-space-xxs)]"
      // Existing remote logos load directly; do not open an unrestricted optimizer proxy.
      unoptimized={!src.startsWith("/")}
      onError={() => setFailedSrc(src)}
    />
  );
}
