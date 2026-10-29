import { RichTextEdito } from '@/components/modules/AdminPanel/RichTextEditor/RichTextEditor';
import { fetchCategories } from '@/features/articleCategories/articleCategories';
import { fetchArticles, updateArticle } from '@/features/articles/articles';
import { useAppDispatch, useAppSelector } from '@/features/hooks';
import { fetchMenus } from '@/features/menus/menus';
import React, { FormEvent, useCallback, useEffect, useMemo, useState } from 'react'
import { useDropzone } from 'react-dropzone';
import toast from 'react-hot-toast';

type EditArticleProps = {
    _id: string;
    onClose: () => void;
    onSuccess: () => void
};
type Status = "draft" | "published" | "archived";

interface MenuNode {
    _id: string;
    name: string;
    slug: string,
    icon?: string,
    parentId?: string,
    children?: MenuNode[],
    createdAt: string
};

interface FlattenedMenu extends MenuNode {
    level: number;
    path: string;
};

const statusOptions: { value: Status, label: string }[] = [
    { value: "draft", label: "پیش نویس" },
    { value: "published", label: "منتشر شده" },
    { value: "archived", label: "بایگانی شده" },
];

const flattenMenus = (nodes: MenuNode[] | null | undefined, level = 0, parentPath = ""): FlattenedMenu[] => {
    if (!nodes?.length) return [];

    let flattened: FlattenedMenu[] = [];

    nodes.forEach((node) => {
        const currentPath = parentPath ? `${parentPath} / ${node.name}` : node.name;
        flattened.push({ ...node, level, path: currentPath });
        if (node.children && node.children.length) {
            flattened = flattened.concat(flattenMenus(node.children, level + 1, currentPath))
        }
    });
    return flattened;
};

