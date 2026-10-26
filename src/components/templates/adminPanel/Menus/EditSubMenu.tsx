import { useAppDispatch, useAppSelector } from '@/features/hooks';
import { editMenu, fetchMenus } from '@/features/menus/menus';
import React, { FormEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useDropzone } from "react-dropzone";
import toast from 'react-hot-toast';

type EditSubMenuProps = {
    _id: string;
    closeBtn: () => void;
    onSuccess: () => void;
};

type SubMenuNode = {
    _id: string;
    name: string;
    slug: string;
    icon?: string;
    parentId?: string;
    children?: SubMenuNode[],
    createdAt?: string
};

const findSubMenuById = (nodes: SubMenuNode[] | undefined, _id: string): SubMenuNode | null => {
    if (!nodes?.length) return null;

    for (const node of nodes) {
        if (node._id === _id) return node;
        const found = findSubMenuById(node.children, _id);
        if (found) return found;
    };

    return null;
};

const flattenSubMenus = (nodes: SubMenuNode[] | undefined): SubMenuNode[] => {
    if (!nodes?.length) return [];
    let flatList: SubMenuNode[] = [];

    for (const node of nodes) {
        flatList.push(node);
        if (node.children?.length) {
            flatList.push(...flattenSubMenus(node.children))
        }
    };

    return flatList;
};

const getDescendantIds = (node: SubMenuNode): string[] => {
    const ids: string[] = [node._id];
    node.children?.forEach((chide) => {
        ids.push(...getDescendantIds(chide))
    });

    return ids;
};

