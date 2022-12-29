import PropTypes from 'prop-types';
import BsAlert from 'react-bootstrap/Alert';

export default function Alert({ message, isError, onClose }) {
  return (
    <BsAlert
      variant={isError ? 'danger' : 'success'}
      onClose={onClose}
      dismissible
    >
      <BsAlert.Heading>{isError ? 'Erro!' : 'Sucesso!'}</BsAlert.Heading>
      <span>{message}</span>
    </BsAlert>
  );
}

Alert.propTypes = {
  message: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
