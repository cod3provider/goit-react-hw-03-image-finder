import PropTypes from 'prop-types';
import s from './Button.module.css';


const Button = ({text, onClick}) => {
  return (
    <button className={s.button} type="button" onClick={onClick}>{text}</button>
  )
}

export default Button;

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};
