import Default from '@/public/default.jpeg'
import Image from "next/image"
import Link from 'next/link'
import {text} from '@/app/utils/text'
import Like from './like';
import Dislike from './dislike';
import CommentIcon from './commentIcon';
import { Blog } from '../utils/types';
export default function Post({blog}:{blog:Blog}) {
    const hidden = !blog.image;
    return(
        <div className="  h-52 w-11/12 max-w-lg mx-auto border bg-base-100 rounded-md shadow-md my-4">

            <div  className=' h-full w-full'>
                <div className=" flex w-full h-2/6 pt-1 pl-1 ">

                {hidden && <div className={` ${hidden ? 'hidden': null} h-full w-1/4` }>
                    <Image src={blog.image || Default} className=' w-full h-full' width={0} height={0} alt='Article Image'/>
                </div>}

                <div className=' w-3/4 h-full'>
                    <div className=' h-1/3 pl-1 font-medium'>{blog.title}</div>
                    <div className=' flex items-center h-1/3 pl-1 span'>
                        <Link href={`/profile/${blog.author_id}`} className=' z-50 h-full flex'>
                            <span className=' avatar h-4/6 my-auto'>
                                <Image src={null || Default} className=' rounded-full' alt='author profile'/>
                            </span>
                            <span className=' text-xs flex items-center'>
                                {blog.author_id}
                            </span>
                        </Link>
                    </div>
                    <div className=' h-1/3 pl-1 text-accent'>1 minute ago</div>
                </div>
                <div className={` cursor-pointer relative ${hidden ? ' -right-24': 'right-2'}`}>...</div>
                </div>

                <div className=' overflow-hidden h-3/6 pt-1 pl-1'>
                {blog.content} 
                </div><span className=' relative float-right -mt-7 mr-7'>...</span>
                <div className=' h-1/6 flex z-50'>
                <Like />
                <Dislike />
                <CommentIcon />
                <Link href={`/blog/1`} className=" block link-primary underline ml-1" style={{marginTop:-2}}>read more</Link>
                </div>
            </div>
            
        </div>
    )
}