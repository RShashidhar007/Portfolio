import { useEffect, useState } from "react";

// Returns null while checking, then true/false. Requires a real PDF
// content-type because SPA fallbacks return 200 + text/html for missing files.
export function useResumeAvailable(path) {
  const [available, setAvailable] = useState(null);

  useEffect(() => {
    let cancelled = false;
    fetch(path, { method: "HEAD" })
      .then((res) => {
        const type = res.headers.get("content-type") || "";
        const ok = res.ok && (type.includes("pdf") || type === "application/octet-stream");
        if (!cancelled) setAvailable(ok);
      })
      .catch(() => {
        if (!cancelled) setAvailable(false);
      });
    return () => {
      cancelled = true;
    };
  }, [path]);

  return available;
}

export default useResumeAvailable;
