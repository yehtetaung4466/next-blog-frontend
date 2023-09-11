import Image from "next/image"
import Default from '@/public/default.jpeg'
export default function Nav() {
    return(
<div className="navbar bg-base-100">
  <div className="flex-1">
    <a className=" ml-4 font-semibold normal-case text-xl">My blog</a>
  </div>
  <div className="flex-none mr-4">
    <button className=" btn-sm btn btn-primary btn-outline mr-2 md:mr-3">create</button>
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <Image src={Default} width={0} height={0} alt="profile photo"/>
        </div>
      </label>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
        <li>
          <a className="justify-between">
            Profile
          </a>
        </li>
        <li><a>Logout</a></li>
      </ul>
    </div>
  </div>
</div>
)
}