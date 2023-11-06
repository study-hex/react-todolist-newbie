import { useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { commonPropTypes } from '../data/propTypes';

const TodoListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  list-style: none;

  & input[type='text'] {
    width: 100%;
  }

  > h3 {
    padding: 24px;
    text-align: center;
  }
`;

const TodoListItem = styled.li`
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e5e5;
`;

const TodoListItemContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const TodoListItemText = styled.div`
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const TodoListItemInput = styled.input`
  ${({ $isChecked }) =>
    $isChecked &&
    css`
      color: #9f9a91;
      font-size: 14px;
      text-decoration-line: line-through;
    `}

  ${({ $isEdited }) =>
    $isEdited &&
    css`
      border-bottom: 3px solid #ffd370;
    `}
`;

const ButtonRemoveTodo = styled.button`
  display: inline-flex;
  align-items: center;
  color: #9f9a91;
  transition: transform 0.5s linear;

  &:hover {
    font-weight: bold;
    color: #333333;
    transform: scale(1.02);
  }
`;

const ButtonTodoContent = styled.button`
  text-align: start;

  ${({ $isChecked }) =>
    $isChecked &&
    css`
      color: #9f9a91;
      font-size: 14px;
      text-decoration-line: line-through;
    `}
`;

const CustomCheckLabel = styled.label`
  // Step1: The container
  position: relative;
  display: block;
  padding-left: 16px;
  -webkit-user-select: none;
  user-select: none;
  flex-grow: 1;

  // Step2: Hide the browser's default checkbox
  & input[type='checkbox'] {
    position: absolute;
    margin-right: 16px;
    height: 0;
    width: 0;
    opacity: 0;
  }

  // Step3: Create a custom checkbox
  & .checkmark {
    position: absolute;
    top: 4px;
    left: 0;
    height: 20px;
    width: 20px;
    border: 1px solid #9f9a91;
    background-color: transparent;
    border-radius: 5px;
    transition: background-color 0.5s linear;
  }

  // Step4: Create the checkmark/indicator (hidden when not checked)
  & .checkmark:after {
    content: '';
    position: absolute;
    display: none;
  }

  // Step5: On mouse-over, add a background color
  &:hover input ~ .checkmark {
    border: none;
    outline: none;
    background-color: #ffd370;
  }

  // Step6: When the checkbox is checked, add a background
  & input:checked ~ .checkmark {
    border: none;
    outline: none;
    background-color: transparent;
  }

  // Step7: Show the checkmark when checked
  & input:checked ~ .checkmark:after {
    display: block;
  }

  // Step8: Style the checkmark/indicator
  & .checkmark:after {
    left: 8px;
    top: 2px;

    width: 6px;
    height: 12px;

    border: solid #ffd370;
    border-width: 0 3px 3px 0;
    transform: rotate(45deg);
  }
`;

// end of styled

function TodoList(props) {
  const { todoData, filterData, updateData } = props;

  const [isEditId, setIsEditId] = useState(null);

  const handleRemoveTodo = (todo) => {
    const newData = todoData.filter((item) => {
      return item.id !== todo.id;
    });

    updateData(newData);
  };
  // end of handleRemoveTodo

  const handleToggleTodo = (todo) => {
    const newData = todoData.filter((item) => {
      if (item.id === todo.id) {
        item.status = !todo.status;
      }
      return { ...item };
    });

    updateData(newData);
  };
  // end of handleToggleTodo

  const handleEditTodo = (todo, e) => {
    const newData = todoData.map((item) => {
      if (item.id === todo.id) {
        return { ...item, content: e.target.value };
      }
      return { ...item };
    });

    updateData(newData);
  };
  // end of handleEditTodo

  if (!filterData.length) {
    return (
      <TodoListContainer>
        <h3>目前沒有資料 \(^Д^)/</h3>
      </TodoListContainer>
    );
  }

  return (
    <>
      <TodoListContainer>
        {todoData &&
          filterData.map((todo) => {
            return (
              <TodoListItem key={todo.id}>
                <TodoListItemContainer>
                  <CustomCheckLabel>
                    <input
                      type="checkbox"
                      name="checkbox"
                      aria-label="STATUS"
                      value={todo.status}
                      checked={todo.status}
                      onChange={() => handleToggleTodo(todo)}
                    />
                    <span className="checkmark"></span>
                  </CustomCheckLabel>

                  <TodoListItemText>
                    {isEditId === todo.id ? (
                      <TodoListItemInput
                        type="text"
                        name="content"
                        id="todo"
                        aria-label="輸入編輯後的事項"
                        $isChecked={todo.status}
                        $isEdited={isEditId}
                        value={todo.content}
                        onChange={(e) => handleEditTodo(todo, e)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === 'Escape') {
                            setIsEditId(null);
                          }
                        }}
                      />
                    ) : (
                      <ButtonTodoContent
                        aria-label="EDIT"
                        onClick={() => setIsEditId(todo.id)}
                        $isChecked={todo.status}
                      >
                        {todo.content}
                      </ButtonTodoContent>
                    )}
                  </TodoListItemText>

                  <ButtonRemoveTodo
                    aria-label="REMOVE"
                    onClick={() => handleRemoveTodo(todo)}
                  >
                    <span className="material-symbols-outlined">close</span>
                  </ButtonRemoveTodo>
                </TodoListItemContainer>
              </TodoListItem>
            );
          })}
      </TodoListContainer>
    </>
  );
}
// end of TodoList

TodoList.propTypes = {
  ...commonPropTypes,
  filterData: PropTypes.array.isRequired,
};

export default TodoList;
