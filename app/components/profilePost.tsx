import Link from 'next/link';

export default function ProfilePost({
  title,
  id,
  inspect,
  username,
  activeTab,
}: {
  title: string;
  id: number;
  inspect: boolean;
  username: string;
  activeTab: 'posts' | 'activity';
}) {
  console.log(activeTab);
  return (
    <div
      className={`bg-base-300 rounded-full border px-2 py-1 my-2 ml-3 w-fit ${
        activeTab === 'activity' ? 'hidden' : null
      }`}
    >
      {inspect ? username : 'you'}{' '}
      <span className=" text-success">created</span> a post of title{' '}
      <Link href={`/blog/${id}`} className=" text-info underline">
        {title}
      </Link>
    </div>
  );
}
