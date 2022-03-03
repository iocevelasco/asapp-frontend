import styled from 'styled-components';
import React, { useState } from 'react';
import { Container } from '../../components/helpers/Container';
import { Typography } from 'antd';
import { AutoComplete } from '../../components/AutoComplete/AutoComplete';
import { Select, Spin } from 'antd';
const { Option } = Select;

const { Title } = Typography;

const SearchContainer = ({ cities }) => {
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);

  const [input, setInput] = useState('');

  console.log('cities', cities);

  const handleChange = (event) => {
    console.log(event);
  };

  const onChange = (e) => {
    const userInput = e.target.value;

    // Filter our suggestions that don't contain the user's input
    const unLinked = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().indexOf(userInput.toLowerCase()) > -1,
    );

    setInput(e.target.value);
    setFilteredSuggestions(unLinked);
    setActiveSuggestionIndex(0);
    setShowSuggestions(true);
  };

  const onClick = (e) => {
    setFilteredSuggestions([]);
    setInput(e.target.innerText);
    setActiveSuggestionIndex(0);
    setShowSuggestions(false);
  };
  return (
    <Container>
      <p>title</p>
      <AutoComplete
        onClick={onClick}
        suggestions={cities}
        onChange={onChange}
      />
    </Container>
  );
};

export default SearchContainer;
