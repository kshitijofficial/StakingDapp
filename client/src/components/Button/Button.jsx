import PropTypes from 'prop-types';
const Button =({onClick,label,type})=>{
  return(
    <button type={type} onClick={onClick}>
        {label}
    </button>
  )
}
Button.propTypes = {
    onClick: PropTypes.func.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
  };
  
  Button.defaultProps = {
    type: 'button',
  };
  
export default Button;