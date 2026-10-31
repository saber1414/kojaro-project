import { createBanner, fetchBanners } from '@/features/banners/banners';
import { useAppDispatch, useAppSelector } from '@/features/hooks';
import React, { FormEvent, useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';

type CreateBannerProps = {
    closeBtn: () => void;
    onSuccess: () => void;
}

const CreateBanner = ({ onSuccess, closeBtn }: CreateBannerProps) => {
    const dispath = useAppDispatch();
    const { isLoading } = useAppSelector(state => state.banners);

    const [form, setForm] = useState({ title: "", link: "" });
    const [error, setError] = useState({ title: "", link: "", image: "" });
    const [privew, setPrivew] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const inputChangeHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }))
    };

    const onDrop = useCallback((acceptedFile: File[]) => {
        const file = acceptedFile[0];
        if (!file) return null;

        const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/webp", "image/svg+xml", "image/gif"];
        if (!allowedTypes.includes(file.type)) {
            toast.error("فرمت انتخابی صحیح نیست")
            return;
        };
        if (file.size > 5 * 1024 * 1024) {
            toast.error("حجم عکس بشتر از حدا مجاز می باشد");
            return;
        };

        setPrivew((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return URL.createObjectURL(file)
        });
        setImageFile(file)
    }, []);

    const removeFile = () => {
        setPrivew((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return null
        });
        setImageFile(null);
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { "image/:*": [".png", ".jpg", ".jpeg", ".webp", ".svg", ".gif"] },
        multiple: false,
        maxFiles: 1,
    });

    const submitFormHandle = async (e: FormEvent) => {
        e.preventDefault();
        const errorMessage = {
            title: form.title ? "" : "عنوان بنر الزامی می باشد",
            link: form.link ? "" : "لینک بنر الزامی می باشد",
            image: privew?.length ? "" : "عکس بنر الزامی می باشد"
        };
        setError(errorMessage);
        const hasError = Object.values(errorMessage).some((message) => message !== "");
        if (hasError) {
            toast.error("همه فیلدها را پر کنید");
            return
        };
        try {
            const formData = new FormData();
            formData.append("title", form.title);
            formData.append("link", form.link);
            if (imageFile) formData.append("image", imageFile);

            await dispath(createBanner(formData)).unwrap();
            dispath(fetchBanners());
            setForm({ title: "", link: "" });
            setPrivew(null);
            onSuccess();
            toast.success("بنر باموفقیت ایجاد شد");
        } catch (err: any) {
            toast.error(err);
            return;
        }
    };

    return (
        <div onClick={closeBtn} className='fixed top-0 right-0 left-0 bottom-0 bg-overview z-20'>
            <div onClick={(e) => e.stopPropagation()} className="w-[60%] p-4 bg-gray-50 mx-auto my-0 right-0 left-0 absolute top-[10%] flex flex-col">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <span className='block w-1 h-5 absolute right-0 bg-blueMenu'></span>
                        <span className='text-[14px]'>ساخت بنر</span>
                    </div>
                    <button
                        type="button"
                        onClick={closeBtn}
                        className='cursor-pointer'>
                        <svg width="16" height="16" className='fill-gray-300' viewBox="0 0 256 256"><path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path></svg>
                    </button>
                </div>
                <span className='w-full h-px block bg-gray-200 mt-4 mb-4'></span>
                <form onSubmit={submitFormHandle} className='flex justify-between flex-wrap gap-y-4'>
                    <div className="w-[48%] flex flex-col">
                        <label className='text-[14px] mb-4'>نام بنر</label>
                        <input
                            type="text"
                            name='title'
                            value={form.title}
                            onChange={inputChangeHandle}
                            className='bg-white pr-4 h-10 border border-gray-200 text-[14px] placeholder:text-[13px] text-gray-icon rounded-sm'
                            placeholder='نام بنر' />
                        {error && <small className='mt-2 text-red-500'>{error.title}</small>}
                    </div>
                    <div className="w-[48%] flex flex-col">
                        <label className='text-[14px] mb-4'>میسر بنر (link)</label>
                        <input
                            type="text"
                            name='link'
                            value={form.link}
                            onChange={inputChangeHandle}
                            dir='ltr'
                            className='bg-white pl-4 h-10 border border-gray-200 text-[14px] placeholder:text-[13px] text-gray-icon rounded-sm'
                            placeholder='url' />
                        {error && <small className='mt-2 text-red-500'>{error.link}</small>}
                    </div>
                    <div className="w-[48%] flex flex-col">
                        <label className='text-[14px] mb-4'>آیکون بنر</label>
                        <label {...getRootProps()} className='bg-white flex items-center justify-center p-4 rounded-sm h-12 cursor-pointer border-gray-icon border-dashed border'>
                            <span className='text-[13px] text-gray-icon flex gap-x-2'>
                                آیکون را انتخاب کنید
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='16'
                                    height='16'
                                    fill='currentColor'
                                    className='bi bi-upload'
                                    viewBox='0 0 16 16'
                                >
                                    <path d='M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5'></path>
                                    <path d='M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708z'></path>
                                </svg>
                            </span>
                        </label>
                        {error && <small className='mt-2 text-red-500'>{error.image}</small>}
                        <input {...getInputProps()} />
                        <div className="mt-5 mb-4 flex flex-col gap-y-2">
                            <span className='text-[13px]'>فرمت های مجاز: <small className='text-[13px] text-gray-icon'>png jpge jpg webp svg</small></span>
                            <span className='text-[13px]'>حجم مجاز: <small className='text-[13px] text-gray-icon'>حجم بنر نباید بیشتر از 5 مگابایت باشد.</small></span>
                        </div>
                        {
                            privew?.length && (
                                <div className="mt-5 w-full relative">
                                    <img src={privew} alt="article image" className='h-30 w-full object-cover' />
                                    <button
                                        type="button"
                                        onClick={removeFile}
                                        className='cursor-pointer absolute top-3.5 left-1.5 bg-white2 w-10 flex items-center justify-center rounded-sm h-6'>
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width='16'
                                            height='16'
                                            fill='currentColor'
                                            className='bi bi-trash-fill fill-red-500'
                                            viewBox='0 0 16 16'
                                        >
                                            <path d='M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0'></path>
                                        </svg>
                                    </button>
                                </div>
                            )
                        }
                    </div>
                    <div className="w-[48%] flex flex-col"></div>
                    <div className="flex justify-end w-full">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className='w-35 h-10 flex items-center justify-center disabled:opacity-50 disabled:cursor-no-drop cursor-pointer rounded-sm text-white text-[14px] mt-10 bg-blueMenu'>
                            {isLoading ? <div className='dots'></div> : "ذخیره"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateBanner;