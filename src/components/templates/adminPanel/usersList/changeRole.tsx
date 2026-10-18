"use client";

import React, { useState } from "react";

type Role = "author" | "user" | "moderator";

type ChangeRoleProps = {
    currentRole: Role;
    onConfirm: (newRole: Role) => void;
    onCancel: () => void;
    loading: boolean;
};

const ROLES: { value: Role; label: string }[] = [
    { value: "user", label: "کاربر" },
    { value: "author", label: "نویسنده" },
    { value: "moderator", label: "جانشین مدیر" },
];

const ChangeRole = ({ currentRole, onConfirm, onCancel, loading }: ChangeRoleProps) => {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [roleSearch, setRoleSearch] = useState("");
    const [selectedRole, setSelectedRole] = useState<Role>(currentRole);

    const roleLabel =
        ROLES.find((r) => r.value === selectedRole)?.label ||
        "نقش را انتخاب کنید";

    const filteredRoles = ROLES.filter((r) =>
        r.label.toLowerCase().includes(roleSearch.trim().toLowerCase())
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedRole === currentRole) {
            onCancel();
            return;
        }
        onConfirm(selectedRole);
    };

    return (
        <div
            onClick={onCancel}
            className="fixed bg-overview z-20 top-0 right-0 left-0 bottom-0"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="w-[40%] p-4 bg-gray-50 mx-auto absolute top-[10%] right-0 left-0 flex flex-col"
            >
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <span className="block w-1 h-5 absolute right-0 bg-blueMenu" />
                        <span className="text-[14px]">تغییر نقش</span>
                    </div>
                    <button type="button" onClick={onCancel} className="cursor-pointer">
                        <svg width="16" height="16" className="fill-gray-300" viewBox="0 0 256 256">
                            <path d="M208.49,191.51a12,12,0,0,1-17,17L128,145,64.49,208.49a12,12,0,0,1-17-17L111,128,47.51,64.49a12,12,0,0,1,17-17L128,111l63.51-63.52a12,12,0,0,1,17,17L145,128Z" />
                        </svg>
                    </button>
                </div>
                <span className="w-full h-px block bg-gray-200 mt-4 mb-4" />
                <p className="text-[13px] text-gray-500 mb-2">
                    نقش فعلی:{" "}
                    <span className="text-gray-800 font-IRANYekan-Bold">
                        {ROLES.find((role) => role.value === currentRole)?.label || currentRole}
                    </span>
                </p>
                <form onSubmit={handleSubmit} className="flex flex-wrap gap-y-4">
                    <div className="w-full flex flex-col">
                        <label className="text-[14px] mb-4">نقش جدید</label>
                        <button
                            type="button"
                            className="bg-white rounded-sm px-4 border h-10 border-gray-200 cursor-pointer relative text-start"
                            onClick={() => setIsOpenMenu((v) => !v)}
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-[13px] truncate">{roleLabel}</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                    />
                                </svg>
                            </div>
                            {isOpenMenu && (
                                <div
                                    className="bg-white border z-20 border-gray-200 rounded-sm p-2 absolute right-0 left-0 top-[calc(100%+4px)] shadow-lg"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="flex items-center border border-gray-200 rounded-sm px-4 bg-gray-100">
                                        <input
                                            type="text"
                                            value={roleSearch}
                                            onChange={(e) => setRoleSearch(e.target.value)}
                                            onClick={(e) => e.stopPropagation()}
                                            className="h-10 w-full outline-none text-[14px] bg-transparent placeholder:text-[13px]"
                                            placeholder="جستوجوی نقش‌ها"
                                        />
                                    </div>
                                    <div className="mt-2 max-h-48 overflow-y-auto">
                                        {filteredRoles.length ? (
                                            filteredRoles.map((item) => (
                                                <p
                                                    key={item.value}
                                                    onClick={() => {
                                                        setSelectedRole(item.value);
                                                        setIsOpenMenu(false);
                                                        setRoleSearch("");
                                                    }}
                                                    className={`hover:bg-gray-200 h-8 pr-2 flex items-center rounded-sm cursor-pointer text-[13px] ${
                                                        selectedRole === item.value
                                                            ? "bg-gray-100 font-bold"
                                                            : ""
                                                    }`}
                                                >
                                                    {item.label}
                                                    {item.value === currentRole && (
                                                        <span className="text-gray-400 text-[11px] mr-2">
                                                            (فعلی)
                                                        </span>
                                                    )}
                                                </p>
                                            ))
                                        ) : (
                                            <p className="text-[13px] text-gray-400 py-4 text-center">
                                                نقش مورد نظر یافت نشد
                                            </p>
                                        )}
                                    </div>
                                </div>
                            )}
                        </button>
                    </div>
                    <div className="flex justify-end w-full">
                        <button
                            type="submit"
                            disabled={loading || selectedRole === currentRole}
                            className="w-35 h-10 flex items-center justify-center cursor-pointer rounded-sm text-white text-[14px] mt-6 bg-blueMenu disabled:opacity-50"
                        >
                            {loading ? <div className="dots" /> : "تغییر نقش"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangeRole;