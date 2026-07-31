"use client"
import React, { useState, useRef, useEffect } from 'react'

const CommentBox = () => {
  const [tab, setTab] = useState<string>("comment");
  const [comment, setComment] = useState<string>("");
  const [isSpoiler, setIsSpoiler] = useState<boolean>(false);
  const [maxLength] = useState<number>(2000);
  const [isRedo, setIsRedo] = useState<boolean>(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (comment && !isRedo) {
      const newHistory = [...history.slice(0, historyIndex + 1), comment];
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }
    setIsRedo(false);
  }, [comment]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [comment]);

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= maxLength) {
      setComment(value);
    }
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setComment(history[historyIndex - 1]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setComment(history[historyIndex + 1]);
      setIsRedo(true);
    }
  };

  const handleClear = () => {
    setComment("");
    setHistory([]);
    setHistoryIndex(-1);
  };

  const toggleSpoiler = () => {
    setIsSpoiler(!isSpoiler);
  };


  const handleSubmit = () => {
    if (comment.trim()) {
      console.log("دیدگاه ارسال شد:", comment);
    }
  };

  const remainingChars = maxLength - comment.length;

  return (
    <div className="mt-10">
      <div className="flex items-center gap-x-4">
        <img src="/images/profile04.png" className='w-10' alt="profile image" />
        <p className='text-[14px] font-IRANYekan-Light'>3 دیدگاه ثبت شده، نظر تو چیه؟</p>
      </div>
      <div className="relative border border-gray-200  rounded-md mt-4 w-full p-4 bg-white transition-colors">
        <textarea
          ref={textareaRef}
          value={comment}
          onChange={handleCommentChange}
          placeholder='دیدگاهت رو اینجا بنویس ...'
          className={`w-full text-[14px] font-IRANYekan-Light bg-transparent outline-none resize-none min-h-30 placeholder:text-gray-400`}
          maxLength={maxLength}
        />
        <div className="flex items-center justify-between w-full mt-4 pt-3 border-t border-gray-200">
          <div className="flex items-center gap-x-4 flex-wrap">
            <div className="w-34.75 h-9 bg-gray-200 rounded-full flex items-center p-1">
              <button
                type="button"
                onClick={() => setTab("comment")}
                className={`cursor-pointer w-16.75 h-7.5 rounded-full text-[14px] transition-colors ${tab === "comment"
                    ? "bg-white text-gray-800"
                    : "text-gray-600"
                  }`}
              >
                دیدگاه
              </button>
              <button
                type="button"
                onClick={() => setTab("question")}
                className={`cursor-pointer w-16.75 h-7.5 rounded-full text-[14px] transition-colors ${tab === "question"
                    ? "bg-white text-gray-800"
                    : "text-gray-600 "
                  }`}
              >
                سوال
              </button>
            </div>
            <span className='block h-5 w-px bg-gray-200'></span>
            <div className="flex items-center gap-x-4">
              <button
                type="button"
                title='دوباره (Redo)'
                onClick={handleRedo}
                disabled={historyIndex >= history.length - 1 || !history.length}
                className={`cursor-pointer mr-2 mt-1 transition-colors ${historyIndex >= history.length - 1 || !history.length
                    ? 'opacity-40 cursor-not-allowed'
                    : 'hover:text-blueMenu'
                  }`}
              >
                <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor">
                  <path d="M236,184a12,12,0,0,1-24,0A84,84,0,0,0,68.6,124.6L53.11,140H88a12,12,0,0,1,0,24H24a12,12,0,0,1-12-12V88a12,12,0,0,1,24,0v35.16l15.66-15.55A108,108,0,0,1,236,184Z" />
                </svg>
              </button>
              <button
                type="button"
                title='برگشت (Undo)'
                onClick={handleUndo}
                disabled={historyIndex <= 0}
                className={`cursor-pointer mt-1 transition-colors ${historyIndex <= 0
                    ? 'opacity-40 cursor-not-allowed'
                    : 'hover:text-blue-600'
                  }`}
              >
                <svg width="16" height="16" viewBox="0 0 256 256" fill="currentColor">
                  <path d="M244,88v64a12,12,0,0,1-12,12H168a12,12,0,0,1,0-24h34.9l-15.48-15.37A84,84,0,0,0,44,184a12,12,0,0,1-24,0,108,108,0,0,1,184.37-76.37L220,123.16V88a12,12,0,0,1,24,0Z" />
                </svg>
              </button>
            </div>
            <span className='block h-5 w-px bg-gray-200'></span>
            <button
              title='اسپویل'
              type="button"
              onClick={toggleSpoiler}
              className={`cursor-pointer transition-colors ${isSpoiler
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400'
                }`}
            >
              <svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor">
                <path d="M234.42,162A12,12,0,1,1,213.58,174l-16.86-29.5a127.19,127.19,0,0,1-30.17,13.86L171.84,190a12,12,0,0,1-9.87,13.8,11.22,11.22,0,0,1-2,.17,12,12,0,0,1-11.82-10L143,163.17a136.5,136.5,0,0,1-30.06,0L107.84,194A12,12,0,0,1,96,204a11.22,11.22,0,0,1-2-.17A12,12,0,0,1,84.16,190l5.29-31.72a127.19,127.19,0,0,1-30.17-13.86L42.42,174A12,12,0,1,1,21.58,162L40,129.85a159.73,159.73,0,0,1-17.31-18.31A12,12,0,0,1,41.34,96.46C57.38,116.32,85.44,140,128,140s70.62-23.68,86.66-43.54a12,12,0,0,1,18.67,15.08A159.73,159.73,0,0,1,216,129.85Z" />
              </svg>
            </button>
            <button
              type="button"
              onClick={handleClear}
              disabled={!comment}
              className={`cursor-pointer text-sm transition-colors ${!comment
                  ? 'opacity-40 cursor-not-allowed'
                  : 'text-red-500 hover:text-red-600'
                }`}
            >
              پاک کردن
            </button>
          </div>
          <div className="flex items-center gap-x-2 ml-8">
            <span className={`text-[14px] ${remainingChars < 100 ? 'text-red-500' : 'text-gray-400'}`}>
              {remainingChars}
            </span>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!comment.trim()}
              className={`cursor-pointer w-10 h-10 rounded-full flex items-center justify-center transition-colors ${comment.trim()
                  ? 'bg-blueMenu hover:bg-blue-600 cursor-auto'
                  : 'bg-gray-400 cursor-no-drop'
                }`}
            >
              <svg width="16" height="16" className='fill-white' viewBox="0 0 256 256">
                <path d="M230.14,25.86a20,20,0,0,0-19.57-5.11l-.22.07L18.44,79a20,20,0,0,0-3.06,37.25L99,157l40.71,83.65a19.81,19.81,0,0,0,18,11.38c.57,0,1.15,0,1.73-.07A19.82,19.82,0,0,0,177,237.56L235.18,45.65a1.42,1.42,0,0,0,.07-.22A20,20,0,0,0,230.14,25.86ZM156.91,221.07l-34.37-70.64,46-45.95a12,12,0,0,0-17-17l-46,46L34.93,99.09,210,46Z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isSpoiler && (
        <div className="mt-2 text-xs text-blue-600 dark:text-blue-400 flex items-center gap-x-2">
          <span>⚠️</span>
          <span>حالت اسپویل فعال است. متن شما با برچسب اسپویل نمایش داده می‌شود.</span>
        </div>
      )}
    </div>
  )
}

export default CommentBox;