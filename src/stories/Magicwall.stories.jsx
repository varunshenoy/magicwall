import React from 'react';
import { storiesOf } from '@storybook/react';
import { Magicwall } from '../components/Magicwall';

const stories = storiesOf('App Test', module);

stories.add('App', () => {
    return (<Magicwall />);
});