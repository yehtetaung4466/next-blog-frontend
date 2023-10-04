"use client"
import Image from "next/image"
import Link from "next/link"
import Default from '@/public/default.jpeg'
import { useParams, useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
export default function Nav() {
  const route = useRouter();
 
  const params = useSearchParams();
  const handleLogout = ()=>{
    Cookies.remove("access_token");
    const page = params.get("page");
    route.push(`/home?page=${page ? page:1}`);
    route.refresh();
  }
  const isLogin = params.get("isLogin");

  const LoginNav = <div className="flex-none mr-4">
  <button className=" btn-sm btn btn-primary btn-outline mr-2 md:mr-3">create</button>
  <div className="dropdown dropdown-end">
    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
      <div className="w-10 rounded-full">
        <Image src={Default} width={0} height={0} alt="profile photo"/>
      </div>
    </label>
    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
      <li>
        <Link href={`/profile/1`} className="justify-between">
          Profile
        </Link>
      </li>
      <li className=" dropdown_item ml-2 hover:bg-warning active:bg-warning-content" onClick={handleLogout}>Logout</li>
    </ul>
  </div>
</div>;

  const NotLoginNav = <div className=" flex items-center mr-2 sm:mr-3 md:mr-4">
    <Link href={`/signup`} className=" btn btn-sm btn-outline mr-2 btn-primary">signup</Link>
    <Link href={`/login`} className=" btn btn-sm btn-outline btn-secondary">login</Link>
  </div>

    return(
<div className="navbar z-[60] bg-base-100 sticky top-0 opacity-80 border-b shadow-sm">
  <div className="flex-1">
    <a className=" ml-4 font-semibold normal-case text-xl">My blog</a>
  </div>
  {isLogin==="true" ? LoginNav: NotLoginNav}
</div>
)
}