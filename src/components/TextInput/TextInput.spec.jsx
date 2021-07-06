import { screen, render } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import { TextInput } from ".";

// const props = {
//   posts: [
//     {
//       id: 1,
//       title: "title 1",
//       body: "body 1",
//       cover: "img/img1.png",
//     },
//     {
//       id: 2,
//       title: "title 2",
//       body: "body 2",
//       cover: "img/img2.png",
//     },
//     {
//       id: 3,
//       title: "title 3",
//       body: "body 3",
//       cover: "img/img3.png",
//     },
//   ],
// };

describe("<TextInput />", () => {

  it("should have a value of searchValue", () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn} searchValue={'testing'}/>);
    const input = screen.getByPlaceholderText(/type your search/i);
    expect(input).toBeInTheDocument();
    // expect(input.value).toBe('testing');
  });
  //   it("should call handleChange function on each key pressed", () => {
  //   const fn = jest.fn();
  //   const {debug} = render(<TextInput handleChange={fn} searchValue={'testing'}/>);
  //   debug();
  // });
    it("should call handleChange function on each key pressed", () => {
    const fn = jest.fn();
    render(<TextInput handleChange={fn}/>);

    const input = screen.getByPlaceholderText(/type your search/i);
    const value = 'o valor';

    userEvent.type(input, value);

    expect(input.value).toBe(value);
    expect(fn).toHaveBeenCalledTimes(value.length);
  });
  it("should match snapchot", () => {
    const { container } = render(<TextInput />);
    expect(container.firstChild).toMatchSnapshot();
  });
});