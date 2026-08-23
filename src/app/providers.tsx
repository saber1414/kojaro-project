"use client"
import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";
import { toastOptions, position } from "@/utils/toastConfig";
import { store } from "@/features/store";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            <SessionProvider>
                {children}
                <Toaster 
                    toastOptions={toastOptions} 
                    position={position} 
                />
            </SessionProvider>
        </Provider>
    );
}