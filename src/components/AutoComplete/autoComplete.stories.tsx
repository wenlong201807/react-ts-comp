import React, { useState, useCallback } from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withInfo } from '@storybook/addon-info';
import Button from '../Button/button';
import { AutoComplete, DataSourceType } from './autoComplete';
interface LakerPlayerProps {
  value: string;
  number: number;
}
interface GithubUserProps {
  login: string;
  url: string;
  avatar_url: string;
}
const OneComplete = () => {
  const lakers = [
    'bradley',
    'pope',
    'caruso',
    'cook',
    'cousins',
    'james',
    'AD',
    'green',
    'howard',
    'kuzma',
    'McGee',
    'rando',
  ];

  const handleFetch = (query: string) => {
    return lakers
      .filter((name) => name.includes(query))
      .map((name) => ({ value: name }));
  };

  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action('selected')}
    />
  );
};
const FetchComplete = () => {
  // const [show, setShow] = useState(false);
  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then((res) => res.json())
      .then(({ items }) => {
        console.log(items);
        return items
          .slice(0, 10)
          .map((item: any) => ({ value: item.login, ...item }));
      });
  };

  const btnClick = () => {
    console.log(888)
  };

  return (
    <>
      <Button btnType="primary" onClick={btnClick}>
        一步到位执行(注意看input的下拉框是否存在)
      </Button>
      <br />
      <br />
      <div style={{ height: '30px' }}>
        {/* {show && <span>下拉框有没有，我都能切换</span>} */}
      </div>
      <br />
      <br />
      <AutoComplete
        fetchSuggestions={handleFetch}
        onSelect={action('selected')}
      />
    </>
  );
};

const TwoComplete = () => {
  const lakersWithNumber = [
    { value: 'bradley', number: 11 },
    { value: 'pope', number: 1 },
    { value: 'caruso', number: 4 },
    { value: 'cook', number: 2 },
    { value: 'cousins', number: 15 },
    { value: 'james', number: 23 },
    { value: 'AD', number: 3 },
    { value: 'green', number: 14 },
    { value: 'howard', number: 39 },
    { value: 'kuzma', number: 0 },
  ];

  const handleFetch = (query: string) => {
    return lakersWithNumber.filter((player) => player.value.includes(query));
  };

  const renderOption = (item: DataSourceType) => {
    const itemWithGithub = item as DataSourceType<GithubUserProps>;
    return (
      <>
        <h2>Name: {itemWithGithub.value}</h2>
        <p>url: {itemWithGithub.url}</p>
      </>
    );
  };
  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action('selected')}
      renderOption={renderOption}
    />
  );
};

storiesOf('AutoComplete Component', module)
  .addDecorator(withInfo)
  .addParameters({
    info: {
      text: `
    this is a very nice component
    ## this is AutoComplete
    ~~~js
    npm install react-ts-comp --save
    ~~~
    `,
      inline: true,
    },
  })
  .add('接口请求数据 AutoComplete', FetchComplete)
  .add('简单结构 AutoComplete', OneComplete)
  .add('复杂结构 AutoComplete', TwoComplete);
