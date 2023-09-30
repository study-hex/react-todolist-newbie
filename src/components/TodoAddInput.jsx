import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { commonPropTypes } from '../data/propTypes';

const InputContainer = styled.div`
  display: inline-flex;
  padding: 4px 4px 4px 16px;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.15);

  > input {
    width: 90%;
    font-weight: bold;
    color: #333333;
  }
`;

const ButtonAddTodo = styled.button`
  position: relative;
  width: 40px;
  height: 39px;
  border-radius: 10px;
  background-color: #333333;
  transition: border 0.1s linear;

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: 12%;

    height: 60%;
    top: 20%;
    left: 45%;

    background-color: #ffffff;
    border-radius: 10px;
  }

  &::after {
    transform: rotate(90deg);
  }

  &:hover {
    border: 2px solid #9f9a91;
  }

  &:disabled {
    background-color: #9f9a91;
  }
`;

// end of styled

/**
 * Renders an input field and a button for adding a new todo item.
 *
 * @param {object} props - The properties passed to the component.
 * @param {array} props.todoData - The array of existing todo items.
 * @param {function} props.updateData - The function to update the todo data.
 * @param {function} props.handleTabClick - The function to handle tab click.
 * @return {JSX.Element} The rendered input field and button.
 */
function TodoAddInput(props) {
  const { todoData, updateData, handleTabClick } = props;

  const [newTodo, setNewTodo] = useState('');

  const handleAddInputChange = (e) => {
    setNewTodo(e.target.value.trim());
  };
  // end of handleAddInputChange

  const handleAddTodo = () => {
    if (!newTodo) {
      return;
    }

    const newData = [
      ...todoData,
      {
        id: self.crypto.randomUUID(),
        content: newTodo,
        status: false,
        createTime: new Date().getTime(),
      },
    ];

    updateData(newData);
    setNewTodo('');
    handleTabClick('ALL');
  };
  // end of handleAddTodo

  return (
    <>
      <InputContainer>
        <input
          type="text"
          name="content"
          id="newTodo"
          tabIndex="1"
          aria-label="新增待辦事項"
          placeholder="新增待辦事項"
          value={newTodo}
          onChange={(e) => handleAddInputChange(e)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              return handleAddTodo();
            }
            if (e.key === 'Escape') {
              return setNewTodo('');
            }
          }}
        />

        <ButtonAddTodo onClick={handleAddTodo} aria-label="ADD"></ButtonAddTodo>
      </InputContainer>
    </>
  );
}
// end of TodoAddInput

TodoAddInput.propTypes = {
  ...commonPropTypes,
  handleTabClick: PropTypes.func.isRequired,
};

export default TodoAddInput;
