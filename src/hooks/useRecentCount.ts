import { countRecentItems } from "@/utils/countReactionItems";
import { useMemo } from "react";

export function useReactionItems<T extends { createdAt: string | Date | null }>(
    items: T[] | null | undefined,
    days = 7
) {
    return useMemo(() => countRecentItems(items, days), [items, days])
};
