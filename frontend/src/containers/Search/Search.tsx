import styled from 'styled-components';
import React, { useState, FC } from 'react';
import { Typography } from 'antd';
import { AutoComplete } from '../../components/AutoComplete/AutoComplete';
import { Select, Spin } from 'antd';
import classes from './Search.module.css';
import { ICity } from '../../types/interface';

const { Option } = Select;

const { Title } = Typography;

export interface ISearchType {
  cities: ICity[];
}

const SearchContainer: FC<ISearchType> = ({ cities }) => {
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState<number>(0);
  const [filteredSuggestions, setFilteredSuggestions] = useState<ICity[]>([]);
  const [citiSelected, setCitiSelected] = useState<ICity>({});

  const [input, setInput] = useState('');
  console.log('filteredSuggestions', filteredSuggestions);

  const onChange = (userInput: string) => {
    setInput(userInput);
    const unLinked = cities.filter(
      (suggestion) =>
        suggestion.country.toLowerCase().indexOf(input.toLowerCase()) > -1,
    );
    setFilteredSuggestions(unLinked);
    setActiveSuggestionIndex(0);
  };

  const onClick = (e: ICity) => {
    setCitiSelected(e);
    setInput(e.country);
    setFilteredSuggestions([]);
    setActiveSuggestionIndex(0);
  };

  console.log('activeSuggestionIndex', activeSuggestionIndex);
  //console.log('input', input);
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        {citiSelected ? (
          <p>Select your favorite city</p>
        ) : (
          <p>{citiSelected.country}</p>
        )}
      </div>
      <div className={classes.input}>
        <AutoComplete
          onClick={onClick}
          suggestions={filteredSuggestions}
          onChange={onChange}
          value={input}
          placeholder="Select your city"
        />
      </div>
    </div>
  );
};

export default SearchContainer;
