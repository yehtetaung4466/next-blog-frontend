'use client';

import { useReducer } from 'react';
import { Activity, Blog } from '../utils/types';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
type Reaction = 'neutral' | 'like' | 'dislike';

interface Action {
  type: 'like' | 'dislike' | 'none';
  payload?: any;
}

export default function Reaction({
  blog,
  currentUser,
}: {
  blog: Blog;
  currentUser: number | undefined;
}) {
  const route = useRouter();
  const makeReaction = async (reaction: 'like' | 'dislike') => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEST_SERVER}/api/reactions`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${Cookies.get('access_token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reaction, blogId: blog.id }),
      },
    );
    if (!res.ok) {
      dispatch({ type: 'none' });
    } else {
      // localStorage.setItem("activity",JSON.stringify([{username}] as Activity[]))
      route.refresh();
    }
  };

  const deleteReaction = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEST_SERVER}/api/reactions`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${Cookies.get('access_token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ blogId: blog.id }),
      },
    );
    if (!res.ok) {
      // alert("reaction failed");
      dispatch({ type: 'none' });
    } else {
      route.refresh();
    }
  };
  const initialReaction: Reaction =
    blog.reactions.find((r) => r.author_id === currentUser)?.reaction ||
    'neutral';
  const reactionReducer = (
    currentReaction: Reaction,
    action: Action,
  ): Reaction => {
    switch (action.type) {
      case 'like':
        if (currentReaction === 'like') {
          deleteReaction();
          return 'neutral';
        }
        makeReaction('like');
        return 'like';
      case 'dislike':
        if (currentReaction === 'dislike') {
          deleteReaction();
          return 'neutral';
        }
        makeReaction('dislike');
        return 'dislike';
      case 'none':
        return 'neutral';
      default:
        console.log(currentReaction);
        return currentReaction;
    }
  };
  const [reaction, dispatch] = useReducer(reactionReducer, initialReaction);
  const likeFilled = (
    <div
      onClick={() => dispatch({ type: 'like' })}
      className="z-50 reaction_switch fill-blue-500 "
    >
      <svg
        role="filled"
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
      >
        <path d="M720-120H320v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h218q32 0 56 24t24 56v80q0 7-1.5 15t-4.5 15L794-168q-9 20-30 34t-44 14ZM240-640v520H80v-520h160Z" />
      </svg>
    </div>
  );

  const likeUnfilled = (
    <div
      onClick={() => dispatch({ type: 'like' })}
      className="z-50 reaction_switch"
    >
      <svg
        role="unfilled"
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
      >
        <path d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z" />
      </svg>
    </div>
  );

  const dislikeFilled = (
    <div
      onClick={() => dispatch({ type: 'dislike' })}
      className=" reaction_switch fill-red-500 "
    >
      <svg
        role="filled"
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
      >
        <path d="M240-840h400v520L360-40l-50-50q-7-7-11.5-19t-4.5-23v-14l44-174H120q-32 0-56-24t-24-56v-80q0-7 1.5-15t4.5-15l120-282q9-20 30-34t44-14Zm480 520v-520h160v520H720Z" />
      </svg>
    </div>
  );

  const dislikeUnfilled = (
    <div
      onClick={() => dispatch({ type: 'dislike' })}
      className=" reaction_switch"
    >
      <svg
        role="unfilled"
        xmlns="http://www.w3.org/2000/svg"
        height="24"
        viewBox="0 -960 960 960"
        width="24"
      >
        <path d="M240-840h440v520L400-40l-50-50q-7-7-11.5-19t-4.5-23v-14l44-174H120q-32 0-56-24t-24-56v-80q0-7 2-15t4-15l120-282q9-20 30-34t44-14Zm360 80H240L120-480v80h360l-54 220 174-174v-406Zm0 406v-406 406Zm80 34v-80h120v-360H680v-80h200v520H680Z" />
      </svg>
    </div>
  );
  return (
    <>
      <div className="flex ">
        {reaction === 'like' ? likeFilled : likeUnfilled}
        <div className=" text-xs" style={{ marginTop: '3px' }}>
          {blog.likes}
        </div>
      </div>
      <div className="flex z-50">
        {reaction === 'dislike' ? dislikeFilled : dislikeUnfilled}
        <div className=" text-xs" style={{ marginTop: '3px' }}>
          {blog.dislikes}
        </div>
      </div>
    </>
  );
}
