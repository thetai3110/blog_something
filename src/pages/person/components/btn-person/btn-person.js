import { useAuth } from '../../../../contexts/auth_context';
import './btn-persion.css';
const BtnPerson = () => {
    const { currentUser } = useAuth();

    return (
        <>
            {currentUser ? <button className="btn-person">
                <img src={currentUser.photoURL} alt="avatar"></img>
            </button> : null}
        </>
    )
}

export default BtnPerson;