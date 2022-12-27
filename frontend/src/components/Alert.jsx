import PropTypes from 'prop-types';

export default function Alert({ message, isError }) {
  return (
    <div>
      {isError && 'Erro! '}
      {message}
    </div>
  );
}

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
};
