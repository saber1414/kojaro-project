import ConnectedDB from "@/lib/db";
import { Follow, Article } from "@/models/Index";
import { authenticate } from "@/middlewares/auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await ConnectedDB();

        const { searchParams } = new URL(req.url);

        const user = await authenticate(req);
        if (!user) {
            return NextResponse.json({
                success: false,
                message: "لطفا وارد حساب کاربری خود شوید"
            }, { status: 401 })
        };

        const page = Math.max(1, parseInt(searchParams.get("page") || "1"));
        const limit = Math.min(50, Math.max(1, parseInt(searchParams.get("limit") || "10")));
        const skip = (page - 1) * limit;
        
        const follows = await Follow.find({ user: user._id }).lean();

        const authorIds = follows
            .filter((follow: any) => follow.targetType === "author")
            .map((follow: any) => follow.targetId);

        const categoryIds = follows
            .filter((follow: any) => follow.targetType === "articleCategory")
            .map((follow: any) => follow.targetId);

        if (authorIds.length === 0 && categoryIds.length === 0) {
            return NextResponse.json({
                success: true,
                data: {
                    articles: [],
                    pagination: {
                        total: 0,
                        page,
                        limit,
                        totalPages: 0,
                        hasNextPage: false,
                        hasPrevPage: false,
                    },
                },
            }, { status: 200 })
        };

        const filter = {
            status: "published",
            $or: [
                ...(authorIds.length ? [{ author: { $in: authorIds } }] : []),
                ...(categoryIds.length ? [{ category: { $in: categoryIds } }] : []),
            ],
        };

        const [articles, total] = await Promise.all([
            Article.find(filter)
                .sort({ publishedAt: -1, createdAt: -1 })
                .skip(skip)
                .limit(limit)
                .populate("author", "fullname username image")
                .populate("category", "name slug icon")
                .select("-content -__v")
                .lean(),
            Article.countDocuments(filter),
        ]);

        return NextResponse.json({
            success: true,
            data: {
                articles,
                pagination: {
                    page,
                    limit,
                    total,
                    totalPages: Math.ceil(total / limit),
                    hasPrevPages: (page * limit) < total,
                    hasNextPage: page > 1
                }
            }
        }, { status: 200 });

    } catch (err: any) {
        console.log("Error Feed Follow =>", err);
        return NextResponse.json({
            success: false,
            message: "خطا در دریافت فید",
            errors: err
        }, { status: 500 })
    }
};