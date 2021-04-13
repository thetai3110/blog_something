import { useAuth } from '../../../../contexts/auth_context';
import PersonMenu from '../person-menu/person-menu.component';
import './btn-persion.css';
const BtnPerson = () => {
    const { currentUser } = useAuth();

    return (
        <>
            {currentUser ?
                <div className="person-actions">
                    <button className="btn-person">
                        <img src={currentUser.photoURL} alt="avatar"></img>
                    </button>
                    <PersonMenu />
                </div>
                : null}
        </>
    )
}

export default BtnPerson;