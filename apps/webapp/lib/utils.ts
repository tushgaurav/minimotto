import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const truncate = (input: string, length: number = 100) =>
  input?.length > length ? `${input.substring(0, length)}...` : input;

export function formatBytes(bytes: string, decimals = 2) {
  if (!+bytes) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = [
    "Bytes",
    "KiB",
    "MiB",
    "GiB",
    "TiB",
    "PiB",
    "EiB",
    "ZiB",
    "YiB",
  ];

  const i = Math.floor(Math.log(Number(bytes)) / Math.log(k));

  return `${parseFloat((Number(bytes) / Math.pow(k, i)).toFixed(dm))} ${
    sizes[i]
  }`;
}
