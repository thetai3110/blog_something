import { Link } from 'react-router-dom';
import Model from '../../../../components/model/model.component';
import { DropdownIcon } from '../myself/myself-styled.component';

export const DropdownButton = ({ data, handleEvent }) => {
    return (
        <DropdownIcon>
            <a style={{ color: 'gray' }} href="#" role="button" id="dropdown-action" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i className="fa fa-angle-down" aria-hidden="true"></i>
            </a>
            <div className="dropdown-menu" aria-labelledby="dropdown-action">
                <Link className="dropdown-item" to={`/blog/modify/${data.id}`}>Sửa</Link>
                <a className="dropdown-item" href="#" data-toggle="modal" data-target={`#${data.id}`}>Xóa</a>
                <a className="dropdown-item" href="#">Thiết lập</a>
            </div>
            <Model data={{ name: 'Bạn muốn xóa bài này?', id: data.id, title: data.title, eventName: 'Xóa' }} targetModel={data.id} handleEvent={(id, title) => handleEvent(id, title)} />
        </DropdownIcon>
    )
}