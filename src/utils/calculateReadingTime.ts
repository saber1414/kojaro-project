export const calculateReadingTime = (content: string): number => {
    const wordsPerMinute = 200;
    const text = content.replace(/<[^>]*>/g, "");
    const words = text.trim().split(/\s+/).length;

    return Math.max(1, Math.ceil(words / wordsPerMinute));
};