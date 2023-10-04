import Nav from "../components/nav";
import Paginate from "../components/paginate";

export default function HomeLayout({children}:{children:React.ReactNode}) {
    return(
        <div>
            <Nav/>
            {children}
            <Paginate />
        </div>
    )

}