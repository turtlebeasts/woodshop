import { cn } from "../lib/cn";

export default function Button({
  as: Tag = "button",
  variant = "primary",
  className,
  children,
  ...props
}) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition active:scale-[.99] focus:outline-none focus-visible:ring";
  const styles = {
    primary:
      "bg-amber-700 text-white hover:bg-amber-800 focus-visible:ring-amber-300",
    ghost:
      "bg-transparent text-amber-800 hover:bg-amber-50 focus-visible:ring-amber-200",
    outline:
      "border border-amber-800/20 text-amber-900 hover:bg-amber-50 focus-visible:ring-amber-300",
  };
  return (
    <Tag className={cn(base, styles[variant], className)} {...props}>
      {children}
    </Tag>
  );
}
