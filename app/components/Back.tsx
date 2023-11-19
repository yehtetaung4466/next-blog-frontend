"use client"
import { useRouter } from "next/navigation"

export default function Back() {
    const route = useRouter()
    return(
    <button className=' btn btn-xs mb-2 ml-1' onClick={()=>route.back()}>back</button>
    )
}