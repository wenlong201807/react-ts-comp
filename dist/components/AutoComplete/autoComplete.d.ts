import { FC, ReactElement } from 'react';
import { InputProps } from '../Input/input';
/**
 * 优化点
 * custom option
 * keyborad support
 * debounce
 * click outside
 *
 * 软件开发模式mvp: 渐进式提升产品功能：先可用，再优化
 */
interface DataSourceObject {
    value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
    fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
    onSelect?: (item: DataSourceType) => void;
    renderOption?: (item: DataSourceType) => ReactElement;
}
export declare const AutoComplete: FC<AutoCompleteProps>;
export default AutoComplete;
