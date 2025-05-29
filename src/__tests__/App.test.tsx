import React from 'react';
import { render } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  test('className="App"の要素にtabIndexが指定されている', () => {
    const { container } = render(<App />);
    const appElement = container.querySelectorAll('.App');
    expect(appElement[0]).toHaveAttribute('tabIndex', '0');
  });
});
