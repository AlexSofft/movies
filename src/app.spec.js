import React from 'react';
import { render } from '@testing-library/react';

import App from './App.js'

describe('App', () => {
test('renders hero-area', () => {
const { asFragment } = render(<App/>);
expect(asFragment(<App/>)).toMatchSnapshot();  
})
}) 