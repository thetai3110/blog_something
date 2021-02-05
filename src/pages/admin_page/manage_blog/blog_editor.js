import { CKEditor } from '@ckeditor/ckeditor5-react';
import Editor from 'ckeditor5-build-custom';
import './blog_editor.css';
import { useEffect, useState } from 'react';
import banner from '../../../assests/banner.png';

export const BlogEditor = () => {
    const [content, setContent] = useState('');

    // const handleChange = (evt) => {
    //     var iframe = document.getElementById('targetCode');
    //     iframe = (iframe.contentWindow) ? iframe.contentWindow : (iframe.contentDocument) ? iframe.contentDocument.document :
    //         iframe.contentDocument;
    //     iframe.document.open();
    //     iframe.document.write(evt.editor.getData());
    //     iframe.document.close();
    // }

    return (
        <>
            <div>
                <CKEditor
                    editor={Editor}
                    data={`<img src=${banner} alt=''></img>`}
                    config={{
                        toolbar: {
                            items: [
                                'heading',
                                '|',
                                'bold',
                                'underline',
                                'italic',
                                'link',
                                'bulletedList',
                                'numberedList',
                                '|',
                                'indent',
                                'outdent',
                                'alignment',
                                '|',
                                'imageUpload',
                                'blockQuote',
                                'insertTable',
                                'mediaEmbed',
                                'undo',
                                'redo',
                                'highlight',
                                'CKFinder',
                                'MathType',
                                'ChemType'
                            ]
                        },
                        language: 'en',
                        image: {
                            toolbar: [
                                'imageTextAlternative',
                                'imageStyle:full',
                                'imageStyle:side'
                            ]
                        },
                        table: {
                            contentToolbar: [
                                'tableColumn',
                                'tableRow',
                                'mergeTableCells'
                            ]
                        },
                        licenseKey: '',
                    }}
                    onReady={editor => {
                        // You can store the "editor" and use when it is needed.
                        console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        console.log({ event, editor, data });
                    }}
                    onBlur={(event, editor) => {
                        console.log('Blur.', editor);
                    }}
                    onFocus={(event, editor) => {
                        console.log('Focus.', editor);
                    }}
                />
                <div></div>
            </div>
            {/* <iframe name="targetCode" id="targetCode"> </iframe> */}
        </>
    );
}