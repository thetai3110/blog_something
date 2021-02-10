import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";
import { BlogService } from "../../../../services/blog.service";
import movies from "./movies";

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
    useEffect(() => {
        (async function () {
            let rs = await BlogService.find();
            if (typeof rs.msg === 'undefined') {
                setBlogsFound(rs.data);
            } else {
                console.log(rs.msg);
            }
        })();
    }, [])
    const handleClick = (e) =>{
        console.log(e)
    }
    const columns = [
        {
            name: "Title",
            selector: "title",
            sortable: true,
            maxWidth: "300px",
            format: row => `${row.title.slice(0, 10)}...`,
        },
        {
            name: "Summary",
            selector: "summary",
            maxWidth: "500px",
            sortable: true
        },
        {
            name: "Image",
            selector: "image",
            maxWidth: "300px",
            cell: row => <a href={`${row.image}`} target='blank'>{row.image}</a>
        },
        {
            name: "Author",
            selector: "authorId",
            maxWidth: "100px"
        },
        {
            name: "Published",
            selector: "published",
            maxWidth: "100px",
            cell: row => <button onClick={()=> handleClick(row.published)} className={row.published ? 'btn btn-success' : 'btn btn-warning'} style={{ color: '#fff' }}>{row.published ? 'Đã đăng' : 'Đăng'}</button>
        },
        {
            name: "Published By",
            selector: "publishedBy",
            maxWidth: "150px"
        },
        {
            name: "Tags",
            selector: "tag",
            cell: row =><div>{row.tag.map(el =>{
                return <div style={{border: '1px solid gray', display:'inline-block'}} key={el}>{el}</div>
            })}</div>
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
        </div>
    );
}