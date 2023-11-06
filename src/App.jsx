import { useEffect, useState } from 'react';
import styled from 'styled-components';

import initData from './data/data';
import ImgLogo from './assets/logo.svg'

import TodoAddInput from './components/TodoAddInput';
import TodoListCard from './components/TodoListCard';

import './styles/App.css';
// import styles from './styles/App.css?inline';
// import styles from './styles/App.css';

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
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 16px;
  padding-bottom: 16px;
`;

const NavLogo = styled.h1`
  background-image: url(${ImgLogo});
  background-repeat: no-repeat;

  width: 311px;
  height: 38.5px;

  text-indent: 101%;
  white-space: nowrap;
  overflow: hidden;
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

// end of styled

function App() {
  const [todoData, setTodoData] = useState([]);
  const [isClickTab, setIsClickTab] = useState('ALL');

  const getStoredData = () => {
    const storedData = localStorage.getItem('todoData');
    return storedData ? JSON.parse(storedData) : [];
  };

  const saveStoredData = (data) => {
    localStorage.setItem('todoData', JSON.stringify(data));
  };

  // end of localStorage

  const updateData = (newData) => {
    setTodoData(newData);
    saveStoredData(newData);
  };

  const handleResetData = () => {
    localStorage.removeItem('todoData');

    setTodoData([...initData]);
  };

  const handleTabClick = (type) => {
    setIsClickTab(type);
  };
  // end of handleTabClick

  useEffect(() => {
    if (!getStoredData().length) {
      saveStoredData([...initData]);
    }

    setTodoData([...getStoredData()]);
  }, []);
  // end of useEffect

  return (
    <>
      <Wrapper>
        <Container>
          <Navbar>
            <a href="#" title="TODOLIST">
              <NavLogo>TODOLIST</NavLogo>
            </a>

            <button type="button" onClick={handleResetData} aria-label="RESET">
              <span className="material-symbols-outlined">restart_alt</span>
            </button>
          </Navbar>

          <Main>
            <TodoAddInput
              todoData={todoData}
              updateData={updateData}
              handleTabClick={handleTabClick}
            />

            <TodoListCard
              todoData={todoData}
              updateData={updateData}
              isClickTab={isClickTab}
              handleTabClick={handleTabClick}
            />
          </Main>
        </Container>
      </Wrapper>
    </>
  );
}
// end of App()

export default App;
