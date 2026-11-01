import React, { FormEvent, useCallback, useMemo, useState } from 'react';
import DatePicker from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import toast from 'react-hot-toast';
import { useDropzone } from 'react-dropzone';
import { useAppDispatch, useAppSelector } from '@/features/hooks';
import { createAds, fetchAds } from '@/features/advertisement/advertisement';

type CreateAdvertisementProps = {
    close: () => void
};

type PositionType = "home" | "sidebar" | "header" | "footer" | "article" | "custom";

const statusPosition: { value: PositionType, label: string }[] = [
    { value: "home", label: "خانه" },
    { value: "sidebar", label: "نوار کناری" },
    { value: "header", label: "سربرگ" },
    { value: "footer", label: "پاورقی" },
    { value: "article", label: "مقاله" },
    { value: "custom", label: "سفارشی" },
];

const CreateAdvertisement = ({ close }: CreateAdvertisementProps) => {
    const disptch = useAppDispatch();
    const { isLoading } = useAppSelector(state => state.advertisement);

    const [isOpenCategory, setIsOpenCategory] = useState<boolean>(false);
    const [form, setForm] = useState({
        title: "",
        link: "",
        alt: "",
        advertiserName: "",
        order: "",
        isActive: true,
        startDate: "",
        endDate: ""
    });
    const [error, setError] = useState({
        title: "",
        link: "",
        alt: "",
        advertiserName: "",
        order: "",
        image: "",
        startDate: "",
        endDate: ""
    });
    const [errorImageType, setErrorImageType] = useState<string | null>(null);
    const [position, setPosition] = useState<PositionType>("home");
    const [search, setSearch] = useState<string>("");
    const [preview, setPrivew] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const filteredAdsPosition = useMemo(() => {
        const q = search.toLowerCase();

        if (!q) return statusPosition;

        return statusPosition.filter((position) =>
            position.value.toLowerCase().includes(q) ||
            position.label.toLowerCase().includes(q)
        )
    }, [search, statusPosition]);

    const handleSelectStatus = (status: PositionType) => {
        setPosition(status);
        setSearch("");
        setIsOpenCategory(false)
    };

    const inputChangeHandel = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }))
    };

    const onDrop = useCallback((acceptedFile: File[]) => {
        const file = acceptedFile[0];

        if (!file) return null;

        const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/webp", "image/gif", "image/svg+xml"];
        if (!allowedTypes.includes(file.type)) {
            setErrorImageType("فرمت انتخابی صحیح نمی باشد");
            return
        };
        if (file?.size > 5 * 1024 * 1024) {
            setErrorImageType("حجم عکس بیش از حد مجاز می باشد");
            return
        };
        setPrivew((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return URL.createObjectURL(file)
        });
        setImageFile(file);
        setErrorImageType("");
    }, []);

    const removeImage = () => {
        setPrivew((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return null
        });
        setImageFile(null);
        setErrorImageType("");
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"] },
        multiple: false,
        maxFiles: 1
    });

    const submitFormHandel = async (e: FormEvent) => {
        e.preventDefault();

        const errorMessage = {
            title: form.title ? "" : "عنوان تبلیغ الزامی می باشد",
            link: form.link ? "" : "لینک تبلیغ الزامی می باشد",
            alt: form.alt ? "" : "متن الزامی می باشد",
            advertiserName: form.advertiserName ? "" : "نام شرکت مورد نظر الزامی می باشد",
            order: form.order ? "" : "ردیف تبلیغ الزامی می باشد",
            image: preview?.length ? "" : "عکس محصول الزامی می باشد",
            startDate: form.startDate ? "" : "تاریخ شروع الزامی می باشد",
            endDate: form.endDate ? "" : "تاریخ پایان الزامی می باشد"
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
            formData.append("order", form.order);
            formData.append("alt", form.alt);
            formData.append("advertiserName", form.advertiserName);
            formData.append("isActive", String(form.isActive));
            formData.append("startDate", form.startDate);
            formData.append("endDate", form.endDate);
            formData.append("position", position);
            if (imageFile) formData.append("image", imageFile);

            await disptch(createAds(formData)).unwrap();
            disptch(fetchAds({}));
            toast.success("تبلیغ با موفقیت ایجاد شد");
            close();
            setPrivew(null)
        } catch (err: any) {
            toast.error(err);
            return
        }
    };

    return (
        <div onClick={close} className='fixed top-0 right-0 left-0 bottom-0 bg-overview z-20'>
            <div onClick={(e) => e.stopPropagation()} className="w-[60%] p-4 bg-gray-50 mx-auto my-0 right-0 left-0 absolute top-[1%] flex flex-col">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <span className='block w-1 h-5 absolute right-0 bg-blueMenu'></span>
                        <span className='text-[14px]'>ایجاد تبلیغ</span>
                    </div>
                    <button
                        type="button"
                        onClick={close}
                        className='cursor-pointer'>
                        <svg width="16" height="16" className='fill-gray-300' viewBox="0 0 256 256"><path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path></svg>
                    </button>
                </div>
                <span className='w-full h-px block bg-gray-200 mt-4 mb-4'></span>
                <div className="overflow-y-auto max-h-[80vh]  scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-500">
                    <form onSubmit={submitFormHandel} className='flex justify-between flex-wrap gap-y-4'>
                        <div className="w-[48%] flex flex-col">
                            <label className='text-[14px] mb-4'>عنوان</label>
                            <input
                                type="text"
                                name='title'
                                value={form.title}
                                onChange={inputChangeHandel}
                                className='bg-white pr-4 h-10 border border-gray-200 text-[14px] placeholder:text-[13px] text-gray-icon rounded-sm'
                                placeholder='عنوان' />
                            {error && <small className='text-red-400 mt-2'>{error.title}</small>}
                        </div>
                        <div className="w-[48%] flex flex-col">
                            <label className='text-[14px] mb-4'>لینک تبلیغ</label>
                            <input
                                type="text"
                                name='link'
                                value={form.link}
                                onChange={inputChangeHandel}
                                className='bg-white pr-4 h-10 border border-gray-200 text-[14px] placeholder:text-[13px] text-gray-icon rounded-sm'
                                placeholder='لینک تبلیغ' />
                            {error && <small className='text-red-400 mt-2'>{error.link}</small>}
                        </div>
                        <div className="w-[48%] flex flex-col">
                            <label className='text-[14px] mb-4'>متن تبلیغ</label>
                            <input
                                type="text"
                                name='alt'
                                value={form.alt}
                                onChange={inputChangeHandel}
                                className='bg-white pr-4 h-10 border border-gray-200 text-[14px] placeholder:text-[13px] text-gray-icon rounded-sm'
                                placeholder='متن تبلیغ' />
                            {error && <small className='text-red-400 mt-2'>{error.alt}</small>}
                        </div>
                        <div className="w-[48%] flex flex-col">
                            <label className='text-[14px] mb-4'>نام شرکت</label>
                            <input
                                type="text"
                                name='advertiserName'
                                value={form.advertiserName}
                                onChange={inputChangeHandel}
                                className='bg-white pr-4 h-10 border border-gray-200 text-[14px] placeholder:text-[13px] text-gray-icon rounded-sm'
                                placeholder='نام شرکت' />
                            {error && <small className='text-red-400 mt-2'>{error.advertiserName}</small>}
                        </div>
                        <div className="w-[48%] flex flex-col">
                            <label className='text-[14px] mb-4'>تاریخ شروع</label>
                            <DatePicker
                                value={form.startDate}
                                onChange={(date) => setForm((prev) => ({ ...prev, startDate: date?.toDate().toISOString() || "" }))}
                                calendar={persian}
                                locale={persian_fa}
                                calendarPosition="bottom-right"
                                format="YYYY/MM/DD"
                                inputClass="bg-white pr-4 h-10 w-full border border-gray-200 text-[14px] text-gray-icon rounded-sm outline-none focus:border-blueMenu transition-colors"
                                placeholder="تاریخ شروع"
                            />
                            {error && <small className='text-red-400 mt-2'>{error.startDate}</small>}
                        </div>
                        <div className="w-[48%] flex flex-col">
                            <label className='text-[14px] mb-4'>تاریخ پایان</label>
                            <DatePicker
                                value={form.endDate}
                                onChange={(date) => setForm((prev) => ({ ...prev, endDate: date?.toDate().toISOString() || "" }))}
                                calendar={persian}
                                locale={persian_fa}
                                calendarPosition='bottom-rigth'
                                format="YYYY/MM/DD"
                                inputClass='bg-white pr-4 h-10 w-full border border-gray-200 text-[14px] text-gray-icon rounded-sm outline-none focus:border-blueMenu transition-colors'
                                placeholder='تاریخ پایان'
                            />
                            {error && <small className='text-red-400 mt-2'>{error.endDate}</small>}
                        </div>
                        <div className="w-[48%] flex flex-col">
                            <label className='text-[14px] mb-4'>ردیف تبلیغ</label>
                            <input
                                type="text"
                                name='order'
                                value={form.order}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    if (value === '' || /^\d+$/.test(value)) {
                                        setForm((prev) => ({ ...prev, order: value }))
                                    }
                                }}
                                inputMode="numeric"
                                className='bg-white pr-4 h-10 border border-gray-200 text-[14px] placeholder:text-[13px] text-gray-icon rounded-sm'
                                placeholder='ردیف تبلیغ' />
                            {error && <small className='text-red-400 mt-2'>{error.order}</small>}
                        </div>
                        <div className="w-[48%] flex flex-col">
                            <label className='text-[14px] mb-4'>محل قرارگیری تبلیغ</label>
                            <button
                                type="button"
                                className='bg-white rounded-sm px-4 border h-10 border-gray-200 cursor-pointer relative text-start'
                                onClick={() => setIsOpenCategory(!isOpenCategory)}
                            >
                                <div className="flex items-center justify-between">
                                    <span className={`text-start block truncate text-[13px] ${position ? "text-dark" : "text-gray-400"}`}>
                                        {statusPosition.find((status) => status.value === position)?.label || "یک وضعیت را انتخاب کنید"}
                                    </span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className={`size-4 transition-transform duration-200 ${isOpenCategory ? "rotate-180" : ""}`}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </div>
                                <div className={`${isOpenCategory ? "block opacity-100" : "hidden opacity-0"} bg-white border z-20 border-gray-200 rounded-sm p-2 absolute right-0 left-0 top-[calc(100%+4px)] shadow-lg max-h-80 overflow-hidden`}>
                                    <div className="flex items-center justify-between border border-gray-200 rounded-sm px-4 bg-gray-100">
                                        <input
                                            type="text"
                                            onClick={(e) => e.stopPropagation()}
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className='h-10 placeholder:text-[13px] bg-transparent outline-none text-[14px]' placeholder='جستوجوی وضعیت' />
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
                                    <div className="mt-2 border border-gray-200 p-1 text-[14px] max-h-48 overflow-y-auto">
                                        {
                                            filteredAdsPosition.length ? (
                                                filteredAdsPosition.map((status) => {
                                                    const isSelected = position === status.value
                                                    return (
                                                        <div
                                                            key={status.value}
                                                            onClick={() => handleSelectStatus(status.value)}
                                                            className={`
                                                        mt-2 border p-1 text-[14px] flex items-center justify-between rounded-sm cursor-pointer transition-all duration-200
                                                        ${isSelected ? "border-green-400 bg-green-50" : "border-gray-200 bg-gray-50"}
                                                        `}>
                                                            <p className={`h-8 flex items-center pr-2 rounded-sm text-[13px] ${isSelected ? 'text-green-600 font-IRANYekan-Bold' : 'text-gray-700'}`}>
                                                                {status.label}
                                                            </p>
                                                            {isSelected && (
                                                                <svg
                                                                    xmlns='http://www.w3.org/2000/svg'
                                                                    width='16'
                                                                    height='16'
                                                                    fill='currentColor'
                                                                    className='bi bi-check-lg fill-green-500'
                                                                    viewBox='0 0 16 16'
                                                                >
                                                                    <path d='M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z'></path>
                                                                </svg>
                                                            )}
                                                        </div>
                                                    )
                                                })
                                            ) : (
                                                <div className="border border-gray-100 h-30 mt-5 rounded-sm flex flex-col gap-y-4 items-center justify-center">
                                                    <img className="w-15" alt="" src="/images/emptyImage01.png" />
                                                    <p className="text-gray-icon text-[14px]">وضعیتی یافت نشد</p>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </button>
                        </div>
                        <div className="w-[48%] flex flex-col">
                            <label className='text-[14px] mb-4'>عکس بنر</label>
                            <label {...getRootProps()} htmlFor="cover-article" className='bg-white flex items-center justify-center p-4 rounded-sm h-10 cursor-pointer border-gray-icon border-dashed border'>
                                <span className='text-[13px] text-gray-icon flex gap-x-2'>
                                    عکس را انتخاب کنید
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
                            {errorImageType && <small className='text-red-400 mt-2'>{errorImageType}</small>}
                            {error && <small className='text-red-400 mt-2'>{error.image}</small>}
                            <input {...getInputProps()} />
                            <div className="mt-5 mb-4 flex flex-col gap-y-2">
                                <span className='text-[13px]'>فرمت های مجاز: <small className='text-[13px] text-gray-icon'>png jpge jpg webp svg</small></span>
                                <span className='text-[13px]'>حجم مجاز: <small className='text-[13px] text-gray-icon'>حجم عکس نباید بیشتر از 5 مگابایت باشد.</small></span>
                            </div>
                            {
                                preview && (
                                    <div className="mt-5 w-full relative">
                                        <img src={preview} alt="article image" className='h-30 w-full object-cover' />
                                        <button
                                            onClick={removeImage}
                                            type="button"
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
                                className='w-35 h-10 flex items-center justify-center cursor-pointer rounded-sm text-white text-[14px] mt-10 bg-blueMenu disabled:opacity-50 disabled:cursor-no-drop'>
                                {isLoading ? <div className='dots'></div> : "ذخیره"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateAdvertisement;