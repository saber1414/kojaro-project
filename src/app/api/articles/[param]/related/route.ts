import ConnectedDB from "@/lib/db";
import { Article } from "@/models/Index";
import { Types } from "mongoose";
import { NextRequest, NextResponse } from "next/server";

const isObjectId = (value: string) => Types.ObjectId.isValid(value);

export async function GET(req: NextRequest, { params }: { params: Promise<{ param: string }> }) {
    try {
        await ConnectedDB();

        const { searchParams } = new URL(req.url);
        const limit = Math.min(10, Math.max(1, parseInt(searchParams.get("limit") || "6", 10)));

        const { param } = await params;

        let current: any;

        if (isObjectId(param)) {
            current = await Article.findById(param)
                .select("_id category tags author status")
                .lean();
        } else {
            current = await Article.findOne({ slug: param })
                .select("_id category tags author status")
                .lean();
        };

        if (!current) {
            return NextResponse.json(
                {
                    success: false,
                    message: "مقاله یافت نشد",
                },
                { status: 404 }
            );
        };

        const excludeId = current._id;
        const tags = Array.isArray(current.tags) ? current.tags : [];

        let related: any[] = [];

        if (tags.length > 0) {
            related = await Article.find({
                _id: { $ne: excludeId },
                status: "published",
                category: current.category,
                tags: { $in: tags },
            })
                .sort({ publishedAt: -1, views: -1 })
                .limit(limit)
                .populate("author", "fullname username image")
                .populate("category", "name slug icon")
                .select(
                    "title slug excerpt coverImage author category tags views readingTime publishedAt likeCount"
                )
                .lean();
        };

        if (related.length < limit) {
            const existingIds = related.map((article) => article._id);
            const more = await Article.find({
                _id: { $ne: excludeId, $nin: existingIds },
                status: "published",
                category: current.category,
            })
                .sort({ publishedAt: -1, views: -1 })
                .limit(limit - related.length)
                .populate("author", "fullname username image")
                .populate("category", "name slug icon")
                .select(
                    "title slug excerpt coverImage author category tags views readingTime publishedAt likeCount"
                )
                .lean();

            related = [...related, ...more];
        };

        if (related.length < limit && current.author) {
            const existingIds = related.map((article) => article._id);
            const byAuthor = await Article.find({
                _id: { $ne: excludeId, $nin: existingIds },
                status: "published",
                author: current.author,
            })
                .sort({ publishedAt: -1 })
                .limit(limit - related.length)
                .populate("author", "fullname username image")
                .populate("category", "name slug icon")
                .select(
                    "title slug excerpt coverImage author category tags views readingTime publishedAt likeCount"
                )
                .lean();

            related = [...related, ...byAuthor];
        };

        if (related.length < limit) {
            const existingIds = related.map((article) => article._id);
            const latest = await Article.find({
                _id: { $ne: excludeId, $nin: existingIds },
                status: "published",
            })
                .sort({ publishedAt: -1 })
                .limit(limit - related.length)
                .populate("author", "fullname username image")
                .populate("category", "name slug icon")
                .select(
                    "title slug excerpt coverImage author category tags views readingTime publishedAt likeCount"
                )
                .lean();

            related = [...related, ...latest];
        };

        return NextResponse.json(
            {
                success: true,
                data: related,
            },
            { status: 200 }
        );
    } catch (err: any) {
        console.log("Error Response Related =>", err);
        return NextResponse.json(
            {
                success: false,
                message: "خطا در دریافت مقالات مرتبط",
            },
            { status: 500 }
        );
    }
}