import { useState } from 'react';
import styled from 'styled-components';

import { ResetStyle, BaseStyle } from './components/globalStyle';

import './styles/App.css';
// import styles from './styles/App.css?inline';
// import styles from './styles/App.css';


/**
 * Default and named imports from CSS files are deprecated. Use the ?inline query instead.
 * For example: import styles from './styles/App.css?inline'
 * Plugin: vite:import-analysis
 */

const Wrapper = styled.div`
  @media (min-width: 1024px) {
    height: 100vh;
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
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  margin-top: -2px;
  border-top: 2px solid #efefef;
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
`;

function App() {
  // const [count, setCount] = useState(0);

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
              <input type="text" name="content" id="newTodo" className="" />

              <ButtonAddTodo>ADD</ButtonAddTodo>
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
                <ul className="todo-list">
                  <TodoListItem>
                    <TodoListItemContainer>
                      <label className="custom-check cursor-pointer">
                        <input type="checkbox" name="checkbox" value={true} />
                        <span className="checkmark"></span>
                      </label>

                      <input
                        type="text"
                        name="content"
                        id="todo"
                        className="todo-input todo-checked"
                        value={true}
                      />

                      <button type="button">
                        <span className="material-symbols-outlined">close</span>
                      </button>
                    </TodoListItemContainer>
                  </TodoListItem>
                </ul>
              </CardBody>

              <CardFooter>
                <p>
                  <span>5</span> 個待完成項目
                </p>

                <button type="button">清除已完成項目</button>
              </CardFooter>
            </Card>
            {/* end of card */}

            {/* <button onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button> */}
          </Main>
        </Container>
      </Wrapper>
    </>
  );
}

export default App;
