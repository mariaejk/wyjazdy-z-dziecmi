export function log(label: string, data: Record<string, unknown>) {
  if (process.env.NODE_ENV !== "production") {
    console.log(`[${label}]`, data);
  }
}
