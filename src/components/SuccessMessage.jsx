import './SuccessMessage.css';
import PropTypes from 'prop-types';

function SuccessMessage({ message }) {
  return (
    <div className="success-message">
      {message}
    </div>
  );
}

SuccessMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

export default SuccessMessage;