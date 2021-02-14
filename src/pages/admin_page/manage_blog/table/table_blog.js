import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
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

export const TableBlog = () => {
    const [blogsFound, setBlogsFound] = useState([]);
    const [currentRow, setCurrentRow] = useState({})
    useEffect(() => {
        getBlogFound();
    }, [])

    const getBlogFound = async () => {
        let rs = await BlogService.find();
        if (typeof rs.msg === 'undefined') {
            if (rs.result === 'ok') setBlogsFound(rs.data);
            else console.log(rs.message);
        } else {
            console.log(rs.msg);
        }
    }

    const handleSetCurrent = (row) => {
        setCurrentRow(row);
    }

    const handlePublish = async () => {
        let val = currentRow.published ? false : true;
        let rs = await BlogService.modify(currentRow._id, { published: val });
        if (typeof rs.msg === 'undefined') {
            if (rs.result === 'ok') {
                console.log("publish successfully!");
                getBlogFound();
            } else {
                console.log(rs.message);
            }
        } else {
            console.log(rs.msg);
        }
    }
    const columns = [
        {
            name: "Title",
            selector: "title",
            sortable: true,
            maxWidth: '400px'
        },
        {
            name: "Summary",
            selector: "summary",
            sortable: true,
            maxWidth: '500px',
            minWidth: '400px'
        },
        {
            name: "Image",
            selector: "image",
            maxWidth: '400px',
            cell: row => <a href={`${row.image}`} target='blank'>{row.image}</a>
        },
        {
            name: "Tags",
            selector: "tag",
            maxWidth: '300px',
            cell: row => <div>{row.tags.map(el => {
                return <div style={{ backgroundColor: '#EBEBEB', borderRadius: '15px', padding: '5px 9px', margin: '5px 5px 5px 0px', display: 'inline-block' }} key={el._id}>{el.tagName}</div>
            })}</div>
        },
        {
            name: "Author",
            selector: "author",
            maxWidth: "200px",
            sortable: true,
            cell: row => <p style={{ margin: 0 }}>{row.author.username}</p>
        },
        {
            name: "Create at",
            selector: "createAt",
            maxWidth: "200px"
        },
        {
            name: "Modify at",
            selector: "modifyAt",
            maxWidth: "200px"
        },
        {
            name: "Published",
            selector: "published",
            center: true,
            maxWidth: "100px",
            cell: row => <button onClick={() => handleSetCurrent(row)}
                className={row.published ? 'btn btn-danger' : 'btn btn-success'}
                style={{ color: '#fff', fontSize: '14px' }}
                data-toggle="modal" data-target="#exampleModalCenter">{row.published ? 'Cancel post' : 'Post'}</button>
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
            maxWidth: "200px"
        }
    ];
    return (
        <div style={{ width: '100%' }}>
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
            <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLongTitle">Do you want to public the post?</h5>
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
                            <button type="button" className="btn btn-primary" onClick={handlePublish} data-dismiss="modal">{currentRow.published ? 'Cancel post' : 'Public'}</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}