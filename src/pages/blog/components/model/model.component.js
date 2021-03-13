import { useEffect, useRef } from "react";
import { connect } from "react-redux";

const ModelPreview = ({ blogInfo: { content } }) => {
    const contentPreviewRef = useRef(null);
    useEffect(() => {
        contentPreviewRef.current.innerHTML = content;
    }, [content])
    return (
        <div className="modal fade bd-modal-preview" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="modelPublishedLongTitle"><i className="fa fa-eye"></i> Xem trước</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="ck-content">
                            <div ref={contentPreviewRef} style={{ padding: '0px 20px' }}></div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = ({ blog }) => ({
    blogInfo: blog.blogInfo
})
export default connect(mapStateToProps)(ModelPreview);