export type SocialKey = 'instagram' | 'telegram' | 'twitter' | 'linkedin';

export type SocialLinks = Record<SocialKey, string | null>;

export type ProfileForm = {
    fullname: string;
    username: string;
    email: string;
    phone: string;
    bio: string;
    website: string;
    city: string;
    socialLinks: SocialLinks;
};

export const emptySocial: SocialLinks = {
    instagram: null,
    telegram: null,
    twitter: null,
    linkedin: null
};

export function normalizeSocialHandle(row: string): string | null {
    const value = row.trim();
    if (!value) return null;

    const pathMatch = value.match(
        /(?:t\.me|telegram\.me|instagram\.com|twitter\.com|x\.com|linkedin\.com\/in)\/@?([\w.]+)/i
    );
    if (pathMatch?.[1]) return `@${pathMatch[1]}`;

    const schemeMatch = value.match(/^[a-z]+:\/\/@?([\w.]+)/i);
    if (schemeMatch?.[1]) return `@${schemeMatch[1]}`;

    const plan = value.replace(/^@/, "").replace(/[^\w.]/g, "");
    return plan ? `${plan}` : null;
};

export function detectSocialPlatform(row: string): SocialKey | null {
    const value = row.trim().toLowerCase();

    if (value.includes("instagram") || value.includes("insta")) return "instagram";
    if (value.includes("telegram") || value.includes("t.me")) return "telegram";
    if (value.includes("x.com") || value.includes("twitter")) return "twitter"
    if (value.includes("linkedin")) return "linkedin";

    return null;
};

export const PLATFORM_META: Record<SocialKey, { label: string, color: string, placeholder: string }> = {
    instagram: {
        label: "انستاگرام",
        color: "fill-pink-600",
        placeholder: "@username یا لینک اینستا",
    },
    telegram: {
        label: "تلگرام",
        color: "fill-blue-500",
        placeholder: "@username یا t.me/...",
    },
    twitter: {
        label: "تویتیر / x",
        color: "fill-gray-800",
        placeholder: "@username",
    },
    linkedin: {
        label: "لینکدین",
        color: "fill-blue-700",
        placeholder: "linkedin.com/in/...",
    }
};
