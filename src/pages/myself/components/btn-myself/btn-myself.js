import { useState } from 'react';
import { useAuth } from '../../../../contexts/auth_context';
import MyselfMenu from '../myself-menu/myself-menu.component';
import './btn-myself.css';
const BtnMyself = () => {
    const { currentUser } = useAuth();
    const [hiddenPersonMenu, setHiddenPersonMenu] = useState(true);

    return (
        <>
            {!hiddenPersonMenu ? <div id="overlap-when-show-myselfmenu" onClick={() => setHiddenPersonMenu(!hiddenPersonMenu)}></div> : null}
            {currentUser ?
                <div className="myself-actions">
                    <button className="btn-myself" onClick={() => setHiddenPersonMenu(!hiddenPersonMenu)}>
                        <img src={currentUser.photoURL} alt="avatar"></img>
                    </button>
                    {!hiddenPersonMenu ? <MyselfMenu /> : null}
                </div>
                : null}
        </>
    )
}

export default BtnMyself;