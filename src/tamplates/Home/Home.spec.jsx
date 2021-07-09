import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { screen, render, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Home } from '.';

const handlers = [
  rest.get('*jsonplaceholder.typicode.com*', async (req, res, ctx) => {
    return res(
      ctx.json([
        {
          userId: 1,
          id: 1,
          title: 'title 1',
          body: 'body 1',
          url: 'img1.jpg',
        },
        {
          userId: 1,
          id: 2,
          title: 'title 2',
          body: 'body 2',
          url: 'img2.jpg',
        },
        {
          userId: 1,
          id: 3,
          title: 'title 3',
          body: 'body 3',
          url: 'img3.jpg',
        },
        {
          userId: 1,
          id: 4,
          title: 'title 4',
          body: 'body 4',
          url: 'img4.jpg',
        },
        {
          userId: 1,
          id: 5,
          title: 'title 5',
          body: 'body 5',
          url: 'img5.jpg',
        },
        {
          userId: 1,
          id: 6,
          title: 'title 6',
          body: 'body 6',
          url: 'img6.jpg',
        },
      ]),
    );
  }),
];

const server = setupServer(...handlers);

describe('<Home/>', () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => {
    server.close();
  });

  it('should render search, posts and load more', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts =(');

    expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);

    // screen.debug();

    const search = screen.getByPlaceholderText(/type your search/i);
    expect(search).toBeInTheDocument();

    const imgs = screen.getAllByRole('img', { name: /title/i });
    expect(imgs).toHaveLength(5);

    const button = screen.getByRole('button', { name: /load more posts/i });
    expect(button).toBeInTheDocument();
  });
  it('should search for posts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts =(');

    expect.assertions(19);

    await waitForElementToBeRemoved(noMorePosts);

    // screen.debug();

    const search = screen.getByPlaceholderText(/type your search/i);

    expect(screen.getByRole('heading', { name: '1 - title 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '2 - title 2' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '3 - title 3' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '4 - title 4' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '5 - title 5' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: '6 - title 6' })).not.toBeInTheDocument();

    userEvent.type(search, 'title 1');
    expect(screen.getByRole('heading', { name: '1 - title 1' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: '2 - title 2' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: '3 - title 3' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: '4 - title 4' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: '5 - title 5' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: '6 - title 6' })).not.toBeInTheDocument();
    // expect(screen.getByRole('heading', { name: 'asd' }));

    userEvent.clear(search);
    expect(screen.getByRole('heading', { name: '1 - title 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '2 - title 2' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '3 - title 3' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '4 - title 4' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: '5 - title 5' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: '6 - title 6' })).not.toBeInTheDocument();

    userEvent.type(search, 'teste');
    expect(screen.getByText('Não existem posts =(')).toBeInTheDocument();
  });

  it('should load more posts', async () => {
    render(<Home />);
    const noMorePosts = screen.getByText('Não existem posts =(');

    // expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);

    const button = screen.getByRole('button', { name: /load more posts/i });

    userEvent.click(button);
    expect(screen.queryByRole('heading', { name: '6 - title 6' })).toBeInTheDocument();
    expect(button).toBeDisabled;
  });
});
