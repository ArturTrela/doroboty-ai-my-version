import type { ReactNode } from "react";
import { Link, type LinkProps } from "react-router";
import { ArrowLeft } from "lucide-react";

export function BackLink({ to, children }: { to: LinkProps["to"]; children: ReactNode }) {
  return (
    <Link to={to} className="back-link">
      <ArrowLeft size={17} aria-hidden="true" />
      {children}
    </Link>
  );
}
