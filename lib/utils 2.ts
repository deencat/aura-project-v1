import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * A utility function that combines multiple class names into one.
 * It uses clsx for conditional classes and tailwind-merge to handle 
 * Tailwind CSS class conflicts efficiently.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
} 