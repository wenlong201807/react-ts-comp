var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import React, { useRef, useState } from 'react';
import axios from 'axios';
import UploadList from './uploadList';
import Dragger from './dragger';
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
export var Upload = function (props) {
    var action = props.action, defaultFileList = props.defaultFileList, beforeUpload = props.beforeUpload, onProgress = props.onProgress, onSuccess = props.onSuccess, onError = props.onError, onChange = props.onChange, onRemove = props.onRemove, name = props.name, headers = props.headers, data = props.data, withCredentials = props.withCredentials, accept = props.accept, multiple = props.multiple, children = props.children, drag = props.drag;
    var fileInput = useRef(null);
    var _a = useState(defaultFileList || []), fileList = _a[0], setFileList = _a[1];
    var updateFileList = function (updateFile, updateObj // 可选值
    ) {
        // 同步过程中，如何更新异步数据
        setFileList(function (prevList) {
            return prevList.map(function (file) {
                if (file.uid === updateFile.uid) {
                    return __assign(__assign({}, file), updateObj);
                }
                else {
                    return file;
                }
            });
        });
    };
    var handleClick = function () {
        if (fileInput.current) {
            fileInput.current.click();
        }
    };
    var handleFileChange = function (e) {
        var files = e.target.files; // file list
        if (!files) {
            return;
        }
        uploadFiles(files);
        if (fileInput.current) {
            fileInput.current.value = '';
        }
    };
    var handleRemove = function (file) {
        setFileList(function (prevList) {
            return prevList.filter(function (item) { return item.uid !== file.uid; });
        });
        if (onRemove) {
            onRemove(file);
        }
    };
    // 钩子触发起点
    var uploadFiles = function (files) {
        var postFiles = Array.from(files);
        postFiles.forEach(function (file) {
            if (!beforeUpload) {
                post(file);
            }
            else {
                var result = beforeUpload(file);
                if (result && result instanceof Promise) {
                    // promise 化
                    result.then(function (processedFile) {
                        post(processedFile);
                    });
                }
                else if (result !== false) {
                    post(file);
                }
            }
        });
    };
    var post = function (file) {
        var _file = {
            uid: Date.now() + 'upload-file',
            status: 'ready',
            name: file.name,
            size: file.size,
            percent: 0,
            raw: file,
        };
        //setFileList([_file, ...fileList])
        setFileList(function (prevList) {
            return __spreadArray([_file], prevList, true);
        });
        var formData = new FormData();
        formData.append(name || 'file', file); // 自定义文件名
        if (data) {
            Object.keys(data).forEach(function (key) {
                formData.append(key, data[key]);
            });
        }
        axios
            .post(action, formData, {
            headers: __assign(__assign({}, headers), { 'Content-Type': 'multipart/form-data' }),
            withCredentials: withCredentials,
            onUploadProgress: function (e) {
                // 上传进度条
                var percentage = Math.round((e.loaded * 100) / e.total) || 0;
                if (percentage < 100) {
                    // 此过程为异步
                    updateFileList(_file, { percent: percentage, status: 'uploading' });
                    if (onProgress) {
                        onProgress(percentage, file);
                    }
                }
            },
        })
            .then(function (resp) {
            updateFileList(_file, { status: 'success', response: resp.data });
            if (onSuccess) {
                onSuccess(resp.data, file);
            }
            if (onChange) {
                onChange(file);
            }
        })
            .catch(function (err) {
            updateFileList(_file, { status: 'error', error: err });
            if (onError) {
                onError(err, file);
            }
            if (onChange) {
                onChange(file);
            }
        });
    };
    return (React.createElement("div", { className: "viking-upload-component" },
        React.createElement("div", { className: "viking-upload-input", style: { display: 'inline-block' }, onClick: handleClick },
            drag ? (React.createElement(Dragger, { onFile: function (files) {
                    uploadFiles(files); // 将上传文件函数 传递给子组件
                } }, children)) : (children),
            React.createElement("input", { className: "viking-file-input", style: { display: 'none' }, ref: fileInput, onChange: handleFileChange, type: "file", accept: accept, multiple: multiple })),
        React.createElement(UploadList, { fileList: fileList, onRemove: handleRemove })));
};
// 添加默认参数
Upload.defaultProps = {
    name: 'file',
};
export default Upload;
