import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Search from './Search';
import { basicArray } from './testData';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Search',
  component: Search,
} as ComponentMeta<typeof Search>;

export const Primary: ComponentStory<typeof Search> = () => (
    <div className="container">
        <div className="col-xl-4">
            <Search<string>
                list={basicArray}
                accessor={(item) => item}
            />
        </div>
    </div>
);