"use client"
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Cookies from "js-cookie";
import Default from '@/public/default.jpeg';
import Image from "next/image";
import { getUserFromJwt } from "../helpers/getUserFromJwt";
import { useEffect, useState } from "react";
import { JWT } from "../utils/types";


export default function IfLogin() {
  const [user,setUser] = useState<JWT>();  
  const route = useRouter();
  const params = useSearchParams();
  const page = params.get('page');

  useEffect(()=>{
    setUser(getUserFromJwt());
  },[]);
    const handleLogout = () => {
        Cookies.remove("access_token")
        route.push(`/home?page=${page ? page : 1}`);
        route.refresh();
        setTimeout(() => {
        setUser(undefined);
        }, 800);
    };
      
    if(user) {
       return(
        <div className="flex-none mr-4">
        <Link href={`/create`} className=" btn-sm btn btn-primary btn-outline mr-2 md:mr-3">
          create
        </Link>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <Image src={Default} width={0} height={0} alt="profile photo" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <span
               className="justify-between"
               onClick={()=>{
                route.push(`/profile/${user.id}`);
                route.refresh();
               }}
               >
                Profile
              </span>
            </li>
            <li
              className=" dropdown_item ml-2 hover:bg-warning active:bg-warning-content"
              onClick={handleLogout}
            >
              Logout
            </li>
          </ul>
        </div>
      </div>
       )
    }

    return(
        <div className=" flex items-center mr-2 sm:mr-3 md:mr-4">
      <Link
        href={`/signup`}
        className=" btn btn-sm btn-outline mr-2 btn-primary"
      >
        signup
      </Link>
      <Link href={`/login`} className=" btn btn-sm btn-outline btn-secondary">
        login
      </Link>
    </div>
    )
}
