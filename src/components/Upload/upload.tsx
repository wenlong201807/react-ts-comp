import React, { FC, useRef, ChangeEvent, useState } from 'react';
import axios from 'axios';
import UploadList from './uploadList';
import Dragger from './dragger';
export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';

// 上传一个文件的状态
export interface UploadFile {
  uid: string;
  size: number;
  name: string;
  status?: UploadFileStatus;
  percent?: number;
  raw?: File;
  response?: any;
  error?: any;
}
export interface UploadProps {
  action: string;
  defaultFileList?: UploadFile[];
  beforeUpload?: (file: File) => boolean | Promise<File>;
  onProgress?: (percentage: number, file: File) => void;
  onSuccess?: (data: any, file: File) => void;
  onError?: (err: any, file: File) => void;
  onChange?: (file: File) => void;
  onRemove?: (file: UploadFile) => void;
  headers?: { [key: string]: any };
  name?: string;
  data?: { [key: string]: any };
  withCredentials?: boolean;
  accept?: string;
  multiple?: boolean;
  drag?: boolean;
  children: React.ReactNode;
}

/**
 * 额外扩展
 * fetch 缺点
 * 1 只对网络请求报错，对400，500都当做成功的请求
 * 2 默认不会带 cookie
 * 3 不支持abort，不支持超时控制
 * 4 没有办法原生监控请求的进度
 *
 * axios特点
 * 1 客户端全支持
 * 2 支持nodejs请求
 * 3 promise api
 * 4 拦截器
 * 5 可数据转换
 * 6 中断请求
 * 7 自动转换为json数据
 * 8 客户端保护xsrf
 */

/**
 *
 * @param props
 * 功能: 钩子函数
 * 1 beforeUpload(file) 上传前
 * 2 onProgress(event, file)
 * 3 onChange(file)
 * 4 onError(error, file)
 * 5 onSuccess(response, file)
 * 6 onRemove(file)
 *
 * 7 action 接口地址
 *
 * 丰富化上传数据
 * 1 添加自定义header
 * 2 添加name属性 代表发到后台的文件参数名称
 * 3 添加data属性 上传所需的额外参数
 * 4 添加input 本身的file约束属性 multiple accept等
 * 5 是否携带cookie
 *
 * 丰富化界面和交互
 * 1 自定义出发的元素
 * 2 支持拖动上传文件
 * 3 点击上传文件名称 添加onPreivew 事件
 *
 * @returns
 */
export const Upload: FC<UploadProps> = (props) => {
  const {
    action,
    defaultFileList,
    beforeUpload,
    onProgress,
    onSuccess,
    onError,
    onChange,
    onRemove,
    name,
    headers,
    data,
    withCredentials,
    accept,
    multiple,
    children,
    drag,
  } = props;
  const fileInput = useRef<HTMLInputElement>(null);
  const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || []);
  const updateFileList = (
    updateFile: UploadFile,
    updateObj: Partial<UploadFile> // 可选值
  ) => {
    // 同步过程中，如何更新异步数据
    setFileList((prevList) => {
      return prevList.map((file) => {
        if (file.uid === updateFile.uid) {
          return { ...file, ...updateObj };
        } else {
          return file;
        }
      });
    });
  };
  const handleClick = () => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  };
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files; // file list
    if (!files) {
      return;
    }
    uploadFiles(files);
    if (fileInput.current) {
      fileInput.current.value = '';
    }
  };
  const handleRemove = (file: UploadFile) => {
    setFileList((prevList) => {
      return prevList.filter((item) => item.uid !== file.uid);
    });
    if (onRemove) {
      onRemove(file);
    }
  };

  // 钩子触发起点
  const uploadFiles = (files: FileList) => {
    let postFiles = Array.from(files);
    postFiles.forEach((file) => {
      if (!beforeUpload) {
        post(file);
      } else {
        const result = beforeUpload(file);
        if (result && result instanceof Promise) {
          // promise 化
          result.then((processedFile) => {
            post(processedFile);
          });
        } else if (result !== false) {
          post(file);
        }
      }
    });
  };
  const post = (file: File) => {
    let _file: UploadFile = {
      uid: Date.now() + 'upload-file',
      status: 'ready',
      name: file.name,
      size: file.size,
      percent: 0,
      raw: file,
    };
    //setFileList([_file, ...fileList])
    setFileList((prevList) => {
      return [_file, ...prevList];
    });
    const formData = new FormData();
    formData.append(name || 'file', file); // 自定义文件名
    if (data) {
      Object.keys(data).forEach((key) => {
        formData.append(key, data[key]);
      });
    }
    axios
      .post(action, formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data', // 文件必须是二进制格式
        },
        withCredentials,
        onUploadProgress: (e: any) => {
          // 上传进度条
          let percentage = Math.round((e.loaded * 100) / e.total) || 0;
          if (percentage < 100) {
            // 此过程为异步
            updateFileList(_file, { percent: percentage, status: 'uploading' });
            if (onProgress) {
              onProgress(percentage, file);
            }
          }
        },
      })
      .then((resp) => {
        updateFileList(_file, { status: 'success', response: resp.data });
        if (onSuccess) {
          onSuccess(resp.data, file);
        }
        if (onChange) {
          onChange(file);
        }
      })
      .catch((err) => {
        updateFileList(_file, { status: 'error', error: err });
        if (onError) {
          onError(err, file);
        }
        if (onChange) {
          onChange(file);
        }
      });
  };

  return (
    <div className="viking-upload-component">
      <div
        className="viking-upload-input"
        style={{ display: 'inline-block' }}
        onClick={handleClick}
      >
        {drag ? (
          <Dragger
            onFile={(files) => {
              uploadFiles(files); // 将上传文件函数 传递给子组件
            }}
          >
            {children}
          </Dragger>
        ) : (
          children
        )}
        <input
          className="viking-file-input"
          style={{ display: 'none' }}
          ref={fileInput}
          onChange={handleFileChange}
          type="file"
          accept={accept}
          multiple={multiple}
        />
      </div>

      <UploadList fileList={fileList} onRemove={handleRemove} />
    </div>
  );
};

// 添加默认参数
Upload.defaultProps = {
  name: 'file',
};
export default Upload;
