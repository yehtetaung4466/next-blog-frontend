import Link from 'next/link';
import Image from 'next/image';
import Default from '@/public/default.jpeg';
import CommentIcon from '@/app/components/commentIcon';
import LeaveComment from '@/app/components/leaveComment';
import Comment from '@/app/components/comment';
import { Blog, JWT, User } from '@/app/utils/types';
import NotFound from '@/app/components/NotFound';
import Reaction from '@/app/components/reaction';
import { DateTime } from 'luxon';
import Back from '@/app/components/Back';
import { cookies } from 'next/headers';
import { decode } from 'jsonwebtoken';
async function getBlogById(id: number) {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEST_SERVER}/api/blogs/${id}`,
      {
        cache: "no-store",
      },
    );
    if (res.ok) {
      const body = await res.json() as Blog;
      return body;
    }
    if (res.status===404) {
      return 404
    }
    throw new Error("can't get blog")
}
const getAuthorById = async(id:number)=>{
  
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEST_SERVER}/api/users/${id}`,
      { cache: 'no-store' },
    );
    if (res.ok) {
      const body = (await res.json()) as User;
      return body;
    }
    throw new Error("can't get author")
}
const getProfileById = async (id: number) => {
  const url = `${process.env.NEXT_PUBLIC_NEST_SERVER}/api/files/profiles/${id}?t=${Date.now()}`;
  const res = await fetch(url, { cache: "no-store" });
  if (res.ok) {
    return url;
  }
};
const getUserFromJwt = ()=>{
  const cookie = cookies().get("access_token")?.value;
  if(cookie){
    const user = decode(cookie) as JWT;
    return user;
  }
}
export default async function BlogPage({params}:{params:{id:string}}) {
  const id = Number(params.id);
  const blog = await getBlogById(id);
  if(!blog || blog === 404) return <NotFound msg={'article not found'}/>
  const author = await getAuthorById(blog.author_id);
  const profile = await getProfileById(blog.author_id);
  const datetime = DateTime.fromISO(blog.createdAt.slice(0,-1) +"+06:30").setZone("UTC+06:30");
  const timeDiffString = datetime.toRelative({base: DateTime.now()});
  const hidden = !blog.image;
  return (
    <div className=" h-screen w-screen">
      <div className=" h-1/6 w-full pl-6 pt-3">
        <div className=" w-full h-full max-w-xs sm:ml-2 ml-1 flex">
          <div className={` ${hidden ? 'hidden' : null} h-full w-1/2`}>
            <Image
              src={ blog.image || Default}
              className=" w-full h-full"
              width={0}
              height={0}
              alt="Article Image"
            />
          </div>
          <div className=" w-1/2 h-full">
            <div className=" h-1/3 pl-1 font-medium">{blog.title}</div>
            <div className=" flex items-center h-1/3 pl-1 span">
              <Link href={'/profile/1'} className=" z-50 h-full flex">
                <span className=" avatar h-4/6 my-auto">
                  <Image
                    src={profile || Default}
                    width={1}
                    height={1}
                    className=" rounded-full aspect-square"
                    alt="author profile"
                  />
                </span>
                <span className=" text-xs flex items-center">{author.name}</span>
              </Link>
            </div>
            <div className=" h-1/3 pl-1 text-accent">{timeDiffString}</div>
          </div>
        </div>
      </div>
      <div className=" pt-2  px-7 ">
        {blog.content}
      </div>
      <div className="flex border-x border-b pl-4 shadow-sm">
        <Reaction blog={blog} currentUser={getUserFromJwt()?.id} />
        <CommentIcon commentCount={blog.comment_count} />
        <Back/>
      </div>
      <LeaveComment />
      {blog.comments.reverse().map((c)=>{
        return <Comment authorId={c.author_id} context={c.context} id={c.id} key={c.id} />
      })}
    </div>
  );
}
