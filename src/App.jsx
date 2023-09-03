import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { ResetStyle, BaseStyle } from './components/globalStyle';

import './styles/App.css';
// import styles from './styles/App.css?inline';
// import styles from './styles/App.css';

import data from './data/data';

/**
 * Default and named imports from CSS files are deprecated. Use the ?inline query instead.
 * For example: import styles from './styles/App.css?inline'
 * Plugin: vite:import-analysis
 */

const Wrapper = styled.div`
  height: 100vh;
  overflow: hidden;

  @media (min-width: 1024px) {
    background: linear-gradient(
      177deg,
      #ffd370 0%,
      #ffd370 54.04%,
      #ffd370 54.17%,
      #fff 54.18%,
      #fff 100%
    );
  }
`;

const Container = styled.div`
  width: 100%;
  margin: 0 auto;
  padding-left: 12px;
  padding-right: 12px;

  @media (min-width: 1024px) {
    max-width: 964px;
  }
`;

const Navbar = styled.nav`
  padding-top: 16px;
  padding-bottom: 16px;
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 16px;

  @media (min-width: 1024px) {
    max-width: 500px;
    margin: 0 auto;
  }
`;

const InputContainer = styled.div`
  display: inline-flex;
  padding: 4px 4px 4px 16px;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.15);
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 170px);

  border-radius: 10px;
  background-color: #ffffff;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, 0.15);
`;

const CardHeader = styled.div`
  z-index: 2;
`;

const CardBody = styled.div`
  flex-grow: 1;
  padding: 16px;
  margin-top: -2px;
  border-top: 2px solid #efefef;

  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: #333333 $FFD370;

  &::-webkit-scrollbar {
    width: 0.3rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #333333;

    border: 1px solid $FFD370;
    border-radius: 12px;
    -moz-border-radius: 12px;
    -webkit-border-radius: 12px;

    &:hover {
      box-shadow: inset 0 0 4px $FFD370;
    }
  }

  &::-webkit-scrollbar-track {
    // box-shadow: inset 0 0 0.3rem #9f9a91;
  }
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px;
`;

const TabList = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const TabItem = styled.li`
  width: 33%;
`;

const TodoList = styled.div`
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

const ButtonAddTodo = styled.button`
  position: relative;
  width: 40px;
  height: 39px;
  border-radius: 10px;
  background-color: #333333;
  transition: border 0.3s linear;

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
`;

const ButtonClearTodo = styled.button`
  color: #9f9a91;
  transition: transform 0.3s linear;

  &:hover {
    font-weight: bold;
    color: #333333;
    transform: scale(1.02);
  }
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

function App() {
  const [todoData, setTodoData] = useState([]);
  const [isEditId, setIsEditId] = useState(null);

  const [newTodo, setNewTodo] = useState('');
  const [haveTodoLength, setHaveTodoLength] = useState(0);

  const handleRemoveTodo = (todo) => {
    setTodoData(
      todoData.filter((item) => {
        return item.id !== todo.id;
      }),
    );
  };

  const handleToggleTodo = (todo) => {
    setTodoData(
      todoData.filter((item) => {
        if (item.id === todo.id) {
          item.status = !todo.status;
        }
        return { ...item };
      }),
    );
  };

  const handleEditTodo = (todo, e) => {
    setTodoData(
      todoData.map((item) => {
        if (item.id === todo.id) {
          return { ...item, content: e.target.value };
        }
        return { ...item };
      }),
    );
  };

  const handleAddInputChange = (e) => {
    setNewTodo(e.target.value.trim());
  };

  const handleAddTodo = () => {
    if (!newTodo) {
      return;
    }

    const newTodoItem = {
      id: self.crypto.randomUUID(),
      content: newTodo,
      status: false,
      createTime: new Date(),
    };

    setTodoData([...todoData, newTodoItem]);
    setNewTodo('');
  };

  const handleClearTodo = () => {
    setTodoData(todoData.filter((item) => !item.status));
  };

  useEffect(() => {
    if (data) {
      setTodoData([...data]);
    }
  }, []);

  useEffect(() => {
    if (todoData) {
      setHaveTodoLength(todoData.filter((item) => !item.status).length);
    }
  }, [todoData]);

  return (
    <>
      <ResetStyle />
      <BaseStyle />

      <Wrapper>
        <Container>
          <Navbar>
            <a href="#">
              <h1 className="h1-logo">TODOLIST</h1>
            </a>
          </Navbar>

          <Main>
            <InputContainer>
              <input
                type="text"
                name="content"
                id="newTodo"
                value={newTodo}
                onChange={(e) => handleAddInputChange(e)}
              />

              <ButtonAddTodo onClick={handleAddTodo}>ADD</ButtonAddTodo>
            </InputContainer>

            <Card>
              <CardHeader>
                <TabList>
                  <TabItem>
                    <button type="button" className="tab tab-checked">
                      全部
                    </button>
                  </TabItem>
                  <TabItem>
                    <button type="button" className="tab">
                      待完成
                    </button>
                  </TabItem>
                  <TabItem>
                    <button type="button" className="tab">
                      已完成
                    </button>
                  </TabItem>
                </TabList>
              </CardHeader>

              <CardBody>
                <TodoList>
                  {todoData &&
                    todoData.map((todo) => {
                      return (
                        <TodoListItem key={todo.id}>
                          <TodoListItemContainer>
                            <label className="custom-check cursor-pointer">
                              <input
                                type="checkbox"
                                name="checkbox"
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
                                onClick={() => setIsEditId(todo.id)}
                              >
                                {todo.content}
                              </ButtonTodoContent>
                            )}

                            <ButtonRemoveTodo
                              onClick={() => handleRemoveTodo(todo)}
                            >
                              <span className="material-symbols-outlined">
                                close
                              </span>
                            </ButtonRemoveTodo>
                          </TodoListItemContainer>
                        </TodoListItem>
                      );
                    })}
                </TodoList>
              </CardBody>

              <CardFooter>
                <p>
                  <span>{haveTodoLength}</span> 個待完成項目
                </p>

                <ButtonClearTodo onClick={handleClearTodo}>
                  清除已完成項目
                </ButtonClearTodo>
              </CardFooter>
            </Card>
            {/* end of card */}
          </Main>
        </Container>
      </Wrapper>
    </>
  );
}

export default App;
