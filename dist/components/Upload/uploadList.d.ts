import { FC } from 'react';
import { UploadFile } from './upload';
interface UploadListProps {
    fileList: UploadFile[];
    onRemove: (_file: UploadFile) => void;
}
/**
 * 显示文件上传列表
 */
export declare const UploadList: FC<UploadListProps>;
export default UploadList;
