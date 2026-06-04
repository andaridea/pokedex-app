import { useCallback, useEffect, useRef, useState } from "react";

export function useInfiniteScroll(items, pageSize) {
  const [page, setPage] = useState(1);
  const pageRef = useRef(null);

  const visible = items.slice(0, page * pageSize);
  const hasMore = visible.length < items.length;

  const reset = useCallback(() => setPage(1), []);

  useEffect(() => {
    reset();
  }, [items, reset]);

  useEffect(() => {
    const el = pageRef.current;
    if (!el || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((p) => p + 1);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [hasMore, visible.length]);

  return { visible, hasMore, pageRef, reset };
}
