"use client"
import Link from 'next/link';
import React, { forwardRef, useState } from 'react'
import NotLoggedIn from './NotLoggedIn';
import CommentBox from './CommentBox';

type ReactionType = 'like' | 'laugh' | 'heart' | 'think' | 'moai' | 'dislike' | null;

type Comment = {
  _id: number;
  body: string;
  img: string;
  date: string;
  username: string;
  reaction: ReactionType;
  reactionCount: number;
}

const Comments = forwardRef<HTMLDivElement>((props, ref) => {
  const [tab, setTab] = useState<string>("comments");
  const [activeCommentId, setActiveCommentId] = useState<number | null>(null);
  const [comments, setComments] = useState<Comment[]>([
    {
      _id: 1,
      body: "ممنون از مقاله خوبتون جا داره بگیم کوفتش شه😁",
      img: "/images/profile01.webp",
      date: "6 روز پیش",
      username: "4dDXVXOjw",
      reaction: null,
      reactionCount: 0
    },
    {
      _id: 2,
      body: "ببخشید واقعا سر این مسأله جنجال به پا شد ،ما که هر جا بحث ایران و هر چی به ایران تعلق داشت حرف جنجال شدیم،فقط حرفشو شنیدیم نه دیدیم چقدر این مسأله روی افکار عمومی جهان اثر داشته نه نتیجه رو دیدیم،به جورایی حس می کنم همیشه حقمون ندیده گرفته شده؟؟",
      img: "/images/profile02.webp",
      date: "5 روز پیش",
      username: "𝕬𝖒𝖎𝖗 𝕳𝖔𝖘𝖘𝖊𝖎𝖓",
      reaction: null,
      reactionCount: 0
    },
    {
      _id: 3,
      body: "ال کردستان",
      img: "/images/profile03.webp",
      date: "5 روز پیش",
      username: "ZQV97kN4Z",
      reaction: null,
      reactionCount: 0
    },
  ]);

  const reactionButtons = [
    { key: 'like' as const, emoji: '👍', label: 'لایک' },
    { key: 'laugh' as const, emoji: '😂', label: 'خنده' },
    { key: 'heart' as const, emoji: '❤️', label: 'عشق' },
    { key: 'think' as const, emoji: '🤔', label: 'فکر' },
    { key: 'moai' as const, emoji: '🗿', label: 'مجسمه' },
    { key: 'dislike' as const, emoji: '👎', label: 'نپسندیدن' },
  ];

  const renderReactionIcon = (reaction: ReactionType) => {
    if (!reaction) return '👍';
    const icons: Record<NonNullable<ReactionType>, string> = {
      like: '👍',
      laugh: '😂',
      heart: '❤️',
      think: '🤔',
      moai: '🗿',
      dislike: '👎'
    };
    return icons[reaction];
  };

  const toggleReactionBox = (commentId: number) => {
    setActiveCommentId(activeCommentId === commentId ? null : commentId);
  };

  const handleReaction = (commentId: number, reaction: ReactionType) => {
    setComments(prevComments =>
      prevComments.map(comment => {
        if (comment._id === commentId) {
          if (comment.reaction === reaction) {
            return {
              ...comment,
              reaction: null,
              reactionCount: Math.max(0, comment.reactionCount - 1)
            };
          }
          const newCount = comment.reaction
            ? comment.reactionCount
            : comment.reactionCount + 1;

          return {
            ...comment,
            reaction: reaction,
            reactionCount: newCount
          };
        }
        return comment;
      })
    );
    setActiveCommentId(null);
  };

  const renderComment = (comment: Comment) => {
    const isActive = activeCommentId === comment._id;
    return (
      <div key={comment._id}>
        <div className='flex items-start gap-x-2'>
          <img src={comment.img} alt="profile img" className='w-10' />
          <div>
            <div className='flex items-center gap-x-2'>
              <p className='font-IRANYekan-Bold text-[14px]'>{comment.username}</p>
              <span className='font-IRANYekan-Light text-[13px]'>{comment.date}</span>
            </div>
            <p className='font-IRANYekan-Light mt-2'>{comment.body}</p>
            <div className="mt-4">
              {comment.reactionCount! > 0 && (
                <div className="bg-gray-200 w-15 flex items-center justify-center gap-x-4 h-7 rounded-full mb-4">
                  <div 
                    onClick={() => toggleReactionBox(comment._id)}
                    className='cursor-pointer flex items-center'
                  >
                    <svg width="24" height="24" viewBox="0 0 32 32">
                      <text x="16" y="24" textAnchor="middle" fontSize="24">
                        {renderReactionIcon(comment.reaction)}
                      </text>
                    </svg>
                    <span className='text-[13px] block mt-1'>{comment.reactionCount}</span>
                  </div>
                </div>
              )}
              <button
                type="button"
                onClick={() => toggleReactionBox(comment._id)}
                className='cursor-pointer ml-6 relative z-20'
              >
                <svg width="16" height="16" viewBox="0 0 256 256">
                  <path d="M178.39,158c-11,19.06-29.39,30-50.39,30s-39.36-10.93-50.39-30a12,12,0,0,1,20.78-12c3.89,6.73,12.91,18,29.61,18s25.72-11.28,29.61-18a12,12,0,1,1,20.78,12ZM236,128A108,108,0,1,1,128,20,108.12,108.12,0,0,1,236,128Zm-24,0a84,84,0,1,0-84,84A84.09,84.09,0,0,0,212,128ZM92,124a16,16,0,1,0-16-16A16,16,0,0,0,92,124Zm72-32a16,16,0,1,0,16,16A16,16,0,0,0,164,92Z" />
                </svg>
                {isActive && (
                  <div className="w-73 h-13 bg-gray-10 rounded-full p-2 absolute -top-12.75 flex items-center gap-x-4 z-30">
                    {reactionButtons.map((btn) => (
                      <div 
                        key={btn.key}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleReaction(comment._id, btn.key);
                        }}
                        className='cursor-pointer hover:scale-110 transition-transform'
                      >
                        <svg width="32" height="32" viewBox="0 0 32 32">
                          <text x="16" y="24" textAnchor="middle" fontSize="24">{btn.emoji}</text>
                        </svg>
                      </div>
                    ))}
                  </div>
                )}
              </button>
              <button type="button" className='cursor-pointer relative'>
                <svg width="16" height="16" viewBox="0 0 256 256">
                  <path d="M236,200a12,12,0,0,1-24,0,84.09,84.09,0,0,0-84-84H61l27.52,27.51a12,12,0,0,1-17,17l-48-48a12,12,0,0,1,0-17l48-48a12,12,0,0,1,17,17L61,92h67A108.12,108.12,0,0,1,236,200Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <span className='block w-full h-px my-4 bg-gray-200'></span>
      </div>
    )
  };

  return (
    <div ref={ref} className='mt-20'>
      <div className="flex items-center gap-x-2">
        <span className='w-1 h-6 bg-blueMenu block'></span>
        <p className='font-IRANYekan-Bold'>نظرات</p>
      </div>
      <div id='comment-box'>
        <CommentBox />
      </div>
      <div className="mt-10">
        <ul className='flex items-center gap-x-6'>
          <li>
            <button
              type="button"
              onClick={() => setTab("comments")}
              className={`cursor-pointer relative ${tab === "comments" ? "text-blueMenu" : "text-gray-text"} font-IRANYekan-Light`}>
              دیدگاه ها
              {tab === "comments" && <span className='absolute block w-full h-0.5 -bottom-4.25 bg-blueMenu'></span>}
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setTab("questions")}
              className={`cursor-pointer relative ${tab === "questions" ? "text-blueMenu" : "text-gray-text"} font-IRANYekan-Light`}>
              سوالات
              {tab === "questions" && <span className='absolute block w-full h-0.5 -bottom-4.25 bg-blueMenu'></span>}
            </button>
          </li>
        </ul>
        <span className='block w-full h-px my-4 bg-gray-200'></span>
        {tab === "comments" && (
          <div className='mt-5'>
            {comments.map(comment => renderComment(comment))}
          </div>
        )}
        {tab === "questions" && (
          <div className='flex items-center flex-col gap-y-1 mt-5'>
            <img src="/images/no-comment.png" className='w-30' alt="questions image" />
            <p className='font-IRANYekan-Bold text-[14px]'>هنوز چیزی ثبت نشده!</p>
            <span className='text-[14px] font-IRANYekan-Light'>منتظر مشارکت شما هستیم</span>
          </div>
        )}
      </div>
      {activeCommentId !== null && (
        <div
          onClick={() => setActiveCommentId(null)}
          className="fixed inset-0 z-10"
        ></div>
      )}
    </div>
  )
})

Comments.displayName = 'Comments';

export default Comments;