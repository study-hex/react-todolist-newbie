import { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import { todoItemShape } from '../data/propTypes';

const TodoListContainer = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
  list-style: none;
`;

const TodoListItem = styled.li`
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e5e5;
`;

const TodoListItemContainer = styled.div`
  display: flex;
  gap: 16px;
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
  width: 100%;
  text-align: start;
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

  return (
    <>
      <TodoListContainer>
        {todoData &&
          filterData.map((todo) => {
            return (
              <TodoListItem key={todo.id}>
                <TodoListItemContainer>
                  <label className="custom-check cursor-pointer">
                    <input
                      type="checkbox"
                      name="checkbox"
                      aria-label="STATUS"
                      value={todo.status}
                      checked={todo.status}
                      onChange={() => handleToggleTodo(todo)}
                    />
                    <span className="checkmark"></span>
                  </label>

                  {isEditId === todo.id ? (
                    <input
                      type="text"
                      name="content"
                      id="todo"
                      aria-label="輸入編輯後的事項"
                      className={`${todo.status && 'todo-checked'} ${
                        isEditId && 'todo-edited'
                      }`}
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
                      className={`${todo.status && 'todo-checked'}`}
                    >
                      {todo.content}
                    </ButtonTodoContent>
                  )}

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
  todoData: PropTypes.arrayOf(todoItemShape),
  filterData: PropTypes.array.isRequired,
  updateData: PropTypes.func.isRequired,
};

export default TodoList;
