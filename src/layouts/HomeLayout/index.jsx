import { Outlet } from "react-router-dom";
import Navigation from "../../components/Navigation";


const HomeLayout = () => {
    return(
        <>
            <Navigation></Navigation>
            <main>
                <Outlet></Outlet>
            </main>
        </>
    )

}

export default HomeLayout;