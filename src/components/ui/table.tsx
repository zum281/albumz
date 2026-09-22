import { cn } from "cn";
import type { ComponentProps, FC } from "react";

export const Table: FC<ComponentProps<"table">> = ({ className, ...props }) => {
  return (
    <div
      data-slot="table-container"
      className="relative w-full overflow-x-auto"
    >
      <table
        data-slot="table"
        className={cn(
          "w-full caption-bottom text-sm border-separate border-spacing-0 text-sm text-foreground",
          className,
        )}
        {...props}
      />
    </div>
  );
};

export const TableHeader: FC<ComponentProps<"thead">> = ({
  className,
  ...props
}) => {
  return (
    <thead
      data-slot="table-header"
      className={cn("[&_tr]:border-b", className)}
      {...props}
    />
  );
};

export const TableBody: FC<ComponentProps<"tbody">> = ({
  className,
  ...props
}) => {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  );
};

export const TableFooter: FC<ComponentProps<"tfoot">> = ({
  className,
  ...props
}) => {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "w-full border-t bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className,
      )}
      {...props}
    />
  );
};

export const TableRow: FC<ComponentProps<"tr">> = ({ className, ...props }) => {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted",
        className,
      )}
      {...props}
    />
  );
};

export const TableHead: FC<ComponentProps<"th">> = ({
  className,
  ...props
}) => {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "border-b-3 border-primary bg-card px-2 py-3 text-left align-middle font-mono text-sm tracking-widest whitespace-nowrap text-muted-foreground uppercase first:pl-4 last:pr-4 dark:border-border amoled:border-border [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  );
};

export const TableCell: FC<ComponentProps<"td">> = ({
  className,
  ...props
}) => {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "px-2 py-2 first:pl-4 last:pr-4 border-b border-border align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  );
};
