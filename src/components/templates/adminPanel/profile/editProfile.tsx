"use client";
import { getCurrentUser } from '@/features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@/features/hooks';
import React, { useCallback, useEffect, useState } from 'react';
import Loading from '../../Loading/Loading';
import toast from 'react-hot-toast';
import { useDropzone } from "react-dropzone";
import { emptySocial, SocialKey, normalizeSocialHandle, detectSocialPlatform, PLATFORM_META } from "@/utils/normalizeSocial";
import { updateProfile } from '@/features/users/users';

function SocialIcon({ platform }: { platform: SocialKey }) {
    if (platform === "telegram")
        return <span className="text-blue-500 text-sm">
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi bi-telegram'
                viewBox='0 0 16 16'
            >
                <path d='M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.287 5.906q-1.168.486-4.666 2.01-.567.225-.595.442c-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294q.39.01.868-.32 3.269-2.206 3.374-2.23c.05-.012.12-.026.166.016s.042.12.037.141c-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8 8 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629q.14.092.27.187c.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.4 1.4 0 0 0-.013-.315.34.34 0 0 0-.114-.217.53.53 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09'></path>
            </svg>
        </span>;
    if (platform === "instagram")
        return <span className="text-pink-600 text-sm">
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi bi-instagram'
                viewBox='0 0 16 16'
            >
                <path d='M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334'></path>
            </svg>
        </span>;
    if (platform === "twitter")
        return <span className="text-gray-800 text-sm">
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi bi-twitter-x'
                viewBox='0 0 16 16'
            >
                <path d='M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z'></path>
            </svg>
        </span>;
    return <span className="text-blue-700 text-sm">
        <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-linkedin'
            viewBox='0 0 16 16'
        >
            <path d='M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z'></path>
        </svg>
    </span>;
};

