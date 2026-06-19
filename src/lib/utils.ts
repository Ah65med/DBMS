import { type ClassValue, clsx } from "clsx";
import type { ReadonlyURLSearchParams } from "next/navigation";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function createQueryString(
	searchParams: ReadonlyURLSearchParams,
	name: string,
	value: string,
) {
	const params = new URLSearchParams(searchParams.toString());
	params.set(name, value);

	return params.toString();
}
