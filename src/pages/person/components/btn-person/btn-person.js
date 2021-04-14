import { useState } from 'react';
import { useAuth } from '../../../../contexts/auth_context';
import PersonMenu from '../person-menu/person-menu.component';
import './btn-persion.css';
const BtnPerson = () => {
    const { currentUser } = useAuth();
    const [hiddenPersonMenu, setHiddenPersonMenu] = useState(true);

    return (
        <>
            {!hiddenPersonMenu ? <div id="overlap-when-show-personmenu" onClick={() => setHiddenPersonMenu(!hiddenPersonMenu)}></div> : null}
            {currentUser ?
                <div className="person-actions">
                    <button className="btn-person" onClick={() => setHiddenPersonMenu(!hiddenPersonMenu)}>
                        <img src={currentUser.photoURL} alt="avatar"></img>
                    </button>
                    {!hiddenPersonMenu ? <PersonMenu /> : null}
                </div>
                : null}
        </>
    )
}

export default BtnPerson;