"use client";
import Search from "@/components/modules/AdminPanel/Search/Search";
import { useEffect, useMemo, useState } from "react";
import CommentBody from "./commentBody";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import { deleteComment, fetchAllComments, moderateComment } from "@/features/comments/comments";
import AnswerComment from "./answerComment";
import TableSkeleton from "@/components/modules/AdminPanel/TableSkeleton/TableSkeleton";
import EmptyPage from "@/components/modules/AdminPanel/EmptyPage/EmptyPage";
import toast from "react-hot-toast";
import DeleteModal from "@/components/modules/AdminPanel/DeleteModal/DeleteModal";
import { useReactionItems } from "@/hooks/useRecentCount";

type StatusComment = "pending" | "rejected" | "approved" | "spam";

const statusOptions: { value: StatusComment; label: string }[] = [
    { value: "pending", label: "درحال انتظار" },
    { value: "rejected", label: "رد شده" },
    { value: "approved", label: "تایید شده" },
    { value: "spam", label: "گزارش شده" },
];

const getStatusBadgeColor = (status: StatusComment): string => {
    switch (status) {
        case "pending":
            return "text-yellow-700 bg-yellow-50";
        case "approved":
            return "text-green-700 bg-green-50";
        case "rejected":
            return "text-red-700 bg-red-50";
        case "spam":
            return "text-red-700 bg-red-50";
        default:
            return "text-gray-700 bg-gray-50";
    }
};

