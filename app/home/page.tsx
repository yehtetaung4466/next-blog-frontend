import Post from "@/app/components/post";
import { Blog } from "../utils/types";

async function getBlogs(p:number) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_NEST_SERVER}/api/blogs?paginate=${p}`,{
        cache: "no-store"
    })
    if(res.ok) {
        if(res.status===204){
            return 0;
        }
        const body = await res.json() as Blog[];
        return body;
    }
}
export default async function HomePage({
    params,
    searchParams,
}:{
    params:undefined,
    searchParams:{page:string,isLogin:string}
}) {
    const blogs = await getBlogs(Number(searchParams.page));
    if(blogs !== 0 && blogs) {
        return(
            blogs.map((b)=>{
                return <Post blog={b} key={b.id}/>
            })
        )
    }
    return(
        <div>
            {typeof blogs}
        </div>
    )
}

// export default async function HomePage() {
//     const blogs = await getBlogs(1);
//     if(blogs) {
//         return(
//             blogs.map((b)=>{
//                 return <div>{b.title}</div>
//             })
//         )
//     }
// }