import PT from 'prop-types';
import './styles.css';

export const Button = ({ text, onClick, disabled }) => (
  <button disabled={disabled} className="button" onClick={onClick}>
    {text}
  </button>
);

Button.defaultProps = {
  disabled: false,
};

Button.propTypes = {
  text: PT.string.isRequired,
  onClick: PT.func.isRequired,
  disabled: PT.bool,
};
