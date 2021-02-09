import './code_online_page.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const CodeOnlinePage = () => {
    const [expand, setExpand] = useState(true);
   // const btnExpandElm = expand ? <FontAwesomeIcon icon={faCompressAlt} /> : <FontAwesomeIcon icon={faExpandAlt} />
    const valueDefault = "<!DOCTYPE html>\n"
        + "<html>\n"
        + "<head>\n"
        + "     <title>My Codes</title>"
        + "</head>\n"
        + "<body>\n"
        + "     <h1> Welcome Coders!</h1>\n"
        + "     <p> Write HTML, Javascript or CSS here & click run code!</p>\n"
        + "</body>\n"
        + "</html>";

    const runCode = () => {
        var content = document.getElementById('sourceCode').value;
        var iframe = document.getElementById('targetCode');
        iframe = (iframe.contentWindow) ? iframe.contentWindow : (iframe.contentDocument) ? iframe.contentDocument.document :
            iframe.contentDocument;
        iframe.document.open();
        iframe.document.write(content);
        iframe.document.close();
        return false;
    }

    return (
        <div className="full-layout-code" >
            <div className="top-layout-code">
                {/* <button className="expand">{btnExpandElm}</button> */}
                <select>
                    <option>HTML &amp; CSS</option>
                    <option>C++</option>
                </select>
                <button className="reload" ><i className="fa fa-sync-alt"></i> Làm mới</button>
            </div>
            <div className="body-layout-code">
                <div className="row">
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12">
                        <textarea name="sourceCode" id="sourceCode" defaultValue={valueDefault}>
                        </textarea>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12 col-12">
                        <iframe name="targetCode" id="targetCode"> </iframe>
                    </div>
                </div>
                <Link to="/" className="back-to-home"><i className="fa fa-home"></i></Link>
                <input onClick={() => runCode()} type="button" value="Chạy >>" className="btn btn-success run-code"></input>
            </div>
        </div>
    )
}

export default CodeOnlinePage;