import { editArticleCategories, fetchCategories } from "@/features/articleCategories/articleCategories";
import { useAppDispatch, useAppSelector } from "@/features/hooks";
import React, { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

type EditCategoryProps = {
    _id: string | null;
    onSuccess: () => void;
    onClose: () => void;
}

const EditCategory = ({ onClose, onSuccess, _id }: EditCategoryProps) => {
    const dispatch = useAppDispatch();
    const { articleCategories, isUpdated } = useAppSelector(state => state.articleCategories);

    const [form, setForm] = useState({
        name: "",
        slug: ""
    });

    const [error, setError] = useState({
        name: "",
        slug: ""
    });

    const category = useMemo(() => {
        return articleCategories.find((category) => category._id === _id)
    }, [articleCategories, _id]);

    const inputChangeHandel = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }))
    };

    useEffect(() => {
        if (category) {
            setForm({
                name: category.name!,
                slug: category.slug!
            })
        }
    }, [category]);

    const submitFormHandel = async (e: React.FormEvent) => {
        e.preventDefault();

        const newError = {
            name: form.name ? "" : "نام دسته بندی الزامی می باشد",
            slug: form.slug ? "" : "مسیر دسته بندی الزامی می باشد",
        };
        setError(newError);
        const hasError = Object.values(newError).some((message) => message !== "");
        if (hasError) {
            toast.error("فیلدها را پر کنید")
            return
        };
        try {
            await dispatch(editArticleCategories({ _id: category?._id!, data: form })).unwrap();
            dispatch(fetchCategories({}));
            toast.success("دسته بندی باموفقیت ویرایش شد")
            onSuccess();
            onClose()
        } catch (err: any) {
            toast.error(err)
            return
        }
    };

    return (
        <div onClick={onClose} className='fixed bg-overview top-0 right-0 left-0 bottom-0 z-50'>
            <div onClick={(e) => e.stopPropagation()} className="w-[50%] rounded-sm absolute top-[30%] right-0 left-0 mx-auto my-0 bg-white flex flex-col">
                <div className="flex items-center justify-between px-4 mt-2">
                    <h3 className="text-[14px] font-IRANYekan-Bold">ویرایش دسته بندی</h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className='cursor-pointer'>
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='18'
                            height='18'
                            fill='currentColor'
                            className='bi bi-x'
                            viewBox='0 0 16 16'
                        >
                            <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708'></path>
                        </svg>
                    </button>
                </div>
                <span className='block h-px w-full my-2 bg-gray-100'></span>
                <form onSubmit={submitFormHandel} className='my-2 px-4'>
                    <div className="flex items-center justify-between">
                        <div className="flex flex-col w-[48%]">
                            <label className='text-[13px] mb-2'>نام دسته بندی</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={inputChangeHandel}
                                placeholder='نام دسته بندی'
                                className='w-full h-10 bg-gray-50 rounded-sm text-[13px] text-gray-icon placeholder:text-[13px] pr-2 border border-gray-100' />
                            {error && <small className='mt-2 text-red-500'>{error.name}</small>}
                        </div>
                        <div className="flex flex-col w-[48%]">
                            <label className='text-[13px] mb-2'>مسیر دسته بندی</label>
                            <input
                                dir='ltr'
                                name="slug"
                                value={form.slug}
                                onChange={inputChangeHandel}
                                type="text"
                                placeholder='/category'
                                className='w-full h-10 bg-gray-50 rounded-sm text-[13px] text-gray-icon placeholder:text-[13px] pl-2 border border-gray-100' />
                            {error && <small className='mt-2 text-red-500'>{error.slug}</small>}
                        </div>
                    </div>
                    <div className="flex justify-end mt-5">
                        <button
                            type="submit"
                            disabled={isUpdated}
                            className='bg-blueMenu w-30 h-8 rounded-sm text-[13px] text-white flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-no-drop'>
                            {
                                isUpdated ? <div className="dots"></div> : "ویرایش"
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditCategory;