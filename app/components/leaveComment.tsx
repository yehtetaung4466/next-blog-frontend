"use client"

import { useState } from "react";

export default function LeaveComment() {
    const [comment,setComment] = useState("fadsfas")
    
      const HandleModal = ()=>{
        const myModal = document.getElementById('leave_comment_modal') as HTMLDialogElement;
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
        <div>
            <button onClick={()=>HandleModal().showModal()} className=' btn btn-primary btn-xs my-1 ml-6'>leave comment</button>
            <dialog id="leave_comment_modal" className=" modal">
                <div className=" modal-box">
                    <h1 className=" ml-1">Leave comment</h1>
                    <textarea className="block input w-11/12  ml-1 mt-1 border border-blue-600 textarea
                     min-h-16" value={comment} onChange={(e)=> setComment(e.target.value)}/>
                    <div className=" modal-action">
                            <button className=" btn btn-sm " onClick={()=>HandleModal().closeModal()}>cancle</button>
                            <button className=" btn btn-sm btn-primary" onClick={()=>HandleModal().closeModal()}>ok</button>
                    </div>
                </div>
            </dialog>
        </div>
      )
}