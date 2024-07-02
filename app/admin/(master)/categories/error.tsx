"use client";

export default function AdminCategoriesError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mt-4 flex flex-col items-start gap-4">
      <div>{error.message}</div>
      <button className="bg-gray-400 p-2" onClick={() => reset()}>
        Coba lagi
      </button>
    </div>
  );
}
