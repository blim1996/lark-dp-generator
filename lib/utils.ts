import { format } from "date-fns";

export function formatDate(date: Date): string {
  return format(date, "MMM d, yyyy");
}

export function formatDateRange(from: Date, to: Date): string {
  return `${formatDate(from)} - ${formatDate(to)}`;
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
