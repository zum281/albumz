import { Boundaries } from "@/components/Boundaries";
import type { FC, PropsWithChildren } from "react";

export const SettingsCard: FC<SettingsCardProps> = ({
  children,
  title,
  description,
}) => {
  return (
    <section className="flex items-center justify-between gap-6 border border-border bg-card px-6 py-7">
      <div className="flex min-w-0 flex-col gap-1">
        <h2 className="text-lg font-medium text-foreground">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="shrink-0">
        <Boundaries getResetKey={() => title}>{children}</Boundaries>
      </div>
    </section>
  );
};

type SettingsCardProps = PropsWithChildren<{
  title: string;
  description: string;
}>;
