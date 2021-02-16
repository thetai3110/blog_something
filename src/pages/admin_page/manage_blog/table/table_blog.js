import React, { useEffect, useState } from "react";
import { useRef } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { toast } from "../../../../components/shared/toast_component/toast";
import { BlogService } from "../../../../services/blog.service";

const BootyCheckbox = React.forwardRef(({ onClick, ...rest }, ref) => (
    <div className="custom-control custom-checkbox">
        <input
            type="checkbox"
            className="custom-control-input"
            ref={ref}
            {...rest}
        />
        <label className="custom-control-label" onClick={onClick} />
    </div>
));

export const TableBlog = (props) => {
    const TAG = "TableBlog";
    const contentPreviewRef = useRef(null);
    const [blogsFound, setBlogsFound] = useState([]);
    const [currentRow, setCurrentRow] = useState({})
    useEffect(() => {
        // Fetch data
        getBlogFound();
    }, [])
    // Get blog data
    const getBlogFound = async () => {
        let rs = await BlogService.find();
        if (typeof rs.msg === 'undefined') {
            if (rs.result === 'ok') setBlogsFound(rs.data);
            else console.log(TAG + ': ' + rs.message);
        } else {
            console.log(TAG + ': ' + rs.msg);
        }
    }
    // Set row clicked
    const handleSetCurrent = (row, isModelPublished) => {
        // set row
        setCurrentRow(row);
        // Content preview
        if (!isModelPublished) {
            contentPreviewRef.current.innerHTML = row.content;
        }
    }
    // Published post
    const handlePublish = async () => {
        let val = currentRow.published ? false : true;
        let rs = await BlogService.modify(currentRow._id, { published: val });
        if (typeof rs.msg === 'undefined') {
            if (rs.result === 'ok') {
                toast({ title: "Success!", message: `${val === true ? 'The post was published.' : 'The post was canceled.'}`, type: "success", duration: 3000 });
                getBlogFound();
            } else {
                toast({ title: "Failed!", message: `Failed at: ${rs.message}`, type: "error", duration: 3000 });
            }
        } else {
            toast({ title: "Failed!", message: `Failed at: ${rs.msg}`, type: "error", duration: 3000 });
            console.log(TAG + ': ' + rs.msg);
        }
    }
    // Delete
    const handleDelete = async () => {
        let rs = await BlogService.delete(currentRow._id);
        if (typeof rs.msg === 'undefined') {
            if (rs.result === 'ok') {
                toast({ title: "Success!", message: 'The post was deteted.', type: "success", duration: 3000 });
                getBlogFound();
            } else {
                toast({ title: "Failed!", message: `Failed at: ${rs.message}`, type: "error", duration: 3000 });
            }
        } else {
            toast({ title: "Failed!", message: `Failed at: ${rs.msg}`, type: "error", duration: 3000 });
            console.log(TAG + ': ' + rs.msg);
        }
    }
    // Redirect to modify page
    const handelRedirectModify = () => {
        props.history.push('/admin/blog/create', currentRow);
    }
    // Column table
    const columns = [
        {
            name: "Title",
            selector: "title",
            sortable: true,
            maxWidth: '300px',
            minWidth: '200px',
            cell: row => <div data-toggle="tooltip" data-placement="bottom"
                title={row.title}
                style={{ whiteSpace: 'pre-wrap', overflow: 'hidden', textOverflow: 'ellipsis', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', display: '-webkit-box' }}>
                {row.title}
            </div>
        },
        {
            name: "Summary",
            selector: "summary",
            sortable: true,
            maxWidth: '500px',
            minWidth: '250px',
            cell: row => <div data-toggle="tooltip" data-placement="bottom"
                title={row.summary}
                style={{ whiteSpace: 'pre-wrap', overflow: 'hidden', textOverflow: 'ellipsis', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', display: '-webkit-box' }}>
                {row.summary}
            </div>
        },
        {
            name: "Image",
            selector: "image",
            maxWidth: '400px',
            minWidth: '200px',
            cell: row => <a href={`${row.image}`} target='blank'>{row.image}</a>
        },
        {
            name: "Tags",
            selector: "tag",
            maxWidth: '300px',
            minWidth: '175px',
            cell: row => <div>{row.tags.map(el => {
                return <div style={{ backgroundColor: '#EBEBEB', borderRadius: '15px', padding: '5px 9px', margin: '5px 5px 5px 0px', display: 'inline-block' }} key={el._id}>{el.tagName}</div>
            })}</div>
        },
        {
            name: "Author",
            selector: "author",
            maxWidth: "150px",
            sortable: true,
            cell: row => <p style={{ margin: 0 }}>{row.author.username}</p>
        },
        {
            name: "Create at",
            selector: "createAt",
            maxWidth: "200px",
            cell: row => <div data-toggle="tooltip" data-placement="bottom"
                title={row.createAt}
                style={{ whiteSpace: 'pre-wrap', overflow: 'hidden', textOverflow: 'ellipsis', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', display: '-webkit-box' }}>
                {row.createAt}
            </div>
        },
        {
            name: "Modify at",
            selector: "modifyAt",
            maxWidth: "200px",
            cell: row => <div data-toggle="tooltip" data-placement="bottom"
                title={row.modifyAt}
                style={{ whiteSpace: 'pre-wrap', overflow: 'hidden', textOverflow: 'ellipsis', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', display: '-webkit-box' }}>
                {row.modifyAt}
            </div>
        },
        {
            name: "Published",
            selector: "published",
            center: true,
            maxWidth: "200px",
            minWidth: '130px',
            cell: row => <button onClick={() => handleSetCurrent(row, true)}
                className={row.published ? 'btn btn-danger' : 'btn btn-success'}
                style={{ color: '#fff', fontSize: '14px' }}
                data-toggle="modal" data-target="#modelPublished">{row.published ? 'Cancel post' : 'Post'}</button>
        },
        {
            name: "Published By",
            selector: "publishedBy",
            maxWidth: "200px",
            sortable: true,
        },
        {
            name: "Published At",
            selector: "publishedAt",
            maxWidth: "200px",
            cell: row => <div data-toggle="tooltip" data-placement="bottom"
                title={row.publishedAt}
                style={{ whiteSpace: 'pre-wrap', overflow: 'hidden', textOverflow: 'ellipsis', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', display: '-webkit-box' }}>
                {row.publishedAt}
            </div>
        },
        {
            name: "Preview",
            maxWidth: "100px",
            cell: row => <button style={{ border: 'none', background: 'transparent', fontSize: '18px', outline: 0 }}
                data-toggle="modal" data-target=".bd-modal-preview"
                onClick={() => handleSetCurrent(row, false)}><i className="fa fa-eye"></i></button>
        }
    ];
    return (
        <div style={{ width: '100%' }}>
            <div id="toast-custom"></div>
            <div className="card">
                <DataTable
                    title="Blog"
                    columns={columns}
                    data={blogsFound}
                    defaultSortField="title"
                    pagination
                    selectableRows
                    selectableRowsComponent={BootyCheckbox}
                />
            </div>
            <div style={{ padding: '25px 0px', fontSize: '16px', fontWeight: '500' }}><Link to="/admin/blog/create">Create a new blog...</Link></div>
            {/* Model published */}
            <div className="modal fade" id="modelPublished" tabIndex="-1" role="dialog" aria-labelledby="modelPublishedTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modelPublishedLongTitle">Do you want to public the post?</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            - Post: <br></br>
                            Id: {currentRow._id} <br></br>
                            Title: {currentRow.title}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-info" onClick={handlePublish} data-dismiss="modal">{currentRow.published ? 'Cancel post' : 'Publish'}</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Model preview */}
            <div className="modal fade bd-modal-preview" tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="modelPublishedLongTitle"><i className="fa fa-eye"></i> Preview</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="ck-content">
                                <div ref={contentPreviewRef} style={{ padding: '0px 20px' }}></div>
                            </div>
                        </div>
                        <div className="modal-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <div>
                                <button type="button" style={{ marginRight: '10px' }} className="btn btn-danger" onClick={handleDelete} data-dismiss="modal">Delete</button>
                                <button type="button" className="btn btn-info" onClick={handelRedirectModify} data-dismiss="modal">Modify</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}