const CommentsList = () => {
    const dispatch = useAppDispatch();
    const { isLoading, allComments, isUpdating } = useAppSelector(
        (state) => state.comments
    );

    const [search, setSearch] = useState("");
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    const [showCommentBody, setShowCommentBody] = useState(false);
    const [showAnswerComment, setShowAnswerComment] = useState(false);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);
    const [commentBody, setCommentBody] = useState<string | null>(null);
    const [selectedComment, setSelectedComment] = useState<any>(null);
    const [commentId, setCommentId] = useState<string | null>(null);
    const [deleteModal, setDeleteModal] = useState<boolean>(false);
    const newCommentCount = useReactionItems(allComments, 7);

    useEffect(() => {
        dispatch(fetchAllComments({})).unwrap();
    }, [dispatch]);

    const comments = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return allComments;

        return allComments.filter((comment) => {
            const authorName = (
                comment.author?.fullname ||
                comment.author?.username ||
                ""
            ).toLowerCase();
            const content = (comment.content || "").toLowerCase();
            const articleTitle = (
                typeof comment.article === "object"
                    ? comment.article?.title || ""
                    : ""
            ).toLowerCase();
            const approvedBy = (
                comment.approvedBy?.username ||
                comment.approvedBy?.fullname ||
                ""
            ).toLowerCase();

            return (
                authorName.includes(q) ||
                content.includes(q) ||
                articleTitle.includes(q) ||
                approvedBy.includes(q)
            );
        });
    }, [allComments, search]);

    const total = comments.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const currentPage = Math.min(page, totalPages);
    const startItem = total === 0 ? 0 : (currentPage - 1) * limit + 1;
    const endItem = Math.min(currentPage * limit, total);

    const paginatedComments = useMemo(() => {
        const start = (currentPage - 1) * limit;
        return comments.slice(start, start + limit);
    }, [comments, currentPage, limit]);

    const pageIds = useMemo(
        () => paginatedComments.map((comment) => comment._id),
        [paginatedComments]
    );

    const isAllPageSelected =
        pageIds.length > 0 && pageIds.every((id) => selectedIds.includes(id));
    const isSomePageSelected =
        pageIds.some((id) => selectedIds.includes(id)) && !isAllPageSelected;

    const toggleSelectAllPage = () => {
        if (isAllPageSelected) {
            setSelectedIds((prev) => prev.filter((id) => !pageIds.includes(id)));
        } else {
            setSelectedIds((prev) => Array.from(new Set([...prev, ...pageIds])));
        }
    };

    const toggleSelectedOne = (id: string) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
        );
    };

    const goPrev = () => setPage((p) => Math.max(1, p - 1));
    const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

    const limitOptions = useMemo(() => {
        const totalCount = comments.length;
        if (totalCount <= 0) return [10];
        const base = [5, 10, 20, 50];
        const options = base.filter((n) => n <= totalCount);
        return options.length ? options : [totalCount];
    }, [comments]);

    const handleLimitChange = (value: number) => {
        setLimit(value);
        setPage(1);
    };

    const handleModerate = async (commentId: string, status: StatusComment) => {
        try {
            await dispatch(moderateComment({ _id: commentId, status: status as any })).unwrap();
            dispatch(fetchAllComments({}));
            toast.success(
                status === "approved"
                    ? "دیدگاه تایید شد"
                    : status === "rejected"
                        ? "دیدگاه رد شد"
                        : "دیدگاه به عنوان اسپم علامت‌گذاری شد"
            );
        } catch (err: any) {
            toast.error(err || "خطا در تغییر وضعیت دیدگاه");
        }
    };

    const handelDeleteComfirm = async () => {
        try {
            await dispatch(deleteComment(commentId!)).unwrap();
            dispatch(fetchAllComments({}));
            setDeleteModal(false);
            setCommentId(null);
            toast.success("دیدگاه باموفقیت حذف شد")
        } catch (err: any) {
            toast.error(err);
            return
        }
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-10">
                    <h3 className="text-[14px] font-IRANYekan-Bold">لیست دیدگاها</h3>
                    <Search value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
                <button
                    type="button"
                    className="w-34.25 cursor-pointer h-8 bg-green-1 text-white flex items-center justify-center text-[13px] rounded-sm"
                >
                    دیدگاه
                </button>
            </div>

            <div className="mt-10 flex items-center justify-between gap-x-2 xl:gap-x-4 flex-wrap lg:flex-none">
                <div className="w-full sm:w-[49%] md:w-[49%] lg:w-[49%] xl:w-[23%] 2xl:w-[24%] mb-2 xl:mb-0 h-20 bg-white rounded-lg flex flex-row items-center justify-between px-2">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-chat-square-dots fill-fuchsia-500"
                            viewBox="0 0 16 16"
                        >
                            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
                            <path d="M5 6a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0m4 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0"></path>
                        </svg>
                    </div>
                    <div>
                        <span className="text-[14px] text-gray-icon font-IRANYekan-Bold">
                            کل دیدگاها
                        </span>
                        <p className="pt-2 text-[13px] font-IRANYekan-Bold">
                            تعداد: {allComments.length}
                        </p>
                    </div>
                </div>
                <div className="w-full sm:w-[49%] md:w-[49%] lg:w-[49%] xl:w-[23%] 2xl:w-[24%] mb-2 xl:mb-0 h-20 bg-white rounded-lg flex flex-row items-center justify-between px-2">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-chat-square-quote fill-orange-500"
                            viewBox="0 0 16 16"
                        >
                            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
                            <path d="M7.066 4.76A1.665 1.665 0 0 0 4 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112zm4 0A1.665 1.665 0 0 0 8 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112z"></path>
                        </svg>
                    </div>
                    <div>
                        <span className="text-[14px] text-gray-icon font-IRANYekan-Bold">
                            دیدگاه جدید
                        </span>
                        <p className="pt-2 text-[13px] font-IRANYekan-Bold">تعداد: {newCommentCount}</p>
                    </div>
                </div>
                <div className="w-full sm:w-[49%] md:w-[49%] lg:w-[49%] xl:w-[23%] 2xl:w-[24%] mb-2 xl:mb-0 h-20 bg-white rounded-lg flex flex-row items-center justify-between px-2">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-chat-square-dots-fill fill-green-500"
                            viewBox="0 0 16 16"
                        >
                            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.5a1 1 0 0 0-.8.4l-1.9 2.533a1 1 0 0 1-1.6 0L5.3 12.4a1 1 0 0 0-.8-.4H2a2 2 0 0 1-2-2zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2"></path>
                        </svg>
                    </div>
                    <div>
                        <span className="text-[14px] text-gray-icon font-IRANYekan-Bold">
                            پاسخ داده شده
                        </span>
                        <p className="pt-2 text-[13px] font-IRANYekan-Bold">تعداد: 0</p>
                    </div>
                </div>
                <div className="w-full sm:w-[49%] md:w-[49%] lg:w-[49%] xl:w-[23%] 2xl:w-[24%] mb-2 xl:mb-0 h-20 bg-white rounded-lg flex flex-row items-center justify-between px-2">
                    <div className="w-10 h-10 bg-sky-100 rounded-full flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-chat-square-text fill-blue-500"
                            viewBox="0 0 16 16"
                        >
                            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-2.5a2 2 0 0 0-1.6.8L8 14.333 6.1 11.8a2 2 0 0 0-1.6-.8H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2.5a1 1 0 0 1 .8.4l1.9 2.533a1 1 0 0 0 1.6 0l1.9-2.533a1 1 0 0 1 .8-.4H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
                            <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5M3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6m0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5"></path>
                        </svg>
                    </div>
                    <div>
                        <span className="text-[14px] text-gray-icon font-IRANYekan-Bold">
                            سایر
                        </span>
                        <p className="pt-2 text-[13px] font-IRANYekan-Bold">تعداد: 0</p>
                    </div>
                </div>
            </div>

            <div className="mt-10 bg-white p-4 rounded-lg">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-x-4">
                        <div className="text-[14px] font-IRANYekan-Bold">کل دیدگاه‌ها</div>
                        <button
                            type="button"
                            className={`cursor-pointer h-8 px-4 transition-all ease-in rounded-sm bg-red-500 hover:bg-red-800 text-white items-center justify-center text-[13px] ${selectedIds.length ? "flex" : "hidden"
                                }`}
                        >
                            حذف انتخابی ها ({selectedIds.length})
                        </button>
                    </div>
                    <div className="flex gap-x-2 text-[13px]">
                        <span className="text-green-1">
                            {startItem}-{endItem}
                        </span>
                        از
                        <span>{total}</span>
                    </div>
                </div>
                <span className="w-full h-px bg-gray-10 mt-5 block"></span>
                {paginatedComments.length ? (
                    <div className="mt-5">
                        <div className="grid grid-cols-[1fr_1fr_3fr_3fr_3fr_3fr] text-[14px] text-center bg-gray-100 rounded-lg py-4 mb-2">
                            <div className="flex items-center justify-center">
                                <input
                                    type="checkbox"
                                    checked={isAllPageSelected}
                                    onChange={toggleSelectAllPage}
                                    ref={(el) => {
                                        if (el) el.indeterminate = isSomePageSelected;
                                    }}
                                    className="w-4 h-4 rounded border-gray-300 accent-green-1 cursor-pointer"
                                />
                            </div>
                            <div>ردیف</div>
                            <div>نام</div>
                            <div>تایید / رد</div>
                            <div>وضعیت دیدگاه</div>
                            <div>وضعیت</div>
                        </div>
                        {paginatedComments.map((comment, index) => {
                            const status = comment.status as StatusComment;
                            const isApproved = status === "approved";
                            const isRejected = status === "rejected" || status === "spam";
                            return (
                                <div
                                    key={comment._id}
                                    className={`grid grid-cols-[1fr_1fr_3fr_3fr_3fr_3fr] text-[14px] text-center items-center rounded-lg py-4 mb-2 ${getStatusBadgeColor(
                                        status
                                    )}`}
                                >
                                    <div className="flex items-center justify-center">
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(comment._id)}
                                            onChange={() => toggleSelectedOne(comment._id)}
                                            className="w-4 h-4 rounded border-gray-300 accent-green-1 cursor-pointer"
                                        />
                                    </div>
                                    <div>{(currentPage - 1) * limit + index + 1}</div>
                                    <div>
                                        {comment.author?.fullname || comment.author?.username}
                                    </div>
                                    <div className="flex items-center justify-center gap-x-1">
                                        <button
                                            type="button"
                                            onClick={() => handleModerate(comment._id, "approved")}
                                            disabled={isUpdating || isApproved}
                                            className={`w-30 h-6 text-[13px] rounded-sm transition-colors ${isApproved
                                                ? "bg-green-200 text-green-700 cursor-not-allowed opacity-60"
                                                : "bg-green-100 hover:bg-green-200 cursor-pointer"
                                                }`}
                                        >
                                            {isApproved ? "✓ تایید شده" : "تایید"}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleModerate(comment._id, "rejected")}
                                            disabled={isUpdating || isRejected}
                                            className={`w-30 h-6 text-[13px] rounded-sm transition-colors ${isRejected
                                                ? "bg-red-200 text-red-700 cursor-not-allowed opacity-60"
                                                : "bg-red-100 hover:bg-red-200 cursor-pointer"
                                                }`}
                                        >
                                            {isRejected ? "✗ رد شده" : "رد"}
                                        </button>
                                    </div>
                                    <div>
                                        {statusOptions.find((s) => s.value === status)?.label} /{" "}
                                        {comment.isAnswer ? "پاسخ داده شده" : "پاسخ داده نشده"}
                                    </div>
                                    <div className="flex items-center justify-center gap-x-2">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowCommentBody(true);
                                                setCommentBody(comment.content);
                                                setSelectedComment(comment);
                                            }}
                                            className="cursor-pointer bg-green-100 w-8 h-8 rounded-md flex items-center justify-center hover:bg-green-200 transition-colors"
                                        >
                                            <svg
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="bi bi-eye-fill fill-green-500"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"></path>
                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"></path>
                                            </svg>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setShowAnswerComment(true)}
                                            className="cursor-pointer bg-sky-100 w-8 h-8 rounded-md flex items-center justify-center hover:bg-sky-200 transition-colors"
                                        >
                                            <svg
                                                width="16"
                                                height="16"
                                                fill="none"
                                                viewBox="0 0 13 13"
                                            >
                                                <path
                                                    fill="#1e88e5"
                                                    stroke="#1e88e5"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M11.065 1.03a1.82 1.82 0 0 0-2.585.018L1.618 7.91a2 2 0 0 0-.524.918l-.58 2.267a.4.4 0 0 0 .486.487L3.268 11a2 2 0 0 0 .917-.523l6.863-6.862a1.817 1.817 0 0 0 .017-2.585"
                                                ></path>
                                            </svg>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setDeleteModal(true);
                                                setCommentId(comment._id)
                                            }}
                                            className="cursor-pointer bg-red-100 w-8 h-8 rounded-md flex items-center justify-center hover:bg-red-200 transition-colors"
                                        >
                                            <svg
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="bi bi-trash-fill fill-red-500"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"></path>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                        <div className="flex items-center justify-between mt-5">
                            <div className="flex gap-x-2 text-[13px]">
                                <span className="text-green-1">
                                    {startItem}-{endItem}
                                </span>
                                از
                                <span>{total}</span>
                            </div>
                            <div className="flex items-center gap-x-6">
                                <div className="flex items-center gap-x-2">
                                    <button
                                        onClick={goNext}
                                        disabled={currentPage >= totalPages}
                                        type="button"
                                        className="cursor-pointer w-7 h-7 bg-gray-10 rounded-sm flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        <svg
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-arrow-right"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"
                                            ></path>
                                        </svg>
                                    </button>
                                    <button
                                        onClick={goPrev}
                                        disabled={currentPage <= 1}
                                        type="button"
                                        className="cursor-pointer w-7 h-7 bg-gray-10 rounded-sm flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
                                    >
                                        <svg
                                            width="16"
                                            height="16"
                                            fill="currentColor"
                                            className="bi bi-arrow-left"
                                            viewBox="0 0 16 16"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8"
                                            ></path>
                                        </svg>
                                    </button>
                                </div>
                                <div className="flex items-center gap-x-2">
                                    <span className="text-[13px]">تعداد ردیف در هر صفحه:</span>
                                    <select
                                        value={limit}
                                        onChange={(e) => handleLimitChange(Number(e.target.value))}
                                        className="w-13 h-7 rounded-sm text-[13px] font-IRANYekan-Bold bg-gray-10"
                                    >
                                        {limitOptions.map((opt) => (
                                            <option key={opt} value={opt}>
                                                {opt}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : isLoading ? (
                    <TableSkeleton rows={5} />
                ) : (
                    <EmptyPage name="دیدگاه" text="دیدگاه ها" />
                )}
            </div>

            {showCommentBody && (
                <CommentBody
                    body={commentBody!}
                    author={selectedComment?.author}
                    onClose={() => setShowCommentBody(false)}
                />
            )}
            {showAnswerComment && (
                <AnswerComment onClose={() => setShowAnswerComment(false)} />
            )}
            {
                deleteModal && (
                    <DeleteModal
                        closeBtn={() => setDeleteModal(false)}
                        confirmBtn={handelDeleteComfirm}
                        text="حذف"
                        loading={isUpdating}
                    />
                )
            }
        </>
    );
};

export default CommentsList;
