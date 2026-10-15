export const timeAgo = (date: Date | string | number): string => {
    const now = new Date();
    const past = new Date(date);

    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    const rft = new Intl.RelativeTimeFormat("fa", { numeric: "auto" });

    const intervals: { unit: Intl.RelativeTimeFormatUnit, seconds: number }[] = [
        { unit: 'year', seconds: 31536000 },
        { unit: "month", seconds: 2592000 },
        { unit: 'week', seconds: 604800 },
        { unit: 'day', seconds: 86400 },
        { unit: 'hour', seconds: 3600 },
        { unit: 'minute', seconds: 60 },
        { unit: 'second', seconds: 1 },
    ];

    for (const interval of intervals) {
        const count = Math.floor(diffInSeconds / interval.seconds);

        if (count >= 1) {
            return rft.format(-count, interval.unit)
        }
    }
    return "همین الان";
};