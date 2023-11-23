'use client';
import Back from '../components/Back';
import { ChangeEvent, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

export default function CreatePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<any>();
  const route = useRouter();

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    setImage(fileList[0]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_NEST_SERVER}/api/blogs`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${Cookies.get('access_token')}`,
        },
        body: formData,
      },
    );
    if (!res.ok) {
      throw new Error('uploading a new post failed');
    }
    route.push('/home');
    route.refresh();
  };

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <form className="form-control w-10/12 max-w-xs" onSubmit={handleSubmit}>
        <label htmlFor="title">title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="content">content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          id="content"
          name="content"
          className="textarea textarea-bordered border-gray-500 focus:outline-none textarea-lg"
        />
        <div className="flex">
          <input
            type="file"
            accept="image/*"
            name="image"
            id="image"
            onChange={handleImageChange}
          />
        </div>
        <div className="flex">
          <input
            type="submit"
            value="create"
            className="btn btn-primary w-fit btn-xs mt-1"
          />
          <span className="mt-1">
            <button
              className=" btn btn-xs mb-2 ml-1"
              onClick={() => route.back()}
            >
              back
            </button>
          </span>
        </div>
      </form>
    </div>
  );
}
function useEffect(arg0: () => () => void, arg1: never[]) {
  throw new Error('Function not implemented.');
}
