'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { User } from '../utils/types';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { getUserFromJwt } from '../helpers/getUserFromJwt';
const getCommentAuthorById = async (id: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NEST_SERVER}/api/users/${id}`,
    {
      cache: 'no-store',
    },
  );
  if (res.ok) {
    const body = (await res.json()) as User;
    return body;
  }
  throw new Error("can't get comment author");
};
const editComment = async (commentId: number, context: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NEST_SERVER}/api/comments/${commentId}`,
    {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${Cookies.get('access_token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ context }),
    },
  );
  if (!res.ok) {
    const { msg } = (await res.json()) as { msg: string };
    alert(msg || 'editing failed');
  }
};
const deleteComment = async (commentId: number) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_NEST_SERVER}/api/comments/${commentId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${Cookies.get('access_token')}`,
        'Content-Type': 'application/json',
      },
    },
  );
  if (!res.ok) {
    const { msg } = (await res.json()) as { msg: string };
    alert(msg || 'deleting failed');
  }
};
export default function Comment({
  authorId,
  context,
  id,
}: {
  authorId: number;
  context: string;
  id: number;
}) {
  const [comment, setComment] = useState(context);
  const [author, setAuthor] = useState<User>();
  const [userId, setUserId] = useState<number>();
  const route = useRouter();
  useEffect(() => {
    const user = getUserFromJwt();
    if (user) {
      setUserId(user.id);
    }
    const fetchCommentAuthor = async () => {
      const author = await getCommentAuthorById(authorId);
      setAuthor(author);
    };
    fetchCommentAuthor();
  }, []);

  const HandleModal = () => {
    const myModal = document.getElementById(
      `edit_comment_modal_${id}`,
    ) as HTMLDialogElement;
    return {
      showModal: () => {
        if (myModal) {
          myModal.showModal();
        }
      },
      closeModal: () => {
        if (myModal) {
          myModal.close();
        }
      },
    };
  };
  return (
    <div className="ml-5 md:ml-7">
      <div className=" shadow-sm my-2 bg-base-100 inline-block border rounded-md mx-2 border-gray-300 max-w-7xl">
        <h1 className=" px-2 border-b font-normal text-lg">
          From:{' '}
          <Link href={`/profile/${authorId}`} className=" link-info link-hover">
            {author?.name}
          </Link>
          <span className="dropdown dropdown-bottom dropdown-end relative float-right -top-2 pl-2">
            <label
              tabIndex={0}
              className={` ${
                userId === authorId ? null : 'hidden'
              } cursor-pointer`}
            >
              ...
              <dialog id={`edit_comment_modal_${id}`} className="modal">
                <div className="modal-box">
                  <h3 className="ml-1">Edit comment</h3>
                  <textarea
                    className="block input w-11/12  ml-1 mt-1 border border-blue-600 textarea
                     min-h-16"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <div className=" modal-action">
                    <button
                      className=" btn btn-sm "
                      onClick={() => {
                        HandleModal().closeModal();
                        setComment(context);
                      }}
                    >
                      cancle
                    </button>
                    <button
                      className=" btn btn-sm btn-primary"
                      onClick={() => {
                        editComment(id, comment);
                        HandleModal().closeModal();
                        route.refresh();
                      }}
                    >
                      ok
                    </button>
                  </div>
                </div>
              </dialog>
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li
                onClick={() => HandleModal().showModal()}
                className=" dropdown_item"
              >
                EDIT
              </li>
              <li
                className=" dropdown_item hover:bg-error active:bg-error-content"
                onClick={() => {
                  deleteComment(id);
                  HandleModal().closeModal();
                  route.refresh();
                }}
              >
                DELETE
              </li>
            </ul>
          </span>
        </h1>
        <span className=" inline-block pt-1 px-2">{context}</span>
      </div>
    </div>
  );
}
