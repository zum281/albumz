import { Button } from "@/components/ui/button/button";
import { cn } from "cn";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import type { ComponentProps, FC } from "react";

export const Pagination: FC<ComponentProps<"nav">> = ({
  className,
  ...props
}) => {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn(
        "mx-auto flex w-full items-center justify-between flex-wrap gap-x-5 gap-y-3 border-t border-border bg-card px-4.5 py-3",
        className,
      )}
      {...props}
    />
  );
};

export const PaginationContent: FC<ComponentProps<"ul">> = ({
  className,
  ...props
}) => {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  );
};

export const PaginationItem: FC<ComponentProps<"li">> = ({ ...props }) => {
  return <li data-slot="pagination-item" {...props} />;
};

type PaginationLinkProps = { isActive?: boolean } & ComponentProps<
  typeof Button
>;

export const PaginationLink: FC<PaginationLinkProps> = ({
  className,
  isActive,
  ...props
}) => {
  return (
    <Button
      variant={isActive ? "default" : "ghost"}
      className={cn(
        "h-7.5 min-w-7.5 px-2 font-mono text-xs font-normal",
        isActive
          ? "border-primary hover:border-primary-hover"
          : "border-muted-foreground/70 text-muted-foreground hover:bg-transparent enabled:hover:border-primary enabled:hover:text-foreground",
        className,
      )}
      aria-current={isActive ? "page" : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      {...props}
    />
  );
};

export const PaginationPrevious: FC<ComponentProps<typeof PaginationLink>> = ({
  ...props
}) => {
  return (
    <PaginationLink aria-label="Previous page" title="Previous page" {...props}>
      <ChevronLeftIcon className="size-3.5 cn-rtl-flip" />
    </PaginationLink>
  );
};

export const PaginationNext: FC<ComponentProps<typeof PaginationLink>> = ({
  ...props
}) => {
  return (
    <PaginationLink aria-label="Next page" title="Next page" {...props}>
      <ChevronRightIcon className="size-3.5 cn-rtl-flip" />
    </PaginationLink>
  );
};

export const PaginationEllipsis: FC<ComponentProps<"span">> = ({
  className,
  ...props
}) => {
  return (
    <span
      aria-hidden
      title="Skipped pages"
      data-slot="pagination-ellipsis"
      className={cn(
        "flex h-7.5 min-w-4.5 items-center justify-center font-mono text-xs text-muted-foreground",
        className,
      )}
      {...props}
    >
      …
    </span>
  );
};

export const PaginationSummary: FC<ComponentProps<"span">> = ({
  className,
  ...props
}) => {
  return (
    <span
      data-slot="pagination-summary"
      className={cn(
        "font-mono text-xs whitespace-nowrap text-muted-foreground",
        className,
      )}
      {...props}
    />
  );
};
