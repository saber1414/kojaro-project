"use client";
import {
    BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell,
} from "recharts";

const weeklyData = [
    { day: "ش", value: 320 },
    { day: "ی", value: 210 },
    { day: "د", value: 120 },
    { day: "س", value: 280 },
    { day: "چ", value: 500 },
    { day: "پ", value: 460 },
    { day: "ج", value: 300 },
    { day: "ش", value: 180 },
];

const stats = [
    {
        id: 1,
        label: "کاربران",
        value: "۳۲,۹۸۴",
        percent: 85,
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
        ),
    },
    {
        id: 2,
        label: "کلیک‌ها",
        value: "۲.۴۲م",
        percent: 70,
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M13.64 21.97a.99.99 0 0 1-1.41 0L2.05 11.8a1 1 0 0 1 0-1.41l9.9-9.9a1 1 0 0 1 1.41 0l2.12 2.12-1.41 1.41L12 3.41 4.41 11 12 18.59l1.59-1.59 1.41 1.41-1.36 1.36z" />
            </svg>
        ),
    },
    {
        id: 3,
        label: "فروش",
        value: "۲,۴۰۰$",
        percent: 55,
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45C4.52 15.37 5.48 17 7 17h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1 1 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
        ),
    },
    {
        id: 4,
        label: "آیتم‌ها",
        value: "۳۲۰",
        percent: 40,
        icon: (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z" />
            </svg>
        ),
    },
];

const ActiveUserChart = () => {
    return (
        <div className="mt-5 bg-white w-full lg:w-[40%] min-h-111.25 p-4 rounded-lg shadow-sm">
            <div className="mt-0 mb-5">
                <span className="text-[14px] text-gray-800 font-IRANYekan-Bold block">
                    کاربران فعال
                </span>
                <p className="text-[13px] font-IRANYekan-Bold text-teal-500 pt-1">
                    (+۲۳){" "}
                    <small className="font-IRANYekan-Light text-gray-500">
                        نسبت به هفتهٔ گذشته
                    </small>
                </p>
            </div>
            <div className="w-full h-40 rounded-xl bg-linear-to-b from-[#1e293b] to-[#0f172a] px-2 pt-3 pb-1" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={weeklyData}
                        margin={{ top: 8, right: 8, left: -18, bottom: 0 }}
                    >
                        <YAxis
                            domain={[0, 500]}
                            ticks={[0, 100, 200, 300, 400, 500]}
                            tick={{ fill: "#94A3B8", fontSize: 10 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <XAxis dataKey="day" hide />
                        <Tooltip
                            cursor={{ fill: "rgba(255,255,255,0.06)" }}
                            contentStyle={{
                                borderRadius: 8,
                                border: "none",
                                fontSize: 12,
                            }}
                        />
                        <Bar dataKey="value" radius={[6, 6, 6, 6]} barSize={10}>
                            {weeklyData.map((_, index) => (
                                <Cell key={index} fill="#FFFFFF" />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className="space-y-4">
                {stats.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 mt-3">
                        <div className="w-8 h-8 rounded-md bg-teal-50 text-teal-500 flex items-center justify-center shrink-0">
                            {item.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2 mb-1">
                                <span className="text-[12px] text-gray-500 font-IRANYekan-Medium">
                                    {item.label}
                                </span>
                                <span className="text-[13px] text-gray-800 font-IRANYekan-Bold">
                                    {item.value}
                                </span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-teal-400 rounded-full transition-all"
                                    style={{ width: `${item.percent}%` }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ActiveUserChart;