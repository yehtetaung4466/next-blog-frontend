import Default from '@/public/default.jpeg';
import Image from 'next/image';
import Link from 'next/link';
import CommentIcon from './commentIcon';
import { Blog, JWT, User } from '../utils/types';
import { DateTime } from 'luxon';
import Reaction from './reaction';
import { decode } from 'jsonwebtoken';
import { cookies } from 'next/headers';
const getAuthorName = async (id: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NEST_SERVER}/api/users/${id}`,
    { cache: 'no-store' },
  );
  if (res.ok) {
    const body = (await res.json()) as User;
    return body.name;
  }
  return "can't get username";
};
const getProfileById = async (id: number) => {
  const url = `${process.env.NEXT_PUBLIC_NEST_SERVER}/api/files/profiles/${id}?t=${Date.now()}`;
  const res = await fetch(url, { cache: "no-store" });
  if (res.ok) {
    return url;
  }
};
const getUserFromJwt = ()=>{
  // const cookie = Cookies.get("access_token");
  const cookie = cookies().get("access_token")?.value;
  if(cookie){
    const user = decode(cookie) as JWT;
    return user;
  }
}
export default async function Post({ blog }: { blog: Blog }) {
  const datetime = DateTime.fromISO(blog.createdAt.slice(0,-1) +"+06:30").setZone("UTC+06:30");
  const timeDiffString = datetime.toRelative({base: DateTime.now()});
  const hidden = !blog.image;
  const username = await getAuthorName(blog.author_id);
  const authorProfile = await getProfileById(blog.author_id);
  
  return (
    <div className="  h-52 w-11/12 max-w-lg mx-auto border bg-base-100 rounded-md shadow-md my-4">
      <div className=" h-full w-full">
        <div className=" flex w-full h-2/6 pt-1 pl-1  ">
          {!hidden && (
            <div className={` ${hidden ? 'hidden' : null} h-full w-1/4`}>
              <Image
                src={`${process.env.NEXT_PUBLIC_NEST_SERVER}/api/files/blogimages/${blog.id}` || Default}
                className=" w-full h-full"
                width={300}
                height={300}
                alt="Article Image"
              />
            </div>
          )}

          <div className=" w-3/4 h-full">
            <div className=" h-1/3 pl-1 font-medium">{blog.title}</div>
            <div className=" flex items-center h-1/3 pl-1 span">
              <Link
                href={`/profile/${blog.author_id}`}
                className=" z-50 h-full flex"
              >
                <span className=" avatar h-4/6 my-auto aspect-square">
                  <Image
                    src={authorProfile || Default}
                    width={2}
                    height={2}
                    className=" rounded-full"
                    alt="author profile"
                  />
                </span>
                <span className=" ml-1 flex items-center">{username}</span>
              </Link>
            </div>
            <div className=" h-1/3 pl-1 text-accent">{timeDiffString}</div>
          </div>
          {/* <div
            className={` cursor-pointer relative ${
              hidden ? ' -right-24' : 'right-2'
            }`}
          >
            ...
          </div> */}
        </div>

        <div className=" break-words overflow-hidden w-full h-3/6 pt-1 pl-1 pr-1">
          {blog.content}
        </div>
        <div className=" h-1/6 flex z-50">
          <Reaction blog={blog} key={blog.id} currentUser={getUserFromJwt()?.id} />
          <CommentIcon commentCount={blog.comment_count} key={blog.id} />
          <Link
            href={`/blog/${blog.id}`}
            className=" block link-primary underline ml-1"
            style={{ marginTop: -2 }}
          >
            read more
          </Link>
        </div>
      </div>
    </div>
  );
}
