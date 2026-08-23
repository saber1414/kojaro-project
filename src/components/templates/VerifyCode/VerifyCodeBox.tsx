"use client"
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import { requestOTP, verifyOTP } from "@/features/auth/authSlice";
import toast from "react-hot-toast";
import Link from "next/link";

const VerifyCodeBox = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isLoading, identifier } = useAppSelector(state => state.auth);

    const [code, setCode] = useState("");
    const [errors, setErrors] = useState<string[]>([]);
    const [timer, setTimer] = useState(300);
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const [resendText, setResendText] = useState("ارسال مجدد کد");

    const codeInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (timer <= 0) {
            setIsResendDisabled(false);
            setResendText("ارسال مجدد کد");
            return;
        }
        const interval = setInterval(() => {
            setTimer(prev => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    const formatTime = () => {
        const min = Math.floor(timer / 60);
        const sec = timer % 60;
        return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
    };

    const handleResend = async () => {
        if (!identifier || isResendDisabled) return;

        setIsResendDisabled(true);
        setResendText("در حال ارسال...");

        try {
            await dispatch(requestOTP(identifier)).unwrap();
            
            setTimer(300);
            setResendText("کد جدید ارسال شد ✓");
            toast.success("کد جدید برای شما ارسال شد");
        } catch (err: any) {
            toast.error(err || "خطا در ارسال مجدد کد");
            setIsResendDisabled(false);
            setResendText("ارسال مجدد کد");
        } finally {
            setTimeout(() => {
                setIsResendDisabled(false);
                setResendText("ارسال مجدد کد");
            }, 3000);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors([]);

        if (code.length !== 6) {
            setErrors(["کد باید ۶ رقم باشد"]);
            return;
        }

        try {
            const result = await dispatch(verifyOTP({ identifier: identifier!, code })).unwrap();

            if (result.needsPassword) {
                router.push("/verifyPassword");
            } else {
                router.push("/");
            }
        } catch (error: any) {
            setErrors([error.message || "کد وارد شده اشتباه است"]);
            toast.error(error.message || "کد وارد شده اشتباه است");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
            <div className="sm:w-109 w-full shadow shadow-gray-200 bg-white sm:mx-auto sm:my-0">
                <img src="/images/login-header.jpg" className='w-full' alt="login header" />
                <h4 className="mt-5 font-IRANYekan-Bold text-[14px] text-center">کد تایید را وارد کنید</h4>
                <div className="p-4">
                    <p className="text-center text-gray-600 mb-4 text-[13px]">
                        کد ۶ رقمی برای {identifier} ارسال شد
                    </p>

                    <form onSubmit={handleSubmit} className="mt-5">
                        <div>
                            <input
                                ref={codeInputRef}
                                type="text"
                                maxLength={6}
                                value={code}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, "");
                                    setCode(val);
                                    if (errors.length > 0) setErrors([]);
                                }}
                                className="w-full text-[32px] text-center h-12 rounded-xl border border-gray-200 focus:border-blue-500 focus:outline-none tracking-[8px]"
                                placeholder="______"
                                disabled={isLoading}
                            />
                            {errors.length > 0 && (
                                <p className="text-red-500 text-[12px] mt-2">{errors[0]}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || code.length !== 6}
                            className="mt-6 w-full h-9 bg-dark2 text-white text-[13px] font-IRANYekan-Bold rounded-full flex items-center justify-center"
                        >
                            {isLoading ? "در حال بررسی..." : "ادامه"}
                        </button>
                    </form>

                    <div className="flex items-center justify-center gap-x-2 mt-6">
                        <button
                            onClick={handleResend}
                            disabled={isResendDisabled}
                            className="cursor-pointer text-[13px] text-gray-500 disabled:text-gray-400 disabled:cursor-no-drop"
                        >
                            {isResendDisabled ? resendText : "ارسال مجدد کد"}
                        </button>
                        <span className="text-[13px] text-gray-500 font-medium">{formatTime()}</span>
                    </div>

                    <Link href="/signIn" className="mt-6 block text-center text-[13px] text-gray-500">
                        بازگشت به ورود
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default VerifyCodeBox;