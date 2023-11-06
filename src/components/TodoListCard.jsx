import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

import { commonPropTypes } from '../data/propTypes';

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

const TabButton = styled.button`
  padding: 16px 32px 16px 30px;
  width: 100%;

  text-align: center;
  font-size: 14px;
  font-weight: 700;
  color: #9f9a91;
  transition: color 0.3s linear;

  ${(props) =>
    props.$isBorder &&
    css`
      color: #333333;
      border-bottom: 2px solid #333333;
    `}
`;

const ButtonClearTodo = styled.button`
  color: #9f9a91;
  transition: transform 0.3s linear;

  &:disabled {
    color: #9f9a91;
    transform: none;
    cursor: not-allowed;
  }

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
  const { todoData, updateData, isClickTab, handleTabClick } = props;

  const [filterData, setFilterData] = useState([]);
  const [haveTodoLength, setHaveTodoLength] = useState(0);
  const [haveClearLength, setHaveClearLength] = useState(0);

  const handleClearTodo = () => {
    const newData = todoData.filter((item) => !item.status);

    handleTabClick('DONE');
    updateData(newData);
  };
  // end of handleClearTodo

  useEffect(() => {
    setFilterData(
      [...todoData]
        .filter((item) => {
          if (isClickTab === 'ALL') {
            return true;
          }
          if (isClickTab === 'TODO') {
            return !item.status;
          }
          if (isClickTab === 'DONE') {
            return item.status;
          }
        })
        .reverse(),
    );

    setHaveTodoLength(todoData.filter((item) => !item.status).length);
    setHaveClearLength(todoData.filter((item) => item.status).length);
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
              <h2>
                <TabButton
                  aria-label="ALL"
                  $isBorder={isClickTab === 'ALL'}
                  onClick={() => handleTabClick('ALL')}
                >
                  全部
                </TabButton>
              </h2>
            </TabItem>
            <TabItem>
              <h2>
                <TabButton
                  aria-label="TODO"
                  $isBorder={isClickTab === 'TODO'}
                  onClick={() => handleTabClick('TODO')}
                >
                  待完成
                </TabButton>
              </h2>
            </TabItem>
            <TabItem>
              <h2>
                <TabButton
                  aria-label="DONE"
                  $isBorder={isClickTab === 'DONE'}
                  onClick={() => handleTabClick('DONE')}
                >
                  已完成
                </TabButton>
              </h2>
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

          <ButtonClearTodo
            aria-label="CLEAR"
            onClick={handleClearTodo}
            disabled={!haveClearLength}
            aria-disabled={!haveClearLength}
          >
            {haveClearLength ? '清除已完成項目' : '尚無項目可清除'}
          </ButtonClearTodo>
        </CardFooter>
      </Card>
    </>
  );
}
// end of TodoListCard

TodoListCard.propTypes = {
  ...commonPropTypes,
  isClickTab: PropTypes.string.isRequired,
  handleTabClick: PropTypes.func.isRequired,
};

export default TodoListCard;
