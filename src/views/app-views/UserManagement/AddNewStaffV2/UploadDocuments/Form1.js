import React from 'react'
import {InboxOutlined} from '@ant-design/icons';
import Dragger from 'antd/lib/upload/Dragger';
import { message } from 'antd';
function Form1() {

    const props = {
        name: 'file',
        multiple: true,
        action: 'https://www.htmk.com',
        listType:"picture",
        onChange(info) {
          const { status } = info.file;
          if (status !== 'uploading') {
            console.log(info.file, info.fileList);
          }
          if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
          } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
          }
        }
    }        
    return (
        <Dragger {...props}>
            <p className="ant-upload-drag-icon">
                <InboxOutlined />
            </p>
            <p className="font-size-md">Drag & drop files here</p>
            <p className="font-size-md" >or</p>
            <p className="ant-upload-hint text-danger">Choose Files</p>
        </Dragger>
    )
}

export default Form1