const EditProfile = () => {
    const dispatch = useAppDispatch();
    const { user, isLoading } = useAppSelector(state => state.auth);
    const [form, setForm] = useState({
        fullname: "",
        username: "",
        email: "",
        phone: "",
        bio: "",
        website: "",
        city: "",
        socialLinks: { ...emptySocial }
    });
    const [image, setImage] = useState<File | null>(null);
    const [privew, setPrivew] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const [socialInput, setSocialInput] = useState("");
    const [socialPlatform, setSocialPlatform] = useState<SocialKey>("instagram")

    useEffect(() => {
        if (!user) {
            dispatch(getCurrentUser())
        }
    }, [dispatch, user]);

    useEffect(() => {
        if (user) {
            setForm({
                fullname: user.fullname || "",
                username: user.username || "",
                email: user.email || "",
                phone: user.phone || "",
                bio: user.bio || "",
                website: user.website || "",
                city: user.city || "",
                socialLinks: {
                    instagram: user.socialLinks?.instagram || null,
                    telegram: user.socialLinks?.telegram || null,
                    twitter: user.socialLinks?.twitter || null,
                    linkedin: user.socialLinks?.linkedin || null,
                }
            })
        }
    }, [user]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (!file) return null;

        const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp", "image/svg+xml", "image/gif"];
        if (!allowedTypes.includes(file.type)) {
            toast.error("فرمت عکس معتبر نمی باشد");
            return;
        };

        if (file.size > 5 * 1024 * 1024) {
            toast.error("حجم عکس بیش از حد مجاز می باشد");
            return;
        };

        setImage(file);
        setPrivew(URL.createObjectURL(file));
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { "image/*": [".png", ".jpeg", ".jpg", ".webp", ".gif"] },
        maxFiles: 1,
        multiple: false,
    });

    const inputChangeHandel = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }))
    };

    const addSocial = () => {
        const handel = normalizeSocialHandle(socialInput);
        if (!handel) {
            toast.error("یوزر نیم معتبر نیست")
            return
        };

        const detcated = detectSocialPlatform(socialInput);

        const key = detcated || socialPlatform;

        setForm((prev) => ({
            ...prev,
            socialLinks: { ...prev.socialLinks, [key]: handel }
        }));
        setSocialInput("");
        toast.success(`${PLATFORM_META[key].label} اضافه شد`);
    };

    const removeSocial = (key: SocialKey) => {
        setForm((prev) => ({
            ...prev,
            socialLinks: { ...prev.socialLinks, [key]: null }
        }))
    };

    if (isLoading && !user) return <Loading />;

    const currentImage = privew || user?.image || "images/emptyProfile.png";

    const activeSocials = (Object.keys(form.socialLinks) as SocialKey[]).filter(
        (key) => form.socialLinks[key]
    );

    const submitFormHandel = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData();
            formData.append("fullname", form.fullname.trim());
            formData.append("username", form.username.trim());
            formData.append("email", form.email.trim());
            formData.append("phone", form.phone);
            formData.append("bio", form.bio.trim());
            formData.append("website", form.website.trim());
            formData.append("city", form.city.trim());
            formData.append("socialLinks", JSON.stringify(form.socialLinks));
            if (image) formData.append("image", image);

            await dispatch(updateProfile(formData)).unwrap();
            toast.success("اطلاعات با موفقیت ذخیره شد");
            dispatch(getCurrentUser());
        } catch (err: any) {
            const message = err.message || err?.payload || "خطا در ویرایش اطلاعات"
            toast.error(message);
            return;
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mt-10 flex">
            <div className="w-32.5 h-32.5 relative rounded-full basis-[12%]">
                <img src={currentImage} className='rounded-full w-30 h-30' alt="profile image" />
                <div
                    {...getRootProps()}
                    className="absolute bottom-5 right-1">
                    <label htmlFor="edit-profile">
                        <input {...getInputProps()} />
                        <div className='cursor-pointer w-7 h-7 bg-blueMenu rounded-full flex items-center justify-center'>
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width='16'
                                height='16'
                                fill='currentColor'
                                className='bi bi-pen fill-white'
                                viewBox='0 0 16 16'
                            >
                                <path d='m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z'></path>
                            </svg>
                        </div>
                    </label>
                </div>
            </div>
            <form
                onSubmit={submitFormHandel}
                className='flex flex-wrap gap-x-4 basis-[87%]'>
                <div className="flex gap-y-2 flex-col">
                    <label className='text-[13px] mt-3'>نام و نام خانوادگی</label>
                    <input
                        type="text"
                        name='fullname'
                        value={form.fullname}
                        onChange={inputChangeHandel}
                        className='text-[14px] border border-gray-200 placeholder:text-[13px] pr-2 w-160 h-10 rounded-lg' placeholder='نام و نام خانوادگی' />
                </div>
                <div className="flex gap-y-2 flex-col">
                    <label className='text-[13px] mt-3'>نام کاربری</label>
                    <input
                        type="text"
                        name='username'
                        value={form.username}
                        onChange={inputChangeHandel}
                        className='text-[14px] border border-gray-200 placeholder:text-[13px] pr-2 w-160 h-10 rounded-lg' placeholder='نام کاربری' />
                </div>
                <div className="flex gap-y-2 flex-col">
                    <label className='text-[13px] mt-3'>ایمیل</label>
                    <input
                        type="text"
                        name='email'
                        value={form.email}
                        onChange={inputChangeHandel}
                        className='text-[14px] border border-gray-200 placeholder:text-[13px] pr-2 w-160 h-10 rounded-lg' placeholder='ایمیل' />
                </div>
                <div className="flex gap-y-2 flex-col">
                    <label className='text-[13px] mt-3'>شماره تلفن</label>
                    <input
                        type="text"
                        name='phone'
                        value={form.phone}
                        onChange={inputChangeHandel}
                        className='text-[14px] border border-gray-200 placeholder:text-[13px] pr-2 w-160 h-10 rounded-lg' placeholder='شماره تلفن' />
                </div>
                <div className="flex gap-y-2 flex-col">
                    <label className='text-[13px] mt-3'>بیوگرافی</label>
                    <textarea
                        value={form.bio}
                        name='bio'
                        onChange={inputChangeHandel}
                        className='text-[14px] border border-gray-200 placeholder:text-[13px] pr-2 pt-2 w-324 h-50 rounded-lg' placeholder='بیوگرافی'></textarea>
                </div>
                <div className="flex gap-y-2 flex-col">
                    <label className='text-[13px] mt-3'>وبسایت</label>
                    <input
                        type="text"
                        name='website'
                        value={form.website}
                        onChange={inputChangeHandel}
                        className='text-[14px] border border-gray-200 placeholder:text-[13px] pr-2 w-160 h-10 rounded-lg' placeholder='وبسایت' />
                </div>
                <div className="flex gap-y-2 flex-col">
                    <label className='text-[13px] mt-3'>شهر</label>
                    <input
                        type="text"
                        name='city'
                        value={form.city}
                        onChange={inputChangeHandel}
                        className='text-[14px] border border-gray-200 placeholder:text-[13px] pr-2 w-160 h-10 rounded-lg' placeholder='شهر' />
                </div>
                <div className="w-full flex flex-col gap-3 mt-2">
                    <label className="text-[13px]">شبکه‌های اجتماعی</label>
                    <div className="flex flex-wrap gap-2 items-center">
                        <select
                            value={socialPlatform}
                            onChange={(e) =>
                                setSocialPlatform(e.target.value as SocialKey)
                            }
                            className="h-10 text-[13px] border border-gray-200 rounded-lg px-2"
                        >
                            {(Object.keys(PLATFORM_META) as SocialKey[]).map((k) => (
                                <option key={k} value={k}>
                                    {PLATFORM_META[k].label}
                                </option>
                            ))}
                        </select>
                        <input
                            dir="ltr"
                            value={socialInput}
                            onChange={(e) => setSocialInput(e.target.value)}
                            placeholder={PLATFORM_META[socialPlatform].placeholder}
                            className="text-[14px] border border-gray-200 rounded-lg h-10 px-3 w-64"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    addSocial();
                                }
                            }}
                        />
                        <button
                            type="button"
                            onClick={addSocial}
                            className="bg-blueMenu text-white text-[13px] h-10 px-4 rounded-sm cursor-pointer"
                        >
                            ثبت
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {activeSocials.map((key) => (
                            <div
                                key={key}
                                className="h-10 flex items-center gap-2 px-3 rounded-full border border-gray-200"
                            >
                                <span className="text-[13px]" dir="ltr">
                                    {form.socialLinks[key]}
                                </span>
                                <SocialIcon platform={key} />
                                <button
                                    type="button"
                                    onClick={() => removeSocial(key)}
                                    className="text-gray-400 text-sm cursor-pointer mr-2"
                                >
                                    ×
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex gap-y-2 flex-col w-full"></div>
                <div className="mt-5 flex justify-end w-full ml-12">
                    <button
                        type="submit"
                        disabled={loading}
                        className='cursor-pointer text-[13px] bg-green-1 w-30 h-10 flex items-center justify-center rounded-lg text-white disabled:opacity-50'>
                        {loading ? "درحال ذخیره..." : "اعمال تغییرات"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditProfile;