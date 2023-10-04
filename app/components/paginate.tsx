"use client"
import { useRouter, useSearchParams } from "next/navigation"
export default function Paginate() {
    const route = useRouter();
    const page = useSearchParams().get("page");
    const router = ()=>{
        const currentPage = Number(page) ?? 1;
        return{
            next: ()=>{
                route.push(`/home?page=${currentPage+1}`)
                route.refresh()
            },
            preveus:()=>{
                route.push(`/home?page=${currentPage>=0 ? currentPage-1:1}`)
                route.refresh()
        }
    }
    }
    return(
        <div className="join fixed right-7 bottom-4 sm:right-10 md:right-14 lg:right-16 z-[60]">
            <button onClick={()=>router().preveus()} className="join-item btn">«</button>
            <div className="join-item btn">Page {page}</div>
            <button onClick={()=>router().next()} className="join-item btn">»</button>
        </div>
    )
}