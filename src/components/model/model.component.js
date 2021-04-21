import { useEffect } from "react";

const Model = ({ targetModel, data, handleEvent }) => {
    useEffect(()=>{
        
    }, [data]);
    return <div className="modal fade" id={targetModel} tabIndex="-1" role="dialog" aria-labelledby="title" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="title">{data.name}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    {data.title}
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Bỏ qua</button>
                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => handleEvent(data.id, data.title)}>{data.eventName}</button>
                </div>
            </div>
        </div>
    </div>
}

export default Model;