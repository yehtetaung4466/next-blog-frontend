import UserProfile from "@/app/components/profile";


export default function HomeLayout({children}:{children:React.ReactNode}) {
    return(
        <div className=" h-screen w-screen">
            <UserProfile/>
            {children}
            
        </div>
    )

}