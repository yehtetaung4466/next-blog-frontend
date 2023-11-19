import Link from "next/link";
import { Activity_t } from "../utils/types";

export default function Activity({activity,inspect,maker,activeTab}:{activity:Activity_t,inspect:boolean,maker:string,activeTab:'posts'|'activity'}) {
    const style4action = `${activity.type==='comment'? "text-green-500":(activity.type==='like'? 'text-blue-500':'text-red-500')}`
    return(
        <div className={` bg-base-300 rounded-full border px-2 py-1 my-2 ml-3 w-fit ${activeTab==='posts'? 'hidden':null}`}>
            {inspect? maker:"you"} <span className={style4action}>{activity.type ==='comment'? activity.type+"ed":activity.type+"d"}</span> a post by{" "}
            <Link href={`/profile/${activity.authorIdOfActivityMakedBlog}`} className="link link-info">
                {activity.authorNameOfActivityMakedBlog}
            </Link>
        </div>
    )
}