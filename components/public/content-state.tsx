"use client";

interface ContentStateProps {
  kind: "loading" | "empty" | "error";
  message: string;
}

export function ContentState({ kind, message }: ContentStateProps) {
  const styles =
    kind === "error"
      ? "bg-red-50 text-red-700"
      : kind === "loading"
        ? "bg-slate-50 text-slate-600"
        : "bg-slate-50 text-slate-500";

  return <p className={`rounded-md px-3 py-2 text-sm ${styles}`}>{message}</p>;
}
