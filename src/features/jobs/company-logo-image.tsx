"use client";

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
    <img
      src={`${import.meta.env.BASE_URL}${src.replace(/^\//, "")}`}
      alt=""
      width={dimension}
      height={dimension}
      sizes={`${dimension}px`}
      className="size-full object-contain p-[var(--gui-space-xxs)]"
      onError={() => setFailedSrc(src)}
    />
  );
}
