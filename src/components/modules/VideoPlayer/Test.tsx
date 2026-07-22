"use client"
import React, { useState, useRef, useEffect, useCallback } from 'react'

// ============================================
// Types
// ============================================
type ShortVideo = {
    _id: number;
    title: string;
    poster: string;
    video: string;
}

type VideoPlayerProps = {
    shortVideo: ShortVideo[];
    closeVideo: () => void
}

// ============================================
// Component
// ============================================
const VideoPlayer = ({ closeVideo, shortVideo }: VideoPlayerProps) => {
    // ============================================
    // State
    // ============================================
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [isMuted, setIsMuted] = useState<boolean>(true);
    const [progress, setProgress] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [showControls, setShowControls] = useState<boolean>(true);

    // ============================================
    // Refs
    // ============================================
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);
    const hideControlsTimeout = useRef<NodeJS.Timeout | null>(null);

    // ============================================
    // Computed
    // ============================================
    const currentVideo = shortVideo[currentIndex];
    const isFirst = currentIndex === 0;
    const isLast = currentIndex === shortVideo.length - 1;

    // ============================================
    // Handlers - Video Controls
    // ============================================
    const togglePlay = useCallback(() => {
        if (!videoRef.current) return;
        
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    }, [isPlaying]);

    const toggleMute = useCallback(() => {
        if (!videoRef.current) return;
        videoRef.current.muted = !isMuted;
        setIsMuted(!isMuted);
    }, [isMuted]);

    // ============================================
    // Handlers - Navigation
    // ============================================
    const goToNext = useCallback(() => {
        if (isLast) return;
        setCurrentIndex(prev => prev + 1);
        setIsPlaying(false);
        setProgress(0);
        setIsLoading(true);
    }, [isLast]);

    const goToPrev = useCallback(() => {
        if (isFirst) return;
        setCurrentIndex(prev => prev - 1);
        setIsPlaying(false);
        setProgress(0);
        setIsLoading(true);
    }, [isFirst]);

    // ============================================
    // Handlers - Progress
    // ============================================
    const handleProgressChange = useCallback((e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
        if (!videoRef.current || !progressRef.current) return;

        const rect = progressRef.current.getBoundingClientRect();
        let clientX: number;

        if ('touches' in e) {
            clientX = e.touches[0].clientX;
        } else {
            clientX = e.clientX;
        }

        const percent = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
        const newTime = percent * duration;
        
        videoRef.current.currentTime = newTime;
        setProgress(percent * 100);
    }, [duration]);

    // ============================================
    // Handlers - Keyboard & Mouse Wheel
    // ============================================
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                goToNext();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                goToPrev();
            } else if (e.key === ' ' || e.key === 'Space') {
                e.preventDefault();
                togglePlay();
            } else if (e.key === 'm' || e.key === 'M') {
                toggleMute();
            }
        };

        const handleWheel = (e: WheelEvent) => {
            if (e.deltaY > 0) {
                goToNext();
            } else if (e.deltaY < 0) {
                goToPrev();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('wheel', handleWheel);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('wheel', handleWheel);
        };
    }, [goToNext, goToPrev, togglePlay, toggleMute]);

    // ============================================
    // Effects - Auto-hide controls
    // ============================================
    useEffect(() => {
        if (hideControlsTimeout.current) {
            clearTimeout(hideControlsTimeout.current);
        }

        setShowControls(true);

        hideControlsTimeout.current = setTimeout(() => {
            if (isPlaying) {
                setShowControls(false);
            }
        }, 3000);

        return () => {
            if (hideControlsTimeout.current) {
                clearTimeout(hideControlsTimeout.current);
            }
        };
    }, [isPlaying, currentIndex]);

    // ============================================
    // Effects - Video events
    // ============================================
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const handleLoadedMetadata = () => {
            setDuration(video.duration);
            setIsLoading(false);
        };

        const handleTimeUpdate = () => {
            const percent = (video.currentTime / video.duration) * 100;
            setProgress(percent);
        };

        const handleLoadedData = () => {
            setIsLoading(false);
        };

        const handleWaiting = () => {
            setIsLoading(true);
        };

        const handleCanPlay = () => {
            setIsLoading(false);
        };

        video.addEventListener('loadedmetadata', handleLoadedMetadata);
        video.addEventListener('timeupdate', handleTimeUpdate);
        video.addEventListener('loadeddata', handleLoadedData);
        video.addEventListener('waiting', handleWaiting);
        video.addEventListener('canplay', handleCanPlay);

        // Auto-play with mute
        video.muted = true;
        video.play().catch(() => {
            // Auto-play prevented by browser
            setIsPlaying(false);
        });

        return () => {
            video.removeEventListener('loadedmetadata', handleLoadedMetadata);
            video.removeEventListener('timeupdate', handleTimeUpdate);
            video.removeEventListener('loadeddata', handleLoadedData);
            video.removeEventListener('waiting', handleWaiting);
            video.removeEventListener('canplay', handleCanPlay);
        };
    }, [currentIndex]);

    // ============================================
    // Effects - Body scroll lock
    // ============================================
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    // ============================================
    // Render
    // ============================================
    return (
        <div 
            ref={containerRef}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center px-4 py-6"
            onMouseMove={() => {
                setShowControls(true);
                if (hideControlsTimeout.current) {
                    clearTimeout(hideControlsTimeout.current);
                }
                hideControlsTimeout.current = setTimeout(() => {
                    if (isPlaying) setShowControls(false);
                }, 3000);
            }}
        >
            {/* ==========================================
                Container
                ========================================== */}
            <div className="relative w-full max-w-5xl h-[80vh] bg-black rounded-2xl overflow-hidden">
                
                {/* ==========================================
                    Video Element
                    ========================================== */}
                <video
                    ref={videoRef}
                    src={currentVideo.video}
                    poster={currentVideo.poster}
                    className="w-full h-full object-contain"
                    onClick={togglePlay}
                    playsInline
                    preload="metadata"
                />

                {/* ==========================================
                    Loading Overlay
                    ========================================== */}
                {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
                    </div>
                )}

                {/* ==========================================
                    Controls Overlay
                    ========================================== */}
                <div 
                    className={`absolute inset-0 transition-opacity duration-500 ${
                        showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                >
                    {/* Close Button - Top Right */}
                    <button
                        onClick={closeVideo}
                        className="absolute top-4 right-4 z-20 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                        aria-label="بستن"
                    >
                        <svg width="24" height="24" viewBox="0 0 256 256" className="fill-white">
                            <path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"/>
                        </svg>
                    </button>

                    {/* Mute Button - Top Left */}
                    <button
                        onClick={toggleMute}
                        className="absolute top-4 left-4 z-20 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                        aria-label={isMuted ? 'صدا دار' : 'بی صدا'}
                    >
                        {isMuted ? (
                            <svg width="24" height="24" viewBox="0 0 256 256" className="fill-white">
                                <path d="M56.88,31.93A12,12,0,1,0,39.12,48.07L64.51,76H32A20,20,0,0,0,12,96v64a20,20,0,0,0,20,20H75.88l68.75,53.47A12,12,0,0,0,164,224V185.44l35.12,38.63a12,12,0,0,0,17.76-16.14ZM36,100H68v56H36Zm104,99.46L92,162.13V106.24L140,159Zm-31-134a12,12,0,0,1,2.11-16.84l33.51-26.07A12,12,0,0,1,164,32V94.94a12,12,0,0,1-24,0V56.54l-14.15,11A12,12,0,0,1,109,65.44Zm74,49.35a12,12,0,0,1,18-15.85,44,44,0,0,1,5.55,50.21,12,12,0,0,1-21-11.55A19.67,19.67,0,0,0,188,128,20,20,0,0,0,183,114.79Z"/>
                            </svg>
                        ) : (
                            <svg width="24" height="24" viewBox="0 0 256 256" className="fill-white">
                                <path d="M157.27,21.22a12,12,0,0,0-12.64,1.31L75.88,76H32A20,20,0,0,0,12,96v64a20,20,0,0,0,20,20H75.88l68.75,53.47A12,12,0,0,0,164,224V32A12,12,0,0,0,157.27,21.22ZM36,100H68v56H36Zm104,99.46L92,162.13V93.87l48-37.33ZM212,128a44,44,0,0,1-11,29.11,12,12,0,1,1-18-15.88,20,20,0,0,0,0-26.43,12,12,0,0,1,18-15.86A43.94,43.94,0,0,1,212,128Zm40,0a83.87,83.87,0,0,1-21.39,56,12,12,0,0,1-17.89-16,60,60,0,0,0,0-80,12,12,0,1,1,17.88-16A83.87,83.87,0,0,1,252,128Z"/>
                            </svg>
                        )}
                    </button>

                    {/* Navigation Buttons - Left Side */}
                    <div className="absolute top-1/2 -translate-y-1/2 left-4 flex flex-col gap-4 z-20">
                        <button
                            onClick={goToPrev}
                            disabled={isFirst}
                            className={`p-3 rounded-full transition-all ${
                                isFirst 
                                    ? 'bg-black/20 cursor-not-allowed opacity-50' 
                                    : 'bg-black/50 hover:bg-black/70'
                            }`}
                            aria-label="قبلی"
                        >
                            <svg width="20" height="20" viewBox="0 0 256 256" className="fill-white">
                                <path d="M216.49,168.49a12,12,0,0,1-17,0L128,97,56.49,168.49a12,12,0,0,1-17-17l80-80a12,12,0,0,1,17,0l80,80A12,12,0,0,1,216.49,168.49Z"/>
                            </svg>
                        </button>
                        <button
                            onClick={goToNext}
                            disabled={isLast}
                            className={`p-3 rounded-full transition-all ${
                                isLast 
                                    ? 'bg-black/20 cursor-not-allowed opacity-50' 
                                    : 'bg-black/50 hover:bg-black/70'
                            }`}
                            aria-label="بعدی"
                        >
                            <svg width="20" height="20" viewBox="0 0 256 256" className="fill-white rotate-180">
                                <path d="M216.49,168.49a12,12,0,0,1-17,0L128,97,56.49,168.49a12,12,0,0,1-17-17l80-80a12,12,0,0,1,17,0l80,80A12,12,0,0,1,216.49,168.49Z"/>
                            </svg>
                        </button>
                    </div>

                    {/* Play/Pause Button - Center */}
                    <button
                        onClick={togglePlay}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 p-4 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
                        aria-label={isPlaying ? 'مکث' : 'پخش'}
                    >
                        {isPlaying ? (
                            <svg width="32" height="32" viewBox="0 0 24 24" className="fill-white">
                                <rect x="6" y="4" width="4" height="16" rx="1" />
                                <rect x="14" y="4" width="4" height="16" rx="1" />
                            </svg>
                        ) : (
                            <svg viewBox="0 0 16 16" className="fill-white" width="32" height="32">
                                <path d="M8 0C3.589 0 0 3.589 0 8s3.589 8 8 8 8-3.589 8-8-3.589-8-8-8zm2.841 8.284-4.333 2.667a.336.336 0 0 1-.337.007.334.334 0 0 1-.171-.291V5.334a.334.334 0 0 1 .508-.284l4.334 2.666a.333.333 0 0 1 0 .568z"/>
                            </svg>
                        )}
                    </button>

                    {/* Bottom Controls */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent z-20">
                        {/* Video Info */}
                        <div className="mb-3">
                            <h3 className="text-white font-bold text-lg line-clamp-1">
                                {currentVideo.title}
                            </h3>
                            <p className="text-white/60 text-sm">
                                {currentIndex + 1} از {shortVideo.length}
                            </p>
                        </div>

                        {/* Progress Bar */}
                        <div 
                            ref={progressRef}
                            className="relative w-full h-1.5 bg-white/20 rounded-full cursor-pointer group"
                            onClick={handleProgressChange}
                            onTouchStart={handleProgressChange}
                            onTouchMove={handleProgressChange}
                        >
                            <div 
                                className="h-full bg-white rounded-full transition-all"
                                style={{ width: `${progress}%` }}
                            />
                            <div 
                                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                style={{ left: `calc(${progress}% - 6px)` }}
                            />
                        </div>

                        {/* Time Display */}
                        <div className="flex justify-between mt-2">
                            <span className="text-white/60 text-xs">
                                {formatTime((progress / 100) * duration)}
                            </span>
                            <span className="text-white/60 text-xs">
                                {formatTime(duration)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* ==========================================
                    Keyboard Shortcuts Hint
                    ========================================== */}
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 text-white/30 text-xs transition-opacity duration-1000">
                    {showControls && (
                        <span>⌨️ ← → برای تغییر ویدیو • Space برای پخش/مکث • M برای صدا</span>
                    )}
                </div>
            </div>
        </div>
    );
};

// ============================================
// Helper Functions
// ============================================
const formatTime = (seconds: number): string => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export default VideoPlayer;