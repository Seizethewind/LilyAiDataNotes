import type { ComponentPropsWithoutRef } from "react";
import "./Button.css";

type ButtonProps = ComponentPropsWithoutRef<"button"> & {
  variant?: "primary" | "ghost";
};

export function Button({ variant = "primary", type = "button", className, ...rest }: ButtonProps) {
  const classes = ["ui-button", `ui-button--${variant}`, className].filter(Boolean).join(" ");
  return <button type={type} className={classes} {...rest} />;
}
