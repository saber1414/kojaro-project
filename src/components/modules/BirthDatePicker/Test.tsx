"use client"
import React, { useState, useEffect } from 'react'

type BirthDatePickerProps = {
    onChange?: (date: { year: string; month: string; day: string } | null) => void;
    defaultValue?: { year: string; month: string; day: string };
    placeholder?: string;
    className?: string;
    required?: boolean;
}

const BirthDatePicker = ({ 
    onChange, 
    defaultValue = { year: '', month: '', day: '' },
    className = '',
    required = false
}: BirthDatePickerProps) => {
    const [year, setYear] = useState<string>(defaultValue.year || '')
    const [month, setMonth] = useState<string>(defaultValue.month || '')
    const [day, setDay] = useState<string>(defaultValue.day || '')
    const [error, setError] = useState<string>('')
    const [birthDate, setBirthDate] = useState<string>('')

    // محاسبه تعداد روزهای هر ماه شمسی
    const getDaysInMonth = (year: number, month: number): number => {
        if (month >= 1 && month <= 6) return 31
        if (month >= 7 && month <= 11) return 30
        if (month === 12) {
            const isLeap = (year % 33 === 1 || year % 33 === 5 || year % 33 === 9 || 
                           year % 33 === 13 || year % 33 === 17 || year % 33 === 22 || 
                           year % 33 === 26 || year % 33 === 30)
            return isLeap ? 30 : 29
        }
        return 30
    }

    // تولید لیست سال‌ها از ۱۳۵۰ تا سال جاری
    const getYears = (): string[] => {
        const currentYear = new Date().getFullYear()
        const persianYear = currentYear - 621
        const years: string[] = []
        for (let i = 1350; i <= persianYear; i++) {
            years.push(i.toString())
        }
        return years
    }

    // تولید لیست ماه‌ها
    const getMonths = (): string[] => {
        return ['۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹', '۱۰', '۱۱', '۱۲']
    }

    // تولید لیست روزها بر اساس سال و ماه انتخاب شده
    const getDays = (): string[] => {
        if (!year || !month) return []
        const yearNum = parseInt(year)
        const monthNum = parseInt(month)
        if (isNaN(yearNum) || isNaN(monthNum)) return []
        const daysCount = getDaysInMonth(yearNum, monthNum)
        const days: string[] = []
        for (let i = 1; i <= daysCount; i++) {
            days.push(i.toString())
        }
        return days
    }

    // بررسی تاریخ کامل
    const validateDate = (): boolean => {
        if (!year || !month || !day) {
            if (required) {
                setError('لطفاً تمام فیلدها را تکمیل کنید')
            } else {
                setError('')
            }
            return false
        }

        const yearNum = parseInt(year)
        const monthNum = parseInt(month)
        const dayNum = parseInt(day)

        if (isNaN(yearNum) || isNaN(monthNum) || isNaN(dayNum)) {
            setError('مقادیر وارد شده معتبر نیستند')
            return false
        }

        const maxDay = getDaysInMonth(yearNum, monthNum)
        if (dayNum < 1 || dayNum > maxDay) {
            setError(`روز باید بین ۱ تا ${maxDay} باشد`)
            return false
        }

        setError('')
        return true
    }

    // مدیریت تغییرات
    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setYear(value)
        setDay('')
        if (onChange) {
            onChange({ year: value, month, day: '' })
        }
    }

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setMonth(value)
        setDay('')
        if (onChange) {
            onChange({ year, month: value, day: '' })
        }
    }

    const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value
        setDay(value)
        if (onChange && validateDate()) {
            onChange({ year, month, day: value })
        }
    }

    // نمایش تاریخ کامل
    useEffect(() => {
        if (year && month && day) {
            if (validateDate()) {
                setBirthDate(`${year}/${month}/${day}`)
            } else {
                setBirthDate('')
            }
        } else {
            setBirthDate('')
        }
    }, [year, month, day])

    const years = getYears()
    const months = getMonths()
    const days = getDays()

    return (
        <div className={`w-full ${className}`}>
            <div className="flex gap-3">
                {/* سال */}
                <div className="flex-1">
                    <select
                        value={year}
                        onChange={handleYearChange}
                        className="w-full h-10 px-3 border border-gray-300 rounded-md text-[14px] focus:outline-none focus:border-blue-500 bg-white appearance-none"
                    >
                        <option value="">سال</option>
                        {years.map((y) => (
                            <option key={y} value={y}>{y}</option>
                        ))}
                    </select>
                </div>

                {/* ماه */}
                <div className="flex-1">
                    <select
                        value={month}
                        onChange={handleMonthChange}
                        className="w-full h-10 px-3 border border-gray-300 rounded-md text-[14px] focus:outline-none focus:border-blue-500 bg-white appearance-none"
                    >
                        <option value="">ماه</option>
                        {months.map((m) => (
                            <option key={m} value={m}>{m}</option>
                        ))}
                    </select>
                </div>

                {/* روز */}
                <div className="flex-1">
                    <select
                        value={day}
                        onChange={handleDayChange}
                        disabled={!year || !month}
                        className={`w-full h-10 px-3 border border-gray-300 rounded-md text-[14px] focus:outline-none focus:border-blue-500 bg-white appearance-none ${
                            !year || !month ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        <option value="">روز</option>
                        {days.map((d) => (
                            <option key={d} value={d}>{d}</option>
                        ))}
                    </select>
                </div>
            </div>

            {/* نمایش خطا */}
            {error && (
                <div className="mt-2 text-red-500 text-[13px] font-IRANYekan-Light">
                    ❌ {error}
                </div>
            )}

            {/* نمایش تاریخ کامل */}
            {birthDate && !error && (
                <div className="mt-2 text-green-600 text-[13px] font-IRANYekan-Bold">
                    ✅ {birthDate}
                </div>
            )}
        </div>
    )
}

export default BirthDatePicker