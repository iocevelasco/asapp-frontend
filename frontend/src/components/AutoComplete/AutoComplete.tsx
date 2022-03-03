import { FC, useState, useEffect } from 'react';
import {
  StyledInput,
  Container,
  InputWrapper,
  SuggestionList,
  Dropdown,
} from './Styles';
import { ICity } from '../../types/interface';

interface IAutocomplete {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onClick: (value: ICity) => void;
  suggestions: ICity[];
  activeSuggestionIndex: ICity[];
}

const AutoComplete: FC<IAutocomplete> = ({
  suggestions,
  onClick,
  activeSuggestionIndex,
  onChange,
  value,
  placeholder,
}) => {
  // useEffect(() => {
  //   if (suggestions.length) {
  //     setShowSuggestions(true);
  //   }
  // }, [suggestions]);

  const onHandlerchange = (e: { target: { value: string } }) => {
    const userInput = e.target.value;
    onChange(userInput);
  };

  const SuggestionsListComponent = () => {
    return suggestions.length ? (
      <Dropdown>
        <SuggestionList>
          {suggestions.map((suggestion, index) => {
            let className;
            // Flag the active suggestion with a class
            if (index === activeSuggestionIndex) {
              className = 'suggestion-active';
            }
            return (
              <li
                className={className}
                key={index}
                onClick={() => onClick(suggestion)}
              >
                {suggestion.country}
                {suggestion.name}
                {suggestion.substring}
              </li>
            );
          })}
        </SuggestionList>
      </Dropdown>
    ) : (
      <div className="no-suggestions">
        <em>No suggestions, you're on your own!</em>
      </div>
    );
  };

  return (
    <Container>
      <InputWrapper>
        <StyledInput
          type="text"
          placeholder={placeholder}
          onChange={onHandlerchange}
          value={value}
        />
        {value && <SuggestionsListComponent />}
      </InputWrapper>
    </Container>
  );
};

export { AutoComplete };
