import React, {
  FC,
  useState,
  ChangeEvent,
  KeyboardEvent,
  ReactElement,
  useEffect,
  useRef,
} from 'react';
import classNames from 'classnames';
import Input, { InputProps } from '../Input/input';
import Icon from '../Icon/icon';
import Transition from '../Transition/transition';
import useDebounce from '../../hooks/useDebounce';
import useClickOutside from '../../hooks/useClickOutside';
// 简单数据类型
interface DataSourceObject {
  value: string;
}

// 复杂数据类型
export type DataSourceType<T = {}> = T & DataSourceObject;
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (
    str: string
  ) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const { fetchSuggestions, onSelect, value, renderOption, ...restProps } =
    props;

  const [inputValue, setInputValue] = useState(value as string);
  const [suggestions, setSugestions] = useState<DataSourceType[]>([]);
  const [loading, setLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  // 多次渲染中，保持相同的引用
  // 当下拉列表中有一个被选中后，点击回车确定选中之后，需要清空下拉列表，同时修改的input中的选中值，
  // 此次会多一次发请求的调用，需要禁止掉它
  const triggerSearch = useRef(false);
  const componentRef = useRef<HTMLDivElement>(null); // 设置dom点击范围
  const debouncedValue = useDebounce(inputValue, 300);
  useClickOutside(componentRef, () => {
    setSugestions([]); // dom之后，则关闭下拉框
  });
  useEffect(() => {
    // 避免最后一次多余的请求，必须是 有选中的值才发请求
    if (debouncedValue && triggerSearch.current) {
      setSugestions([]);
      const results = fetchSuggestions(debouncedValue);
      if (results instanceof Promise) {
        setLoading(true);
        results.then((data) => {
          setLoading(false);
          setSugestions(data);
          if (data.length > 0) {
            setShowDropdown(true);
          }
        });
      } else {
        setSugestions(results);
        setShowDropdown(true);
        if (results.length > 0) {
          setShowDropdown(true);
        }
      }
    } else {
      setShowDropdown(false);
    }

    setHighlightIndex(-1); // 每次删除一个input中的字母后，之前的选中状态去掉
  }, [debouncedValue, fetchSuggestions]);
  const highlight = (index: number) => {
    if (index < 0) index = 0;
    if (index >= suggestions.length) {
      index = suggestions.length - 1;
    }
    setHighlightIndex(index);
  };
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.keyCode) {
      case 13: // enter选中
        if (suggestions[highlightIndex]) {
          // 存在才能只能选中
          handleSelect(suggestions[highlightIndex]);
        }
        break;
      case 38: // 下
        highlight(highlightIndex - 1);
        break;
      case 40: //上
        highlight(highlightIndex + 1);
        break;
      case 27: // 退出
        setShowDropdown(false);
        break;
      default:
        break;
    }
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputValue(value);
    triggerSearch.current = true; // 选中操作时，有选中的值
  };
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value);
    setShowDropdown(false);
    if (onSelect) {
      onSelect(item);
    }
    triggerSearch.current = false; // 选择过程中，没有选中的值
  };
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value;
  };
  const generateDropdown = () => {
    return (
      <Transition
        in={showDropdown || loading}
        animation="zoom-in-top"
        timeout={300}
        onExited={() => {
          setSugestions([]);
        }}
      >
        <ul className="viking-suggestion-list">
          {loading && (
            <div className="suggstions-loading-icon">
              <Icon icon="spinner" spin />
            </div>
          )}
          {suggestions.map((item, index) => {
            const cnames = classNames('suggestion-item', {
              'is-active': index === highlightIndex,
            });
            return (
              <li
                key={index}
                className={cnames}
                onClick={() => handleSelect(item)}
              >
                {renderTemplate(item)}
              </li>
            );
          })}
        </ul>
      </Transition>
    );
  };
  return (
    <div className="viking-auto-complete" ref={componentRef}>
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      {generateDropdown()}
    </div>
  );
};

export default AutoComplete;
