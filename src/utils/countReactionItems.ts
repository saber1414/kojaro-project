type WithCreatedAt = {
    createdAt?: string | Date | null;
};


export function countRecentItems<T extends WithCreatedAt>(
    items: T[] | undefined | null,
    days = 7
): number {
    if (!Array.isArray(items)) return 0;
    const threshold = Date.now() - days * 24 * 60 * 60 * 1000;

    return items.filter((item) => {
        if (!item.createdAt) return false;
        const t = new Date(item.createdAt).getTime();
        return !Number.isNaN(t) && t >= threshold
    }).length
};