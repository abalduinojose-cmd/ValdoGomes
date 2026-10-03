import type { ReactNode } from "react";

import { cx } from "@/lib/cx";

type ContainerProps = {
  readonly children: ReactNode;
  readonly className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return <div className={cx("container-page", className)}>{children}</div>;
}
