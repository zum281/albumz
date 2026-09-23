import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import type { FC } from "react";

const radioGroupVariants = cva("", {
  variants: {
    variant: {
      default: "grid w-full gap-2",
      segmented: "flex gap-0.75 border border-border bg-card p-0.75",
    },
  },
  defaultVariants: { variant: "default" },
});

const radioGroupItemVariants = cva(
  "disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "group/radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-full border border-input outline-none group-has-focus-visible/field-label:ring-0 group-has-focus-visible/field-label:not-data-checked:border-input after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground group-has-focus-visible/field-label:data-checked:border-primary dark:data-checked:bg-primary",
        segmented:
          "inline-flex cursor-pointer items-center px-3 py-1 text-sm whitespace-nowrap text-muted-foreground transition-colors select-none hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-checked:bg-accent data-checked:text-foreground",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

export const RadioGroup: FC<
  RadioGroupPrimitive.Props & VariantProps<typeof radioGroupVariants>
> = ({ className, variant = "default", ...props }) => {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      data-variant={variant}
      className={cn(radioGroupVariants({ variant, className }))}
      {...props}
    />
  );
};

export const RadioGroupItem: FC<
  RadioPrimitive.Root.Props & VariantProps<typeof radioGroupItemVariants>
> = ({ className, variant = "default", children, ...props }) => {
  return (
    <RadioPrimitive.Root
      data-slot="radio-group-item"
      data-variant={variant}
      className={cn(radioGroupItemVariants({ variant, className }))}
      {...props}
    >
      {variant === "segmented" ? (
        children
      ) : (
        <RadioPrimitive.Indicator
          data-slot="radio-group-indicator"
          className="flex size-4 items-center justify-center"
        >
          <span className="absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary-foreground" />
        </RadioPrimitive.Indicator>
      )}
    </RadioPrimitive.Root>
  );
};
