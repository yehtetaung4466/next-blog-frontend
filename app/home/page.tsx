import Post from '@/app/components/post';
import { Blog } from '../utils/types';
import NoPost from '../components/noPost';
import Paginate from '../components/paginate';

async function getBlogs(p: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NEST_SERVER}/api/blogs?paginate=${p}`,
    {
      cache: "no-store",
    },
  );
  if (res.ok) {
    if (res.status === 204) {
      return 0;
    }
    const body = (await res.json()) as Blog[];
    return body;
  }
}
export default async function HomePage({
  params,
  searchParams,
}: {
  params: undefined;
  searchParams: { page: string; isLogin: string };
}) {
  const blogs = await getBlogs(Number(searchParams.page));
  if(blogs===undefined) throw new Error("Can't get posts");
  if (blogs !== 0 && blogs) {
    return blogs.map((b) => {
      return(
        <>
        <Post blog={b} key={b.id} />
        <Paginate noPost={false} />
        </>
      );
    });
  }
  return(
    <>
    <NoPost />
    <Paginate noPost={true} />
    </>
  );
}
