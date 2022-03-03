import styled from 'styled-components';

export const Container = styled.div`
position: relative;
display: flex;
height: '36px')};
  input {
    border-color: #b7b7b7};
  }
`;

export const StyledInput = styled.input`
  font-size: 14px;
  height: 44px;
  border-radius: 8px;
  margin-bottom: 0;
  transition: all 0.4s;
  padding: 2erm;
  font-weight: 300;
  flex: 1 1 50%;
  height: 100%;
  box-sizing: border-box;
  &::placeholder {
    color: red;
  }
  &:focus {
    outline: none;
    border-color: blue;
    box-shadow: 0 0 0 1px #1990c6 !important;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  height: '36px')};
`;

export const SuggestionList = styled.ul`
  border: 1px solid #999;
  border-top-width: 0;
  list-style: none;
  margin-top: 0;
  max-height: 143px;
  overflow-y: auto;
  padding-left: 0;
  width: calc(300px + 1rem);

  li {
    padding: 0.5rem;
  }

  li:hover {
    background-color: #008f68;
    color: #fae042;
    cursor: pointer;
    font-weight: 700;
  }

  li:not(:last-of-type) {
    border-bottom: 1px solid #999;
  }
`;
