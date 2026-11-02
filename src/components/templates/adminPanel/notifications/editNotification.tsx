import { useAppDispatch, useAppSelector } from "@/features/hooks";
import { editNotification, fetchNotifications } from "@/features/notifications/notifications";
import { FormEvent, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

type EditNotificationProps = {
    _id: string;
    close: () => void;
};

const EditNotification = ({ close, _id }: EditNotificationProps) => {
    const dispatch = useAppDispatch();
    const { isUpdated, notifications } = useAppSelector(state => state.notifications);

    const [form, setForm] = useState({ title: "", description: "" });
    const [error, setError] = useState({ title: "", description: "" });

    const notification = useMemo(() => {
        return notifications.find((notification) => notification._id === _id);
    }, [notifications, _id]);

    useEffect(() => {
        if (notification) {
            setForm({
                title: notification.title,
                description: notification.description
            })
        }
    }, [notification]);

    const inputChangeHandel = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }))
    };

    const submitFormHandel = async (e: FormEvent) => {
        e.preventDefault();
        const errorMessage = {
            title: form.title ? "" : "عنوان الزامی می باشد",
            description: form.description ? "" : "توضیحات الزامی می باشد"
        };
        setError(errorMessage);
        const hasError = Object.values(errorMessage).some((message) => message !== "");
        if (hasError) {
            toast.error("همه فیلدها را پرکنید");
            return
        };
        try {
            await dispatch(editNotification({ _id, data: form })).unwrap();
            dispatch(fetchNotifications({}));
            close();
            setForm({ title: "", description: "" });
            toast.success("اعلان باموفقیت ایجاد شد")
        } catch (err: any) {
            toast.error(err);
            return;
        }
    };

    return (
        <div onClick={close} className='fixed top-0 right-0 left-0 bottom-0 bg-overview z-20'>
            <div onClick={(e) => e.stopPropagation()} className="w-[60%] p-4 bg-gray-50 mx-auto my-0 right-0 left-0 absolute top-[10%] flex flex-col">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <span className='block w-1 h-5 absolute right-0 bg-fuchsia-500'></span>
                        <span className='text-[14px]'>ویرایش اعلان</span>
                    </div>
                    <button
                        type="button"
                        onClick={close}
                        className='cursor-pointer'>
                        <svg width="16" height="16" className='fill-gray-300' viewBox="0 0 256 256"><path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path></svg>
                    </button>
                </div>
                <span className='w-full h-px block bg-gray-200 mt-4 mb-4'></span>
                <form onSubmit={submitFormHandel} className='flex justify-between flex-wrap gap-y-4'>
                    <div className="w-[50%] flex flex-col">
                        <label className='text-[14px] mb-4'>عنوان</label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={inputChangeHandel}
                            className='bg-white pr-4 h-10 border border-gray-200 text-[14px] placeholder:text-[13px] text-gray-icon rounded-sm'
                            placeholder='عنوان' />
                        {error && <small className="mt-1 text-red-400">{error.title}</small>}
                    </div>
                    <div className="w-full flex flex-col">
                        <label className='text-[14px] mb-4'>توضیحات</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={inputChangeHandel}
                            className='bg-white pr-4 h-50 border border-gray-200 text-[14px] placeholder:text-[13px] text-gray-icon rounded-sm pt-2'
                            placeholder='توضیحات'></textarea>
                        {error && <small className="mt-1 text-red-400">{error.description}</small>}
                    </div>
                    <div className="w-[48%] flex flex-col"></div>
                    <div className="flex justify-end w-full">
                        <button
                            type="submit"
                            disabled={isUpdated}
                            className='w-35 h-10 flex items-center justify-center cursor-pointer rounded-sm text-white text-[14px] mt-10 bg-fuchsia-500 disabled:opacity-50 disabled:cursor-no-drop'>
                            {isUpdated ? <div className="dots"></div> : "ویرایش"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditNotification;