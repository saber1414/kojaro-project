import { NextRequest } from "next/server";
import ConnectedDB from "@/lib/db";
import { verifyToken } from "@/utils/auth";
import UserModel from "@/models/User";
import { IUser } from "@/models/User";

export const authenticate = async (req: NextRequest): Promise<IUser | null> => {
    try {
        await ConnectedDB();

        const token = req.cookies.get("token")?.value;
        if (!token) return null;

        const tokenPayload = verifyToken(token);
        if (!tokenPayload?.id) return null;

        const user = await UserModel.findById(tokenPayload.id)
            .select("-password -__v")
            .lean();

        return user || null;
    } catch (error) {
        console.error("Authenticate error:", error);
        return null;
    }
};

export const authenticateOrThrow = async (req: NextRequest): Promise<IUser> => {
    const user = await authenticate(req);
    if (!user) {
        throw new Error("Unauthorized");
    }
    return user;
};