import React from 'react';
import { List } from 'semantic-ui-react';

export const Test = ({ test }) => {
    return (
        <List>
            {test.map( t => {
                <List.Item key={t.Hi}>

                </List.Item>
            })}
        </List>
    )
}