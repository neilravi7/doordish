import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";

const ProfileButton = () => {
    return (
        <Link className='me-2 btn' to={"/customer/profile"}><FaUserCircle size={30} /></Link>
    )

}
export default ProfileButton;