"use client"
import { useRouter } from "next/navigation";
export default function NotFound({msg}:{msg:string}) {
    const route = useRouter()
    return(
        <div className=" h-screen w-screen flex flex-col justify-center items-center">
            <span className=" text-gray-500 text-lg font-semibold">
                {msg}
            </span>
            <button className=" btn btn-primary btn-sm"
            onClick={()=>route.back()}
            >
                back
            </button>
        </div>
    )
}