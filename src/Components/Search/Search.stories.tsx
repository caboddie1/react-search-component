import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import Search from './Search';
import { basicArray, User, users } from './testData';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Search',
  component: Search,
} as ComponentMeta<typeof Search>;

export const StringArray: ComponentStory<typeof Search> = () => (
    <div className="container">
        <div className="col-xl-4">
            <Search<string>
                list={basicArray}
                accessor={(item) => item}
                onClick={(item) => alert(`${item} clicked`)}
            />
        </div>
    </div>
);

export const UserSearch: ComponentStory<typeof Search> = () => (
    <div className="container">
        <div className="col-xl-4">
            <Search<User>
                list={users}
                accessor={({ firstName, lastName }) => `${firstName} ${lastName}` }
                onClick={(item) => alert(JSON.stringify(item))}
                resultLimit={10}
            />
        </div>
    </div>
)

export const CustomResultList: ComponentStory<typeof Search> = () => (
        <div className="col-xl-4">
            <Search
                list={users}
                accessor={({ firstName, lastName }) => `${firstName} ${lastName}` }
                renderList={(list) => (
                    <ul className="list-group">
                        {list.map(user => (
                            <li key={user.id} className="list-group-item">
                                <button 
                                    className="btn" 
                                    onClick={() => alert(`${user.firstName} ${user.lastName} clicked - do something cool`)}
                                >
                                    <div className="fw-bold">
                                        <span>
                                            {user.firstName} {user.lastName}
                                        </span>
                                    </div>
                                    {user.email}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            />
        </div>
)
