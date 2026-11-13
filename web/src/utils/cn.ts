type ClassValue = string | boolean | undefined

export const cn = (...args: ClassValue[]) => args.filter(Boolean).join(" ")
