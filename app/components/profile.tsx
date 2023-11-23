'use client';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Default from '@/public/default.jpeg';
import { useSearchParams } from 'next/navigation';
import { DateTime } from 'luxon';
import { Activity_t, Blog, User } from '../utils/types';
import Cookies from 'js-cookie';
import NotFound from './NotFound';
import Link from 'next/link';
import Back from './Back';
import Activity from './Activity';
import ProfilePost from './profilePost';
import {v4 as uuidv4} from 'uuid';
const getUserById = async(id:number)=>{
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NEST_SERVER}/api/users/${id}`,
    { cache: 'no-store' },
  );
  if (res.ok) {
    const body = (await res.json()) as User;
    return body;
  }
  if(res.status===404) {
    return 404;
  }
  throw new Error("can't get user")
}

const getBlogsByUserId= async(userId:number)=>{
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NEST_SERVER}/api/users/${userId}/blogs`,
    // {next:{revalidate: 60000}}
  );
  if(res.status===200) {
    const body = await res.json() as Blog[];
    return body;
  }
  if(res.status===204) {
    return;
  }
  throw new Error("can't get blogs");
}
const getActivityUserId= async(userId:number)=>{
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NEST_SERVER}/api/users/${userId}/activities`,
    {cache:'no-store'}
  );
  if(res.ok) {
    const body = await res.json() as Activity_t[];
    return body;
  }
  throw new Error("can't get activitiess");
}
const getProfileById= async(userId:number)=>{
  const url = `${process.env.NEXT_PUBLIC_NEST_SERVER}/api/files/profiles/${userId}`
  const res = await fetch(
    url,
    {cache:'no-store'}
  );
  if(res.ok) {
    return url;
  }
  
}
export default function UserProfile({id}:{id:number}) {
  const [errorMsg,setErrorMsg] = useState<string>();
  const [user,setUser] = useState<User|404>();
  const [username, setUsername] = useState<string|undefined>('');
  const [blogs,setBlogs] = useState<Blog[]>()
  const [activities,setActivities] = useState<Activity_t[]>();
  const [profile,setProfile] = useState<string|undefined>();
  const params = useSearchParams();
  const inspect = (params.get('inspect') as 'true' | 'false') === "true";
  const activeTab = params.get('tab') as 'posts' | 'activity';
  const posts = blogs ? blogs.map((b)=><ProfilePost activeTab={activeTab} inspect={inspect} username={username||""} title={b.title} id={b.id} key={b.id}/>):<div className=' h-full text-2xl font-medium text-gray-400  flex justify-center items-center'>No post by {inspect ? username:"you"}</div>
  const atvs = activities && activities?.length!==0 ? activities.map(a=><Activity activeTab={activeTab} maker={username||""} activity={a} inspect={inspect} key={uuidv4()}/>):<div className=' h-full text-2xl font-medium text-gray-400  flex justify-center items-center'>No recent activity by {inspect ? username:"you"}</div>
  useEffect(()=>{
    try{
      const fetchUser = async()=>{
        const user = await getUserById(id);
        if(!user){
          setErrorMsg("can't get user");
        }
        setUser(user);
        if(user !==404) {
        setUsername(user.name);
        }
      }
      const fetchProfile= async()=>{
      const profile = await getProfileById(id);
      setProfile(profile);  
      }
        fetchProfile();
        fetchUser();
    }catch(err) {
      setErrorMsg("can't get user info")
    }
  },[id]);
  useEffect(()=>{
    const fetchBlogs = async()=>{
      const blogs = await getBlogsByUserId(id);
      setBlogs(blogs);
    }
    const fetchActivities = async()=>{
      const activities = await getActivityUserId(id);
      setActivities(activities);
    }
    if(activeTab==='posts'){
        fetchBlogs();
        setActivities(undefined);
    }
    if(activeTab==='activity'){
        fetchActivities();
        setBlogs(undefined);
    }
  },[activeTab,id])
  const handleFileUpload = async (event: any) => {
    if (event.target.files) {
      const selectedFile = event.target.files[0];
      try{
        const data = new FormData();
        data.set('image',selectedFile);
        const token = Cookies.get("access_token")
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_NEST_SERVER}/api/files/profiles?id=${id}`,{
            method:"POST",
            body:data,
            headers:{
              Authorization: `Bearer ${token}`
            },
          },
        );
        if(res.ok) {
          // route.refresh();
          setProfile(`${process.env.NEXT_PUBLIC_NEST_SERVER}/api/files/profiles/${id}?t=${Date.now()}`)
        }else{
          alert('profile upload failed')
        };
      }catch(err){
        setErrorMsg("profile upload error occurs")
      }
    }
  };

  const ChangeProfile = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.style.display = 'none';
    fileInput.addEventListener('change', handleFileUpload);
    document.body.appendChild(fileInput);
    fileInput.click();
  };

  const changeProfileName= async () => {
    const url = `${process.env.NEXT_PUBLIC_NEST_SERVER}/api/users/${id}`;
    const res = await fetch(url, {
      cache:"no-store",
      method:"PATCH",
      body: JSON.stringify({name:username}),
      headers:{
        'Authorization':`Bearer ${Cookies.get("access_token")}`,
        'Content-Type': 'application/json',
      }
    });
    if (res.ok) {
      setUser({...user as User,name:username} as User);
    }else{
    alert('changing username failed')
    }
  };
  const showModal = () => {
    const myModal = document.getElementById('my_modal_1') as HTMLDialogElement;
    if (myModal) {
      myModal.showModal();
    }
  };

  if(errorMsg) throw new Error(errorMsg);
  if(user===404) return <NotFound msg={"user not found"}/>
  return (
    <>
    <div className=' grid grid-cols-12 grid-rows-5 max-w-xl h-1/3 mx-auto'>
      <div className=" col-span-12 row-span-4">
        <div className=' flex w-full h-full'>
          <div className=' w-1/2 h-full flex items-center justify-center'>
            <Image src={profile || Default}
              alt="profile picture"
              className=' aspect-190/127'
              height={127}
              width={190} />
          </div>
          <div className=' w-1/2 h-full flex flex-col items-start justify-start'>
            <div className=" ml-5 mt-3 font-medium">
              {user && user.name}{' '}
              <div className=" dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className={` ${inspect? 'hidden':null} cursor-pointer ml-1 relative bottom-1`}
                >
                  ...
                </label>
                <ul
                  tabIndex={0}
                  className=" dropdown-content bg-base-100 menu w-44 rounded-md border"
                >
                  <button
                    onClick={showModal}
                    className=" text-start cursor-pointer hover:bg-base-300 py-1 pl-1 rounded-md active:bg-neutral active:text-white ease-linear duration-100"
                  >
                    change username
                  </button>
                  <dialog id="my_modal_1" className="modal">
                    <div className=" h-24 w-3/4 max-w-sm bg-base-200 rounded-md ">
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className=" block input w-11/12  ml-1 mt-1 border border-blue-600 " />
                      <form method="dialog" className=" block">
                        <button
                          onClick={changeProfileName}
                          className=" btn btn-neutral btn-sm mt-1 ml-1"
                        >
                          okay
                        </button>
                        <button className=" btn btn-sm mt-1 ml-1" onClick={() => {
                          setUsername(user?.name);
                        } }>back</button>
                      </form>
                    </div>
                  </dialog>
                  <li
                    onClick={ChangeProfile}
                    className=" text-start cursor-pointer hover:bg-base-300 py-1 pl-1 rounded-md active:bg-neutral active:text-white ease-linear duration-100"
                  >
                    change profile photo
                  </li>
                </ul>
              </div>
            </div>
            <div className=" ml-5 text-sm sm:text-base">id: {user && user.id}</div>
            <div className=" ml-5 text-sm sm:text-base">since: {user ? DateTime.fromISO(user.createdAt).toFormat("yyyy.M.dd") : null}</div>
            <span className=' ml-3'>
              <Back />
            </span>
            <div></div>
          </div>
        </div>
      </div>

      <div className='row-span-1 col-span-12 flex'>
        <div className=' h-full xsm:w-10 sm:w-1/12 xs:w-5 xs:block'></div>
        <span className='tabs tabs-boxed w-fit h-full'>
          <Link href={`/profile/${id}?tab=posts`} prefetch={true} replace={true} className={`tab ${activeTab === "posts" ? "tab-active" : null}`}>posts</Link>
          <Link href={`/profile/${id}?tab=activity`} prefetch={true} replace={true} className={`tab ${activeTab === "activity" ? "tab-active" : null}`}>activity</Link>
        </span>
      </div>
    </div>
    <div className=' max-w-lg overflow-auto h-2/3 scrollbar-hide  mx-auto'>
      {activeTab==='posts'?
      posts:
      atvs
      }
    </div>
    </>
  );
}
