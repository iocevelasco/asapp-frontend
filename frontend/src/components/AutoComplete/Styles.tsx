import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
`;

export const StyledInput = styled.input`
  font-size: 14px;
  height: 44px;
  border-radius: var(--border-radius);
  margin-bottom: 0;
  transition: all 0.4s;
  padding: 8px 16px;
  font-weight: 300;
  flex: 1 1 50%;
  height: 100%;
  border: 1px solid var(--main-border-color);
  box-sizing: border-box;
  &::placeholder {
    color: #999;
  }
  &:focus {
    outline: none;
    border-color: blue;
    box-shadow: 0 0 0 1px #1990c6;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1;
`;

export const SuggestionList = styled.ul`
  border: 1px solid var(--main-border-color);
  border-top-width: 0;
  list-style: none;
  margin-top: 0;
  max-height: 143px;
  overflow-y: auto;
  padding-left: 0;
  width: calc(300px + 1rem);
  position: absolute;
  max-height: 400px;
  overflow-y: scroll;
  background-color: #fff;
  width: 100%;
  border-radius: 0 0 var(--border-radius) var(--border-radius);

  li {
    padding: 0.5rem;
  }

  li:hover {
    background-color: var(--primary-color);
    color: #fff;
    cursor: pointer;
    font-weight: 700;
  }
`;

export const Dropdown = styled.div`
  position: absolute;
  z-index: 10;
  bottom: 0;
  width: 100%;
  box-shadow: var(--box-shadow-base);
`;
