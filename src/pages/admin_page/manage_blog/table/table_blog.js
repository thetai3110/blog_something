import { Link } from "react-router-dom"

export const TableBlog = () => {
    return (
        <div style={{ marginTop: "25px" }}>
            <h5 style={{ padding: '15px 0px', fontWeight: '500', color: '#333' }}>{'>> Blog'}</h5>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">First</th>
                        <th scope="col">Last</th>
                        <th scope="col">Handle</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>Larry</td>
                        <td>the Bird</td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </table>
            <div><Link to="/admin/blog/create" style={{fontWeight: '500'}}>Create a new blog...</Link></div>
        </div>
    )
}