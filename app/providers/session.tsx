"use client"

import { SessionProvider } from "next-auth/react";
// import { useEffect } from "react";

export default function Sessionprovider({
    children,
    }: Readonly<{
    children: React.ReactNode;
    }>) {
    
;
    return (
        <SessionProvider>
        {/* <Session /> */}
        {children}
        </SessionProvider>
    );
    }


// function Session() {
//     const session = useSession();
//     useEffect(() => {
//         if (session.status === "unauthenticated") {
//             window.location.href = "/auth/signin";
//         }else{
//             window.location.href = "/";
//         }
//     }, [session.status]);

//     return null;
// }