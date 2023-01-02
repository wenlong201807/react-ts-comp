import React, { FC } from 'react';
export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error';
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
    headers?: {
        [key: string]: any;
    };
    name?: string;
    data?: {
        [key: string]: any;
    };
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
export declare const Upload: FC<UploadProps>;
export default Upload;
