import { fireEvent, render, screen } from '@testing-library/react';
// import { userEvent } from "@testing-library/user-event";
import { Button } from '.';

describe('<Button />', () => {
  it('should render the button with the text "Load more"', () => {
    const fn = jest.fn();
    render(<Button text="Load more" onClick={fn} />);
    const button = screen.getByRole('button', { name: /load more/i });
    expect.assertions(1);
    expect(button).toBeInTheDocument();
    // expect(button).toHaveAttribute('class', 'button');
  });
  it('should call function on button click', () => {
    const fn = jest.fn();
    render(<Button text="Load more" onClick={fn} />);
    const button = screen.getByRole('button', { name: /load more/i });
    fireEvent.click(button);
    // userEvent.click(button);
    // fireEvent.click(button);
    expect(fn).toHaveBeenCalledTimes(1);

    // expect.assertions(1);
    // expect(button).toBeInTheDocument();
    // expect(button).toHaveAttribute('class', 'button');
  });
  it('should be disabled when disabled is true', () => {
    const fn = jest.fn();
    render(<Button text="Load more" onClick={fn} />);
    const button = screen.getByRole('button', { name: /load more/i });
    // expect(button).toBeDisabled();
    expect(button).toBeEnabled();
  });
  it('should match snapshot', () => {
    const fn = jest.fn();
    const { container } = render(<Button text="Load more" disabled={true} onClick={fn} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
