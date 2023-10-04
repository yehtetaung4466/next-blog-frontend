
import Link from 'next/link'
import Image from "next/image"
import Default from '@/public/default.jpeg'
import { text } from '@/app/utils/text';
import Like from '@/app/components/like';
import Dislike from '@/app/components/dislike';
import CommentIcon from '@/app/components/commentIcon';
import LeaveComment from '@/app/components/leaveComment';
import Comment from '@/app/components/comment';


export default function BlogPage() {
    const hidden = false;
    const array = [text,text.slice(0,10),"fjeoiuafoiadoif","kfuoiuafoidua"]
    return(
        <div className=" h-screen w-screen">
            <div className=" h-1/6 w-full pl-6 pt-3">
                
                <div className=" w-full h-full max-w-xs sm:ml-2 ml-1 flex">
                    <div className={` ${hidden ? 'hidden': null} h-full w-1/2` }>
                        <Image src={null || Default} className=' w-full h-full' width={0} height={0} alt='Article Image'/>
                        
                    </div>
                    <div className=' w-1/2 h-full'>
                            <div className=' h-1/3 pl-1 font-medium'>Php sucks</div>
                            <div className=' flex items-center h-1/3 pl-1 span'>
                            <Link href={'/profile/1'} className=' z-50 h-full flex'>
                            <span className=' avatar h-4/6 my-auto'>
                                <Image src={null || Default} className=' rounded-full' alt='author profile'/>
                            </span>
                            <span className=' text-xs flex items-center'>
                                Ye Htet Aung
                            </span>
                        </Link>
                        </div>
                        <div className=' h-1/3 pl-1 text-accent'>1 minute ago</div>
                    </div>
                </div>

            </div>
            <div className=' pt-2  px-7 '>{text} {text} {text}</div>
            <div className="flex border-x border-b pl-4 shadow-sm">
                <Like/>
                <Dislike />
                <CommentIcon />
            </div>
            <LeaveComment />
            {array.map((value,index)=>{
                return <Comment author={`Ye Htet Aung`} content={value} key={index} id={index} />
            })}
        </div>
    )
}