const EditSubMenu = ({ closeBtn, _id, onSuccess }: EditSubMenuProps) => {
    const dispatch = useAppDispatch();
    const { isUpdated, isLoading, menus } = useAppSelector(state => state.menus);

    const [form, setForm] = useState({
        name: "",
        slug: "",
        parent: ""
    });
    const [error, setError] = useState({
        name: "",
        slug: ""
    });
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
    const [iconPreview, setIconPreview] = useState<string | null>(null);
    const [iconFile, setIconFile] = useState<File | null>(null);
    const [selectedParent, setSelectedParent] = useState<{ _id: string, name: string } | null>(null);
    const [search, setSearch] = useState<string>("");

    const subMenuItem = useMemo(() => {
        return findSubMenuById(menus as any, _id)
    }, [menus, _id])

    useEffect(() => {
        if (subMenuItem) {
            setForm({
                name: subMenuItem.name,
                slug: subMenuItem.slug,
                parent: subMenuItem.parentId ?? ""
            });
            setIconPreview(subMenuItem.icon || null);
            if (subMenuItem.parentId) {
                const parentName = findSubMenuById(menus as SubMenuNode[], subMenuItem.parentId);
                setSelectedParent(parentName ? { _id: parentName._id, name: parentName.name } : null)
            } else {
                setSelectedParent(null)
            }
        }
    }, [subMenuItem,menus])

    const inputChangeHandel = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (!file) return null;

        const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/webp", "image/gif", "image/svg+xml"];
        if (!allowedTypes.includes(file.type)) {
            toast.error("فرمت آیکون معتبر نیست");
            return
        };
        if (file.size > 5 * 1024 * 1024) {
            toast.error("حجم فایل بیش از حد مجاز می باشد");
            return
        };

        setIconPreview((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return URL.createObjectURL(file)
        })
        setIconFile(file)
    }, []);

    const removeIcon = () => {
        setIconPreview((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return null;
        });
        setIconFile(null)
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"] },
        multiple: false,
        maxFiles: 1
    });

    const availableParents = useMemo(() => {
        const all = flattenSubMenus(menus as SubMenuNode[]);
        const current = findSubMenuById(menus as SubMenuNode[], _id);
        const exclude = new Set(current ? getDescendantIds(current) : [_id]);

        return all.filter((menu) => !exclude.has(menu._id))
    }, [menus, _id]);

    const filteredParents = useMemo(() => {
        const q = search.toLowerCase();

        if (!q) return availableParents;

        return availableParents.filter((menu) =>
            menu.name.toLowerCase().includes(q) ||
            menu.slug.toLowerCase().includes(q)
        );
    }, [availableParents, search]);

    const handleSelectParent = (menu: { _id: string, name: string }) => {
        if (selectedParent?._id === menu._id) {
            setSelectedParent(null);
            setForm((prev) => ({ ...prev, parent: "" }))
        } else {
            setSelectedParent(menu);
            setForm((prev) => ({ ...prev, parent: menu._id }))
        };
        setSearch("");
        setIsOpenMenu(false);
    };

    const submitFormHandel = async(e:FormEvent) => {
        e.preventDefault();

        const errorMessage = {
            name: form.name ? "" : "نام منو الزامی می باشد",
            slug: form.slug ? "" : "مسیر منو الزامی می باشد",
        };
        setError(errorMessage);
        const hasError = Object.values(errorMessage).some((message) => message !== "");
        if(hasError) {
            toast.error("فیلدها را پر کنید");
            return
        };
        try {
            const formData = new FormData();
            formData.append("name", form.name);
            formData.append("slug", form.slug);
            if(selectedParent) formData.append("parentId", selectedParent._id);
            if(iconFile) formData.append("icon", iconFile)
            await dispatch(editMenu({ _id, formData })).unwrap();
            dispatch(fetchMenus());
            toast.success("منو باموفقیت ویرایش شد")
            setSelectedParent(null);
            onSuccess();
        } catch(err: any) {
            toast.error(err);
            return
        }
    }

    return (
        <>
            <div onClick={closeBtn} className="fixed bg-overview z-60 top-0 right-0 left-0 bottom-0">
                <div onClick={(e) => e.stopPropagation()} className="w-[60%] p-4 bg-gray-50 mx-auto my-0 right-0 left-0 absolute top-[10%] flex flex-col">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <span className='block w-1 h-5 absolute right-0 bg-fuchsia-500'></span>
                            <span className='text-[14px]'>ویرایش زیر منو</span>
                        </div>
                        <button
                            type="button"
                            onClick={closeBtn}
                            className='cursor-pointer'>
                            <svg width="16" height="16" className='fill-gray-300' viewBox="0 0 256 256"><path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path></svg>
                        </button>
                    </div>
                    <span className='w-full h-px block bg-gray-200 mt-4 mb-4'></span>
                    <form 
                    onSubmit={submitFormHandel}
                    className='flex justify-between flex-wrap gap-y-4'>
                        <div className="w-[48%] flex flex-col">
                            <label className='text-[14px] mb-4'>نام منو</label>
                            <input
                                type="text"
                                name='name'
                                value={form.name}
                                onChange={inputChangeHandel}
                                className='bg-white pr-4 h-10 border border-gray-200 text-[14px] placeholder:text-[13px] text-gray-icon rounded-sm'
                                placeholder='نام منو' />
                        </div>
                        <div className="w-[48%] flex flex-col">
                            <label className='text-[14px] mb-4'>میسر منو (url)</label>
                            <input
                                type="text"
                                name='slug'
                                value={form.slug}
                                onChange={inputChangeHandel}
                                dir='ltr'
                                className='bg-white pl-4 h-10 border border-gray-200 text-[14px] placeholder:text-[13px] text-gray-icon rounded-sm'
                                placeholder='url' />
                        </div>
                        <div className="w-[48%] flex flex-col">
                            <label className='text-[14px] mb-4'>آیکون منو</label>
                            <label {...getRootProps()} htmlFor="cover-article" className='bg-white flex items-center justify-center p-4 rounded-sm h-12 cursor-pointer border-gray-icon border-dashed border'>
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
                            <input {...getInputProps()} />
                            <div className="mt-5 mb-4 flex flex-col gap-y-2">
                                <span className='text-[13px]'>فرمت های مجاز: <small className='text-[13px] text-gray-icon'>png jpge jpg webp svg</small></span>
                                <span className='text-[13px]'>حجم مجاز: <small className='text-[13px] text-gray-icon'>حجم کاور نباید بیشتر از 5 مگابایت باشد.</small></span>
                            </div>
                            {
                                iconPreview && (
                                    <div className="mt-5 w-20 relative">
                                        <img src={iconPreview!} alt="article image" className='h-20 w-full object-cover' />
                                        <button
                                            type="button"
                                            onClick={removeIcon}
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
                        <div className="w-[48%] flex flex-col">
                            <label className='text-[14px] mb-4'>دسته بندی منو</label>
                            <button
                                type="button"
                                className='bg-white rounded-sm px-4 border h-12 border-gray-200 cursor-pointer relative text-start'
                                onClick={() => setIsOpenMenu(!isOpenMenu)}
                            >
                                <div className="flex items-center justify-between">
                                    <span className={`text-start block truncate text-[13px] ${selectedParent ? "text-dark" : "text-gray-400"}`}>
                                        {selectedParent ? selectedParent.name : "یک دسته بندی را انتخاب کنید"}
                                    </span>
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
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            onClick={(e) => e.stopPropagation()}
                                            className='h-10 placeholder:text-[13px] bg-transparent outline-none text-[14px]' placeholder='جستوجوی دسته بندی' />
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
                                    <div className="max-h-48 overflow-y-auto">
                                        {filteredParents.length ? (
                                            filteredParents.map((subMenu) => {
                                                const isSelected = selectedParent?._id === subMenu._id;
                                                return (
                                                    <div
                                                        key={subMenu._id}
                                                        onClick={() => handleSelectParent(subMenu)}
                                                        className={`
                                                            mt-2 border p-1 text-[14px] flex items-center justify-between rounded-sm cursor-pointer transition-all duration-200
                                                            ${isSelected
                                                                ? 'border-green-400 bg-green-50'
                                                                : 'border-gray-200 hover:bg-gray-50'
                                                            }
                                                        `}
                                                    >
                                                        <p className={`h-8 flex items-center pr-2 rounded-sm text-[13px] ${isSelected ? 'text-green-600' : 'text-gray-700'}`}>
                                                            {subMenu.name}
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
                                                );
                                            })
                                        ) : isLoading ? (
                                            <div className="border border-gray-100 h-30 mt-2 rounded-sm flex flex-col gap-y-4 items-center justify-center">
                                                <p className='text-gray-icon text-[14px]'>درحال بارگذاری...</p>
                                            </div>
                                        ) : (
                                            <div className="border border-gray-100 h-30 mt-2 rounded-sm flex flex-col gap-y-4 items-center justify-center">
                                                <img className="w-15" alt="" src="/images/emptyImage01.png" />
                                                <p className="text-gray-icon text-[14px]">دسته مورد نظر یافت نشد</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </button>
                        </div>
                        <div className="w-[48%] flex flex-col"></div>
                        <div className="flex justify-end w-full">
                            <button type="submit" className='w-35 h-10 cursor-pointer rounded-sm text-white text-[14px] mt-10 bg-fuchsia-500'>ویرایش</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default EditSubMenu;