const EditArticle = ({ _id, onClose, onSuccess }: EditArticleProps) => {
    const disptch = useAppDispatch();
    const { isLoading, articles } = useAppSelector(state => state.articles);
    const { menus } = useAppSelector(state => state.menus);
    const { articleCategories } = useAppSelector(state => state.articleCategories);

    const [form, setForm] = useState({
        title: "",
        slug: "",
        content: "",
        excerpt: "",
    });
    const [error, setError] = useState({
        title: "",
        slug: "",
        content: "",
        excerpt: "",
        menus: "",
        articleCategory: "",
        coverImage: "",
        tags: ""
    });
    const [articleStatus, setArticleStatus] = useState<Status>("draft");
    const [statusSearch, setStatusSearch] = useState<string>("");

    const [selectedMenuIds, setSelectedMenuIds] = useState<string[]>([]);
    const [searchMenu, setSearchMenu] = useState<string>("");

    const [selectedArticleCategories, setSelectedArticleCategories] = useState<{ _id: string, name: string } | null>(null);
    const [searchCategory, setSearchCategory] = useState<string>("");

    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState<string>("");
    const [tagError, setTagError] = useState<string>("");

    const [isOpenCategory, setIsOpenCategory] = useState<boolean>(false);
    const [isOpenMenu, setIsOpenMenu] = useState<boolean>(false);
    const [isOpenStatus, setIsOpenStatus] = useState<boolean>(false);

    const [previews, setPreviews] = useState<string | null>(null);
    const [coverImage, setCoverImage] = useState<File | null>(null);

    const article = useMemo(() => {
        return articles.find((article) => article._id === _id)
    }, [articles, _id]);

    useEffect(() => {
        if (!article) return;

        setForm({
            title: article.title || "",
            slug: article.slug || "",
            content: article.content || "",
            excerpt: article.excerpt || "",
        });

        if (article.status) {
            setArticleStatus(article.status as Status);
        };

        if (article.articleCategory) {
            const categoryId =
                typeof article.articleCategory === "object"
                    ? String((article.articleCategory as { _id: string })._id)
                    : String(article.articleCategory);

            const found = articleCategories.find(
                (c) => String(c._id) === categoryId
            );
            if (found) {
                setSelectedArticleCategories({
                    _id: found._id,
                    name: found.name || "",
                });
            }
        } else {
            setSelectedArticleCategories(null);
        };

        const rawMenus = (article as any).categories ?? (article as any).category ?? null;

        if (rawMenus) {
            if (Array.isArray(rawMenus)) {
                setSelectedMenuIds(
                    rawMenus.map((m: unknown) =>
                        typeof m === "object" && m && "_id" in m
                            ? String((m as { _id: string })._id)
                            : String(m)
                    )
                );
            } else if (typeof rawMenus === "object") {
                setSelectedMenuIds([String((rawMenus as { _id: string })._id)]);
            } else {
                setSelectedMenuIds([String(rawMenus)]);
            }
        } else {
            setSelectedMenuIds([]);
        };

        if (Array.isArray(article.tags)) {
            setSelectedTags(article.tags);
        };

        if (article.coverImage) {
            setPreviews(article.coverImage);
            setCoverImage(null);
        };
    }, [article, articleCategories]);

    useEffect(() => {
        disptch(fetchMenus()).unwrap()
    }, [disptch]);

    useEffect(() => {
        disptch(fetchCategories({})).unwrap();
    }, [disptch]);

    const inputChangeHandel = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }))
    };

    const filteredStatuses = useMemo(() => {
        const q = statusSearch.toLowerCase();
        if (!q) return statusOptions;

        return statusOptions.filter((status) =>
            status.value.toLowerCase().includes(q) ||
            status.label.toLowerCase().includes(q)
        );
    }, [statusSearch]);

    const handleSelectStatus = (status: Status) => {
        setArticleStatus(status);
        setStatusSearch("");
        setIsOpenStatus(false);
    };

    const allFlattenedMenus = useMemo(() => {
        if (!menus.length) return [];
        return flattenMenus(menus as MenuNode[]);
    }, [menus]);

    const toggleSelectedMenu = (node: { _id: string, name: string }) => {
        if (selectedMenuIds.includes(node._id)) {
            setSelectedMenuIds((prev) => prev.filter((_id) => _id !== node._id))
        } else {
            setSelectedMenuIds((prev) => ([...prev, node._id]))
        }
    };

    const filteredMenus = useMemo(() => {
        return allFlattenedMenus.filter((menu) =>
            menu.name.toLowerCase().includes(searchMenu) ||
            menu.slug.toLowerCase().includes(searchMenu)
        );
    }, [allFlattenedMenus, searchMenu]);

    const filteredCategories = useMemo(() => {
        const q = searchCategory.toLowerCase();

        if (!q) return articleCategories;

        return articleCategories.filter((category) =>
            category.name?.toLowerCase().includes(q) ||
            category.slug?.toLowerCase().includes(q)
        )
    }, [articleCategories, searchCategory]);

    const handleSelectCategory = (node: { _id: string, name: string }) => {
        if (selectedArticleCategories?._id === node._id) {
            setSelectedArticleCategories(null);
            setForm((prev: any) => {
                const { articleCategory, ...rest } = prev;
                return rest;
            })
        } else {
            setSelectedArticleCategories(node);
            setForm((prev) => ({ ...prev, articleCategory: node._id }))
        };
        setSearchCategory("");
        setIsOpenCategory(false)
    };

    const handleAddTag = () => {
        const newTag = tagInput.trim();
        if (!newTag) return;
        setTagError("");

        const isDuplicate = selectedTags.some((tag) => tag.toLowerCase() === newTag.toLowerCase());

        if (isDuplicate) {
            setTagError("این تگ تکراری می‌باشد");
            return;
        }

        if (selectedTags.length >= 10) {
            setTagError("حداکثر ۱۰ تگ مجاز است");
            return;
        }

        setSelectedTags((prev) => [...prev, newTag]);
        setTagInput("");
        setTagError("");
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setSelectedTags((prev) => prev.filter((tag) => tag !== tagToRemove));
        setTagError("");
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];

        if (!file) return null;

        const allowedTypes = ["image/png", "image/jpg", "image/jpeg", "image/webp", "image/gif", "image/svg+xml"];
        if (!allowedTypes.includes(file.type)) {
            toast.error("فرمت عکس معتبر نیست");
            return
        };

        if (file.size > 5 * 1024 * 1024) {
            toast.error("حجم عکس بیشتر از حدامجاز");
            return
        };

        setPreviews((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return URL.createObjectURL(file)
        });
        setCoverImage(file);
    }, []);

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg"] },
        multiple: false,
        maxFiles: 1
    });

    const removeCoveImage = () => {
        setPreviews((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return null
        });
        setCoverImage(null);
    };

    const submitFormHandel = async (e: FormEvent) => {
        e.preventDefault();

        const errorMessage = {
            title: form.title ? "" : "عنوان الزامی می باشد",
            slug: form.slug ? "" : "مسیر مقاله الزامی می باشد",
            excerpt: form.excerpt ? "" : "خلاصه مقاله الزامی می باشد",
            content: form.content ? "" : "متن مقاله الزامی می باشد",
            menus: selectedMenuIds.length ? "" : "انتخاب منو الزامی می‌باشد",
            articleCategory: selectedArticleCategories?._id ? "" : "انتخابدسته بندی الزامی می باشد",
            coverImage: previews?.length ? "" : "عکس مقاله الزامی می باشد",
            tags: selectedTags.length ? "" : "تگ مقاله الزامی می باشد"
        };
        setError(errorMessage);
        const hasError = Object.values(errorMessage).some((message) => message !== "");
        if (hasError) {
            toast.error("همه فیلدها را پر کنید");
            return
        };
        try {
            const formData = new FormData();
            formData.append("title", form.title.trim());
            formData.append("slug", form.slug.trim());
            formData.append("excerpt", form.excerpt.trim());
            formData.append("content", form.content);
            formData.append("status", articleStatus);

            if (selectedTags.length) {
                formData.append("tags", JSON.stringify(selectedTags));
            };

            if (selectedMenuIds.length > 0) {
                formData.append("categories", JSON.stringify(selectedMenuIds));
            };

            if (selectedArticleCategories?._id) {
                formData.append("articleCategory", selectedArticleCategories._id);
            };

            if (coverImage) {
                formData.append("coverImage", coverImage);
            };
            await disptch(updateArticle({ _id: _id, formData })).unwrap();
            disptch(fetchArticles({}));
            toast.success("مقاله باموفقیت ایجاد شد");
            setCoverImage(null);
            setSelectedMenuIds([]);
            setSelectedTags([]);
            setSelectedArticleCategories(null);
            onSuccess();
        } catch (err: any) {
            toast.error(err)
            return;
        }
    }

    return (
        <div onClick={onClose} className='fixed bg-overview top-0 right-0 left-0 bottom-0 z-50'>
            <div onClick={(e) => e.stopPropagation()} className="2xl:w-[70%] xl:w-[40%] lg:w-[50%] md:w-[60%] sm:w-[70%] w-[95%] absolute top-[5%] right-0 left-0 mx-auto my-0 bg-white flex flex-col px-2 overflow-y-scroll h-200">
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center">
                        <span className='block w-1 h-5 absolute right-0 bg-blueMenu'></span>
                        <span className='text-[14px]'>ویرایش مقاله</span>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className='cursor-pointer'>
                        <svg width="16" height="16" className='fill-gray-300' viewBox="0 0 256 256"><path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z"></path></svg>
                    </button>
                </div>
                <span className="w-full h-px bg-gray-10 block"></span>
                <form
                    onSubmit={submitFormHandel}
                    className='mt-10 flex justify-between flex-wrap gap-y-4'>
                    <div className="w-[48%] flex flex-col">
                        <label className='text-[14px] mb-4'>عنوان</label>
                        <input
                            type="text"
                            name='title'
                            value={form.title}
                            onChange={inputChangeHandel}
                            placeholder='عنوان مقاله'
                            className='bg-white pr-4 h-10 border border-gray-200 text-[14px] placeholder:text-[13px] text-gray-icon rounded-sm' />
                        {error && <small className='mt-2 mr-1 text-red-400'>{error.title}</small>}
                    </div>
                    <div className="w-[48%] flex flex-col">
                        <label className='text-[14px] mb-4'>مسیر</label>
                        <input
                            type="text"
                            name='slug'
                            value={form.slug}
                            onChange={inputChangeHandel}
                            placeholder='مسیر مقاله'
                            className='bg-white pr-4 h-10 border border-gray-200 text-[14px] placeholder:text-[13px] text-gray-icon rounded-sm' />
                        {error && <small className='mt-2 mr-1 text-red-400'>{error.slug}</small>}
                    </div>
                    <div className="w-[48%] flex flex-col">
                        <label className='text-[14px] mb-4'>کاور مقاله</label>
                        <label {...getRootProps()} className='bg-white flex items-center justify-center p-4 rounded-sm h-12 cursor-pointer border-gray-icon border-dashed border'>
                            <span className='text-[13px] text-gray-icon flex gap-x-2'>
                                کاور مقاله را انتخاب کنید
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
                        {error && <small className='mt-2 mr-1 text-red-400'>{error.coverImage}</small>}
                        <input {...getInputProps()} />
                        <div className="mt-5 mb-4 flex flex-col gap-y-2">
                            <span className='text-[13px]'>فرمت های مجاز: <small className='text-[13px] text-gray-icon'>png jpge jpg webp</small></span>
                            <span className='text-[13px]'>حجم حجاز: <small className='text-[13px] text-gray-icon'>حجم کاور نباید بیشتر از 5 مگابایت باشد.</small></span>
                        </div>
                        {
                            previews && (
                                <div className="mt-5 w-full relative">
                                    <img src={previews} alt="article image" className='h-30 w-full object-cover' />
                                    <button
                                        type="button"
                                        onClick={removeCoveImage}
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
                        <label className='text-[14px] mb-4'>منو مقاله</label>
                        <div
                            onClick={() => setIsOpenMenu(!isOpenMenu)}
                            className={`h-12 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-500 bg-white rounded-lg px-4 border border-gray-200 cursor-pointer relative text-start flex flex-col justify-center`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-start block truncate text-[13px]">
                                    {selectedMenuIds.length > 0
                                        ? `${selectedMenuIds.length} منو انتخاب شده`
                                        : "یک یا چند منو را انتخاب کنید"}
                                </span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-5"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </div>
                            <div className="flex flex-wrap gap-2 max-h-12 overflow-y-auto">
                                {selectedMenuIds.map(id => {
                                    const menuName = allFlattenedMenus.find(m => m._id === id)?.name || id;
                                    return (
                                        <span key={id} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                            {menuName}
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleSelectedMenu({ _id: id, name: menuName } as any);
                                                }}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                &times;
                                            </button>
                                        </span>
                                    );
                                })}
                            </div>
                            <div
                                className={`bg-white border z-20 border-gray-200 rounded-lg p-2 absolute right-0 left-0 top-[calc(100%+4px)] shadow-lg max-h-80 overflow-hidden ${isOpenMenu ? "block opacity-100" : "hidden opacity-0"}`}
                            >
                                <div className="flex items-center justify-between border border-gray-200 rounded-lg px-4 bg-gray-100">
                                    <input
                                        type="text"
                                        placeholder="جستجو..."
                                        value={searchMenu}
                                        onChange={(e) => setSearchMenu(e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                        className="h-10 placeholder:text-[13px] bg-transparent outline-none text-[14px]"
                                    />
                                </div>
                                <div className="mt-2 border border-gray-200 p-2 text-[14px] max-h-48 overflow-y-auto">
                                    {filteredMenus.length ? (
                                        filteredMenus.map((menu) => {
                                            const isSelected = selectedMenuIds.includes(menu._id);
                                            return (
                                                <div
                                                    key={menu._id}
                                                    onClick={() => toggleSelectedMenu(menu)}
                                                    className={`px-4 py-2 hover:bg-green-50 cursor-pointer text-[13px] text-gray-700 flex items-center justify-between group ${isSelected ? 'bg-green-100 font-bold' : ''}`}
                                                >
                                                    <p
                                                        className="pb-2 h-8 pr-2 flex items-center rounded-sm cursor-pointer text-[14px]"
                                                        style={{ paddingRight: `${10 + menu.level * 20}px` }}
                                                    >
                                                        {isSelected && <span className="text-green-500 ml-2">✓</span>}
                                                        {menu.path}
                                                    </p>
                                                    {menu.icon && (
                                                        <img src={menu.icon} alt="" className="w-4 h-4 rounded object-cover ml-2 opacity-70" />
                                                    )}
                                                </div>
                                            );
                                        })
                                    ) : (
                                        <div className="border border-gray-100 h-30 mt-2 rounded-sm flex flex-col gap-y-4 items-center justify-center">
                                            <img className="w-15" alt="" src="/images/emptyImage01.png" />
                                            <p className="text-gray-icon text-[14px]">منو مورد نظر یافت نشد</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {error && <small className='mt-2 mr-1 text-red-400'>{error.menus}</small>}
                    </div>
                    <div className="w-[48%] flex flex-col">
                        <label className='text-[14px] mb-4'>دسته بندی مقاله</label>
                        <button
                            type="button"
                            className='bg-white rounded-sm px-4 border h-12 border-gray-200 cursor-pointer relative text-start'
                            onClick={() => setIsOpenCategory(!isOpenCategory)}
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-start block truncate text-[13px]">
                                    {selectedArticleCategories ? selectedArticleCategories.name : "یک دسته بندی را انتخاب کنید"}
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
                            <div className={`${isOpenCategory ? "block opacity-100" : "hidden opacity-0"} bg-white border z-20 border-gray-200 rounded-sm p-2 absolute right-0 left-0 top-[calc(100%+4px)] shadow-lg max-h-80 overflow-hidden`}>
                                <div className="flex items-center justify-between border border-gray-200 rounded-sm px-4 bg-gray-100">
                                    <input
                                        type="text"
                                        value={searchCategory}
                                        onChange={(e) => setSearchCategory(e.target.value)}
                                        onClick={(e) => e.stopPropagation()}
                                        className='h-10 w-full placeholder:text-[13px] bg-transparent outline-none text-[14px]' placeholder='جستوجوی دسته بندی' />
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
                                        filteredCategories.length ? (
                                            filteredCategories.map((category) => {
                                                const isSelected = selectedArticleCategories?._id === category._id;
                                                return (
                                                    <div
                                                        key={category._id}
                                                        onClick={() => handleSelectCategory(category as any)}
                                                        className={`
                                                            mt-2 border p-1 text-[14px] flex items-center justify-between rounded-sm cursor-pointer transition-all duration-200
                                                            ${isSelected
                                                                ? 'border-green-400 bg-green-50'
                                                                : 'border-gray-200 hover:bg-gray-50'
                                                            }
                                                        `}
                                                    >
                                                        <p className={`h-8 flex items-center pr-2 rounded-sm text-[13px] ${isSelected ? 'text-green-600' : 'text-gray-700'}`}>
                                                            {category.name}
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
                                        ) : (
                                            <div className="border border-gray-100 h-30 mt-2 rounded-sm flex flex-col gap-y-4 items-center justify-center">
                                                <img className="w-15" alt="" src="/images/emptyImage01.png" />
                                                <p className="text-gray-icon text-[14px]">دسته مورد نظر یافت نشد</p>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </button>
                        {error && <small className='mt-2 mr-1 text-red-400'>{error.articleCategory}</small>}
                    </div>
                    <div className="w-[48%] flex flex-col">
                        <label className='text-[14px] mb-4'>وضعیت مقاله</label>
                        <div className="relative">
                            <button
                                type="button"
                                className='w-full bg-white rounded-sm px-4 border h-12 border-gray-200 cursor-pointer relative text-start'
                                onClick={() => setIsOpenStatus(!isOpenStatus)}
                            >
                                <div className="flex items-center justify-between">
                                    <span className={`text-start block truncate text-[13px] ${articleStatus ? 'text-dark' : 'text-gray-400'}`}>
                                        {statusOptions.find((s) => s.value === articleStatus)?.label || 'یک وضعیت را انتخاب کنید'}
                                    </span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className={`size-4 transition-transform duration-200 ${isOpenStatus ? 'rotate-180' : ''}`}
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                    </svg>
                                </div>
                            </button>
                            <div
                                className={`
                                    ${isOpenStatus ? "block opacity-100" : "hidden opacity-0"}
                                    bg-white border z-20 border-gray-200 rounded-sm p-2 
                                    absolute right-0 left-0 top-[calc(100%+4px)] shadow-lg 
                                    max-h-80 overflow-hidden
                            `}
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="flex items-center justify-between border border-gray-200 rounded-sm px-4 bg-gray-50">
                                    <input
                                        type="text"
                                        onClick={(e) => e.stopPropagation()}
                                        value={statusSearch}
                                        onChange={(e) => setStatusSearch(e.target.value)}
                                        className='h-10 placeholder:text-[13px] bg-transparent outline-none text-[14px] w-full'
                                        placeholder='جستوجوی وضعیت'
                                    />
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
                                <div className="mt-2 max-h-48 overflow-y-auto">
                                    {filteredStatuses.length ? (
                                        filteredStatuses.map((status) => {
                                            const isSelected = articleStatus === status.value;

                                            return (
                                                <div
                                                    key={status.value}
                                                    onClick={() => handleSelectStatus(status.value)}
                                                    className={`
                                            mt-2 border p-1 text-[14px] flex items-center justify-between rounded-sm cursor-pointer transition-all duration-200
                                            ${isSelected
                                                            ? 'border-green-400 bg-green-50'
                                                            : 'border-gray-200 hover:bg-gray-50'
                                                        }
                                        `}
                                                >
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
                                            );
                                        })
                                    ) : (
                                        <div className="border border-gray-100 h-30 mt-5 rounded-sm flex flex-col gap-y-4 items-center justify-center">
                                            <img className="w-15" alt="" src="/images/emptyImage01.png" />
                                            <p className="text-gray-icon text-[14px]">وضعیتی یافت نشد</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[48%] flex flex-col">
                        <label className='text-[14px] mb-4'>تگ ها</label>
                        <div className="flex items-center gap-x-2">
                            <input
                                type="text"
                                placeholder='تگ مقاله (دشت - کویر)'
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        handleAddTag()
                                    }
                                }}
                                className='bg-white pr-4 h-10 w-100 border border-gray-200 text-[14px] placeholder:text-[13px] text-gray-icon rounded-sm' />
                            <button
                                type="button"
                                onClick={handleAddTag}
                                disabled={!tagInput.trim()}
                                className='cursor-pointer text-[13px] h-9 w-15 bg-blueMenu text-white disabled:cursor-no-drop disabled:opacity-50'>ثبت</button>
                        </div>
                        {tagError && <small className='text-red-500 my-1'>{tagError}</small>}
                        {error && <small className='mt-2 mr-1 text-red-400'>{error.tags}</small>}
                        <div className="flex gap-x-2 mt-3">
                            {
                                selectedTags.length ? (
                                    selectedTags.map((tag) => (
                                        <div key={tag} className='h-8 px-2 rounded-full flex items-center justify-center border border-gray-100 text-[13px] bg-white'>
                                            <span>{tag}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveTag(tag)}
                                                className='mr-4 text-gray-icon cursor-pointer'>x</button>
                                        </div>
                                    ))
                                ) : []
                            }
                        </div>
                    </div>
                    <div className="w-full flex flex-col">
                        <label className='text-[14px] mb-4'>خلاصه توضیحات</label>
                        <textarea
                            placeholder='خلاصه توضیحات'
                            name='excerpt'
                            value={form.excerpt}
                            onChange={inputChangeHandel}
                            className='bg-white border border-gray-200 text-[14px] text-gray-icon placeholder:text-[13px] h-40 rounded-sm pt-2 pr-4'></textarea>
                        {error && <small className='mt-2 mr-1 text-red-400'>{error.excerpt}</small>}
                    </div>
                    <div className="w-full flex flex-col">
                        <label className='text-[14px] mb-4'>متن مقاله</label>
                        <RichTextEdito
                            name="content"
                            value={form.content}
                            onChange={(content) => setForm((prev) => ({ ...prev, content }))}
                        />
                        {error && <small className='mt-2 mr-1 text-red-400'>{error.content}</small>}
                    </div>
                    <div className="w-[48%] flex flex-col"></div>
                    <div className="flex justify-end w-full mb-5">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className='w-35 h-10 cursor-pointer rounded-sm flex items-center justify-center text-white text-[14px] mt-10 bg-green-1 disabled:cursor-no-drop disabled:opacity-50'>
                            {isLoading ? <div className='dots'></div> : "ویرایش"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditArticle;