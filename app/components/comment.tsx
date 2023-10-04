"use client"
import Link from "next/link";
import { useState } from "react";

export default function Comment({author,content,id}:{author:string,content:string,id:number}) {
    const [comment,setComment] = useState(content)
    const HandleModal = ()=>{
        const myModal = document.getElementById(`edit_comment_modal_${id}`) as HTMLDialogElement;
        return {
            showModal: ()=>{
                if (myModal) {
                    myModal.showModal();
                }
            },
            closeModal: ()=>{
                if(myModal) {
                    myModal.close();
                }
            }
        }
      }
    return(
        <div className=" ml-4">
            <div className=" shadow-sm my-2 bg-base-100 inline-block border rounded-md mx-2 border-gray-300 max-w-7xl">
                <h1 className=" px-2 border-b font-normal text-lg">From: <Link href={`/profile/1`} className=" link-info link-hover">{author}</Link>
                <span className="dropdown dropdown-bottom dropdown-end relative float-right -top-2 pl-2">
                    <label  tabIndex={0} className=" cursor-pointer">...
                        <dialog id={`edit_comment_modal_${id}`} className="modal">
                            <div className="modal-box">
                                <h3 className="ml-1">Edit comment</h3>
                                <textarea className="block input w-11/12  ml-1 mt-1 border border-blue-600 textarea
                     min-h-16" value={comment} onChange={(e)=>setComment(e.target.value)} />
                                <div className=" modal-action">
                                    <button className=" btn btn-sm " onClick={()=>HandleModal().closeModal()}>cancle</button>
                                    <button className=" btn btn-sm btn-primary" onClick={()=>HandleModal().closeModal()}>ok</button>
                                </div>
                            </div>
                        </dialog>
                    </label>
                    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                        <li onClick={()=>HandleModal().showModal()} className=" dropdown_item">EDIT</li>
                        <li className=" dropdown_item hover:bg-error active:bg-error-content">DELETE</li>
                    </ul>
                </span>
                </h1>
                <span className=" inline-block pt-1 px-2">
                    {comment}
                </span>
            </div>
        </div>
    )
}