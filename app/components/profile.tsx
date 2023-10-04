"use client"
import { useState, ChangeEvent } from "react";
import Image from "next/image";
import Default from "@/public/default.jpeg";
import { useRouter } from "next/navigation";
export default function UserProfile() {
  const [file, setFile] = useState<File | null>(null);
  const [username,setUsername] = useState("Ye Htet Aung");
  const route = useRouter();

  const handleFileUpload = (event: any) => {
    if(event.target.files) {
        const selectedFile = event.target.files[0];
        setFile(selectedFile);
    }
    
  };

  const handleImageClick = () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.style.display = "none";
    fileInput.addEventListener("change", handleFileUpload);
    document.body.appendChild(fileInput);
    fileInput.click();
  };

  const showModal = () => {
    const myModal = document.getElementById('my_modal_1') as HTMLDialogElement;
    if (myModal) {
      myModal.showModal();
    }
  }

  return (
      <main className="h-1/4 max-w-lg mx-auto bg-yellow-300">
        <div className="flex h-full">
          <div
            className="flex justify-center items-center h-full w-1/2"
            onClick={handleImageClick}
          >
            <Image src={null || Default} alt="profile picture" height={115} />
          </div>
          <div className="h-full w-1/2">
            <div className=" ml-5 mt-3 font-medium">
              Ye Htet Aung <div className=" dropdown dropdown-end">
              <label tabIndex={0} className=" cursor-pointer ml-1 relative bottom-1">...</label>
                  <ul tabIndex={0} className=" dropdown-content bg-base-100 menu w-44 rounded-md border">
                    <button onClick={showModal} className=" text-start cursor-pointer hover:bg-base-300 py-1 pl-1 rounded-md active:bg-neutral active:text-white ease-linear duration-100">change username</button>
                      <dialog id="my_modal_1" className="modal">
                        <div className=" h-24 w-3/4 max-w-sm bg-base-200 rounded-md ">
                          <input type="text" value={username} onChange={(e)=> setUsername(e.target.value)} className=" block input w-11/12  ml-1 mt-1 border border-blue-600 " />
                          <form method="dialog" className=" block">
                          <button onClick={()=>alert('button clicked')} className=" btn btn-neutral btn-sm mt-1 ml-1">okay</button>
                          <button className=" btn btn-sm mt-1 ml-1">back</button>
                        </form>
                        </div>
                       
                      </dialog>
                      <li onClick={handleImageClick} className=" text-start cursor-pointer hover:bg-base-300 py-1 pl-1 rounded-md active:bg-neutral active:text-white ease-linear duration-100">change profile photo</li>
                    </ul>
              </div>
            </div>
            <div className=" ml-5">userId: 1</div>
            <div className=" ml-5">since: 2023-3-4</div>
            <div onClick={()=> route.back()} className=" cursor-pointer link-accent link-hover ml-5">back</div>
            <div></div>
          </div>
        </div>
     
      </main>
  );
}