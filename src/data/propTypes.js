import PropTypes from 'prop-types';

export const todoItemShape = PropTypes.shape({
  content: PropTypes.string.isRequired,
  createTime: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
});