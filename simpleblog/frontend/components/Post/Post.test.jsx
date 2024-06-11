import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Post from './Post';

describe('Post component', () => {
  it('should display properly', () => {
    const comp = render(
      <MemoryRouter initialEntries={['/']}>
        <Post
          id='an Id'
          title='Blog Title'
          thumbnail='http://doesnotexist.rou'
          body='This is supposed to be the body of content for this post'
        />
      </MemoryRouter>
    );
    expect(comp).toMatchSnapshot();
    expect(screen.getByText(/Blog\sTitle/)).toBeInTheDocument();
  });
});