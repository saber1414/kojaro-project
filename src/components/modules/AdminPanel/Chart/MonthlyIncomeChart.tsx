"use client"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
    { month: "فروردین", income: 180, expense: 120 },
    { month: "اردیبهشت", income: 220, expense: 150 },
    { month: "خرداد", income: 260, expense: 190 },
    { month: "تیر", income: 340, expense: 210 },
    { month: "مرداد", income: 380, expense: 240 },
    { month: "شهریور", income: 420, expense: 260 },
    { month: "مهر", income: 360, expense: 230 },
    { month: "آبان", income: 300, expense: 200 },
    { month: "آذر", income: 280, expense: 170 },
    { month: "دی", income: 250, expense: 160 },
    { month: "بهمن", income: 320, expense: 180 },
    { month: "اسفند", income: 400, expense: 210 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;

    return (
        <div className="bg-white border border-gray-100 shadow-md rounded-lg px-3 py-2 text-[12px]">
            {
                payload.map((item: any) => (
                    <p key={item.dataKey} style={{ color: item.color }}>
                        {item.name}: {item.value.toLocaleString("fa-IR")}
                    </p>
                ))
            }
        </div>
    );
};

const MonthlyIncomeChart = () => {
    return (
        <div className='mt-5 bg-white w-full lg:w-[60%] h-111.25 p-4 rounded-lg shadow-sm'>
            <div className="mb-4">
                <span className="text-[14px] text-gray-icon font-IRANYekan-Bold">
                    نمودار درآمد سالانه تبلیغات
                </span>
                <p className="text-[13px] font-IRANYekan-Bold text-green-600 pt-2">
                    +۵۵٪ <small className="font-IRANYekan-Light text-gray-500">سود نسبت به سال قبل</small>
                </p>
            </div>
            <div className="w-full h-90" dir='ltr'>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                        data={data}
                        margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                    >
                        <defs>
                            <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#5EEAD4" stopOpacity={0.45} />
                                <stop offset="95%" stopColor="#5EEAD4" stopOpacity={0.05} />
                            </linearGradient>
                            <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#94A3B8" stopOpacity={0.35} />
                                <stop offset="95%" stopColor="#94A3B8" stopOpacity={0.05} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                        <XAxis
                            dataKey="month"
                            tick={{ fontSize: 11, fill: "#9CA3AF" }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fontSize: 11, fill: "#9CA3AF" }}
                            axisLine={false}
                            tickLine={false}
                            domain={[0, 500]}
                        />
                        <Tooltip content={CustomTooltip} />
                        <Area
                            type="monotone"
                            dataKey="expense"
                            name="هزینه"
                            stroke="#64748B"
                            strokeWidth={2}
                            fill="url(#colorExpense)"
                        />
                        <Area
                            type="monotone"
                            dataKey="income"
                            name="درآمد تبلیغات"
                            stroke="#2DD4BF"
                            strokeWidth={2.5}
                            fill="url(#colorIncome)"
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default MonthlyIncomeChart;