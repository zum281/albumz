import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { type VariantProps } from "class-variance-authority";
import { cn } from "cn";
import type { FC } from "react";
import { buttonVariants } from "./button.variants";

export const Button: FC<
  ButtonPrimitive.Props & VariantProps<typeof buttonVariants>
> = ({ className, variant = "default", size = "default", ...props }) => {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
};
