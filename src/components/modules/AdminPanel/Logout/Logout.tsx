"use client"
import { useEffect, useState } from 'react'
import Logout from '../../Logout/Logout';
import { useAppDispatch } from '@/features/hooks';
import { logout } from '@/features/auth/authSlice';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const LogoutMe = () => {
    const dispatch = useAppDispatch();
    const route = useRouter();

    const [logoutBtn, setLogoutBtn] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (logoutBtn) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "auto"
        }
    }, [logoutBtn]);

    const submitLogout = async () => {
        try {
            setLoading(true);
            dispatch(logout()).unwrap();
            route.push("/signIn");
            toast.success("خارج شدید")
        } catch (err: any) {
            const errorMessage = err?.message || err?.payload || "خطا در خروج از حساب";
            toast.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="mt-auto">
                <button onClick={() => setLogoutBtn(true)} type="button" className='cursor-pointer text-[14px] bg-white rounded-lg w-full h-10'>
                    <span>خروج از حساب</span>
                </button>
            </div>
            {
                logoutBtn &&
                <Logout
                    loading={loading}
                    onCancel={() => setLogoutBtn(false)}
                    onClick={submitLogout}
                />
            }
        </>
    )
};

export default LogoutMe;