/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import TodoList from './TodoList';
import picEmpty from '../assets/empty.webp';

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

const ButtonClearTodo = styled.button`
  color: #9f9a91;
  transition: transform 0.3s linear;

  &:hover {
    font-weight: bold;
    color: #333333;
    transform: scale(1.02);
  }
`;

const EmptyGroup = styled.hgroup`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-top: 60px;
  gap: 16px;
  color: #333333;
`;

// end of styled

function TodoListCard(props) {
  const { todoData, updateData } = props;

  const [filterData, setFilterData] = useState([]);
  const [haveTodoLength, setHaveTodoLength] = useState(0);

  const [isClickTab, setIsClickTab] = useState('ALL');

  const handleTabClick = (type) => {
    setIsClickTab(type);
  };
  // end of handleTabClick

  const handleClearTodo = () => {
    const newData = todoData.filter((item) => !item.status);

    updateData(newData);
  };
  // end of handleClearTodo

  useEffect(() => {
    setFilterData(
      todoData.filter((item) => {
        if (isClickTab === 'ALL') {
          return true;
        }
        if (isClickTab === 'TODO') {
          return !item.status;
        }
        if (isClickTab === 'DONE') {
          return item.status;
        }
      }),
    );

    setHaveTodoLength(todoData.filter((item) => !item.status).length);
  }, [todoData, isClickTab, setFilterData]);
  // end of useEffect

  if (!todoData.length) {
    return (
      <>
        <EmptyGroup>
          <h2>目前尚無待辦事項 (≥o≤)</h2>
          <img loading="lazy" src={picEmpty} alt="empty" />
        </EmptyGroup>
      </>
    );
  }
  // end of (!todoData.length)

  return (
    <>
      <Card>
        <CardHeader>
          <TabList>
            <TabItem>
              <button
                type="button"
                aria-label="ALL"
                className={`tab ${isClickTab === 'ALL' && 'tab-checked'}`}
                onClick={() => handleTabClick('ALL')}
              >
                全部
              </button>
            </TabItem>
            <TabItem>
              <button
                type="button"
                aria-label="TODO"
                className={`tab ${isClickTab === 'TODO' && 'tab-checked'}`}
                onClick={() => handleTabClick('TODO')}
              >
                待完成
              </button>
            </TabItem>
            <TabItem>
              <button
                type="button"
                aria-label="DONE"
                className={`tab ${isClickTab === 'DONE' && 'tab-checked'}`}
                onClick={() => handleTabClick('DONE')}
              >
                已完成
              </button>
            </TabItem>
          </TabList>
        </CardHeader>

        <CardBody>
          <TodoList
            todoData={todoData}
            filterData={filterData}
            updateData={updateData}
          />
        </CardBody>

        <CardFooter>
          <button
            type="button"
            aria-label="data's length of have todo"
            onClick={() => handleTabClick('TODO')}
          >
            <span>{haveTodoLength}</span> 個待完成項目
          </button>

          <ButtonClearTodo aria-label="CLEAR" onClick={handleClearTodo}>
            清除已完成項目
          </ButtonClearTodo>
        </CardFooter>
      </Card>
    </>
  );
}
// end of TodoListCard

export default TodoListCard;
