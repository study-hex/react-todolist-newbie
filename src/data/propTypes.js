import PropTypes from 'prop-types';

const todoItemShape = PropTypes.shape({
  content: PropTypes.string.isRequired,
  createTime: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
});

export const commonPropTypes = {
  todoData: PropTypes.arrayOf(todoItemShape),
  updateData: PropTypes.func.isRequired,
};