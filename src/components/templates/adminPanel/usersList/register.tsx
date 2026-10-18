"use client"
import { useAppDispatch, useAppSelector } from '@/features/hooks';
import { clearUsersError, clearUsersSuccess, createUserByAdmin } from '@/features/users/users';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

type Password = "password" | "text";
type Role = 'user' | 'moderator' | 'author';
type RegisterProps = {
    onClose: () => void;
}

const ROLES: { value: Role, label: string }[] = [
    { value: "user", label: "کاربر" },
    { value: "author", label: "نویسنده" },
    { value: "moderator", label: "جانشین مدیر" }
];

const Register = ({ onClose }: RegisterProps) => {
    const dispatch = useAppDispatch();
    const { isLoading, successMessage } = useAppSelector(state => state.users);

    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
    const [type, setType] = useState<Password>("password");

    const [form, setForm] = useState({
        email: "",
        password: "",
        fullname: "",
        username: "",
        phone: "",
        role: "user" as Role,
    });

    const [error, setError] = useState({
        email: "",
        password: "",
        fullname: "",
        username: "",
        phone: "",
        role: "",
    });

    const [roleSearch, setRoleSearch] = useState<string>("");

    const filtredRoles = ROLES.filter((role) => role.label.toLowerCase().includes(roleSearch.trim().toLowerCase()));

    const roleLabel = ROLES.find((role) => role.value === form.role)?.label || "نقش را انتخاب کنید";

    const handleChangeType = () => {
        if (type === "password") {
            setType("text")
        } else if (type === "text") {
            setType("password")
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }))
    };

    const onSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(clearUsersError());
        dispatch(clearUsersSuccess());

        const newError = {
            fullname: form.fullname ? "" : "نام و نام خانوادگی الزامی می باشد",
            username: form.username ? "" : "نام کاربری الزامی می باشد",
            email: form.email ? "" : "ایمیل الزامی می باشد",
            phone: form.phone ? "" : "شماره تلفن الزامی می باشد",
            password: form.password ? "" : "رمز عبور الزامی می باشد",
            role: form.role ? "" : "نقش کاربری الزامی می باشد"
        };

        setError(newError);
        const hasError = Object.values(newError).some((message) => message !== "");
        if (hasError) {
            toast.error("همه فیلدها را پر کنید")
            return
        };
        try {
            await dispatch(
                createUserByAdmin({
                    fullname: form.fullname.trim(),
                    username: form.username.trim(),
                    email: form.email.trim(),
                    phone: form.phone.trim(),
                    role: form.role,
                    password: form.password
                })
            ).unwrap();
            toast.success("ثبت نام موفق بود");
            setForm({ fullname: "", username: "", email: "", phone: "", role: "user", password: "" })
        } catch (err: any) {
            toast.error("خطا در ثبت نام کاربر")
            return
        }
    };

    return (
        <div onClick={onClose} className='fixed bg-overview z-20 top-0 right-0 left-0 bottom-0'>
            <div onClick={(e) => e.stopPropagation()} className="w-[60%] p-4 bg-gray-50 mx-auto my-0 right-0 left-0 absolute top-[10%] flex flex-col">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <span className='block w-1 h-5 absolute right-0 bg-blueMenu'></span>
                        <span className='text-[14px]'>ثبت نام</span>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className='cursor-pointer'>
                        <svg width="16" height="16" className='fill-gray-300' viewBox="0 0 256 256"><path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path></svg>
                    </button>
                </div>
                <span className='w-full h-px block bg-gray-200 mt-4 mb-4'></span>
                <form onSubmit={onSubmit} className='flex justify-between flex-wrap gap-y-4'>
                    <div className="w-[48%] flex flex-col">
                        <label className='text-[14px] mb-4'>نام و نام خانوادگی</label>
                        <input
                            type="text"
                            value={form.fullname}
                            onChange={onChange}
                            name='fullname'
                            className='bg-white pr-4 h-10 border border-gray-200 text-[14px] placeholder:text-[13px] text-gray-icon rounded-sm' placeholder='نام و نام خانوادگی' />
                        {error && <small className='mt-2 text-red-500'>{error.fullname}</small>}
                    </div>
                    <div className="w-[48%] flex flex-col">
                        <label className='text-[14px] mb-4'>نام کاربری</label>
                        <input
                            type="text"
                            value={form.username}
                            onChange={onChange}
                            name='username'
                            className='bg-white pr-4 h-10 border border-gray-200 text-[14px] placeholder:text-[13px] text-gray-icon rounded-sm' placeholder='نام کاربری' />
                        {error && <small className='mt-2 text-red-500'>{error.username}</small>}
                    </div>
                    <div className="w-[48%] flex flex-col">
                        <label className='text-[14px] mb-4'>ایمیل</label>
                        <input
                            type="text"
                            value={form.email}
                            onChange={onChange}
                            name='email'
                            dir='ltr'
                            className='bg-white pl-4 h-10 border border-gray-200 text-[14px] placeholder:text-[13px] text-gray-icon rounded-sm' placeholder='email' />
                        {error && <small className='mt-2 text-red-500'>{error.email}</small>}
                    </div>
                    <div className="w-[48%] flex flex-col">
                        <label className='text-[14px] mb-4'>شماره تلفن</label>
                        <input
                            type="text"
                            value={form.phone}
                            onChange={onChange}
                            name='phone'
                            dir='ltr'
                            className='bg-white pl-4 h-10 border border-gray-200 text-[14px] placeholder:text-[13px] text-gray-icon rounded-sm' placeholder='+98' />
                        {error && <small className='mt-2 text-red-500'>{error.phone}</small>}
                    </div>
                    <div className="w-[48%] flex flex-col">
                        <label className='text-[14px] mb-4'>نقش</label>
                        <button
                            type="button"
                            className='bg-white rounded-sm px-4 border h-10 border-gray-200 cursor-pointer relative text-start'
                            onClick={() => setIsOpenMenu(!isOpenMenu)}
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-start block truncate text-[13px]">{roleLabel}</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-4"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </div>
                            <div className={`${isOpenMenu ? "block opacity-100" : "hidden opacity-0"} bg-white border z-20 border-gray-200 rounded-sm p-2 absolute right-0 left-0 top-[calc(100%+4px)] shadow-lg max-h-80 overflow-hidden`}>
                                <div className="flex items-center justify-between border border-gray-200 rounded-sm px-4 bg-gray-100">
                                    <input
                                        type="text"
                                        value={roleSearch}
                                        onChange={(e) => setRoleSearch(e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                        className='h-10 placeholder:text-[13px] w-full outline-none text-[14px] bg-transparent' placeholder='جستوجوی نقش ها' />
                                    <div>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="size-5 text-gray-400"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                {
                                    filtredRoles.length ? (
                                        filtredRoles.map((role) => (
                                            <div
                                                key={role.value}
                                                onClick={() => {
                                                    setForm((prev) => ({ ...prev, role: role.value }));
                                                    setError((prev) => ({ ...prev, role: "" }));
                                                    setIsOpenMenu(false);
                                                }}
                                                className="mt-2 border border-gray-200 p-1 text-[14px] max-h-48 overflow-y-auto">
                                                <p className={`hover:bg-gray-200 h-8 transition-all ease-in pr-2 flex items-center rounded-sm cursor-pointer text-[13px] ${form.role === role.value ? "bg-gray-100 font-bold" : ""}`}>{role.label}</p>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="border border-gray-100 h-30 mt-5 rounded-sm flex flex-col gap-y-4 items-center justify-center">
                                            <img src="/images/emptyImage01.png" className='w-15' alt="" />
                                            <p className='text-gray-icon text-[14px]'>نقش مورد نظر یافت نشد</p>
                                        </div>
                                    )
                                }
                            </div>
                        </button>
                        {error && <small className='mt-2 text-red-500'>{error.role}</small>}
                    </div>
                    <div className="w-[48%] flex flex-col">
                        <label className='text-[14px] mb-4'>رمز عبور</label>
                        <div className="flex items-center bg-white h-10 w-full border border-gray-200 rounded-sm">
                            <input
                                name="password"
                                value={form.password}
                                onChange={onChange}
                                type={type}
                                className=' pr-4 h-10 w-full text-[14px] placeholder:text-[13px] text-gray-icon' placeholder='رمز عبور' />
                            <button
                                type="button"
                                onClick={handleChangeType}
                                className='cursor-pointer ml-4'>
                                {
                                    type === "password" ? (
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='16'
                                            height='16'
                                            fill='currentColor'
                                            className='bi bi-eye-slash-fill fill-gray-icon'
                                            viewBox='0 0 16 16'
                                        >
                                            <path d='m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z'></path>
                                            <path d='M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z'></path>
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='16'
                                            height='16'
                                            fill='currentColor'
                                            className='bi bi-eye-fill fill-gray-icon'
                                            viewBox='0 0 16 16'
                                        >
                                            <path d='M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0'></path>
                                            <path d='M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7'></path>
                                        </svg>
                                    )
                                }
                            </button>
                        </div>
                        {error && <small className='mt-2 text-red-500'>{error.password}</small>}
                    </div>
                    <div className="w-[48%] flex flex-col"></div>
                    <div className="flex justify-end w-full">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className='w-35 h-10 flex items-center justify-center cursor-pointer rounded-sm text-white text-[14px] mt-10 bg-blueMenu disabled:opacity-50'>
                            {
                                isLoading ? <div className='dots'></div> : "ثبت نام"
                            }
                        </button>
                    </div>
                </form >
            </div >
        </div >
    )
}

export default Register;