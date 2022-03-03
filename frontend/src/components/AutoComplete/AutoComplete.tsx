import { useState } from 'react';
import { StyledInput, Container, InputWrapper, SuggestionList } from './Styles';

const AutoComplete = ({
  suggestions,
  onChange,
  onClick,
  activeSuggestionIndex,
}) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const onHandlerchange = (e) => {
    const userInput = e.target.value;
    setInput(userInput);
    onChange(userInput);
    setShowSuggestions(true);
  };

  const SuggestionsListComponent = () => {
    return filteredSuggestions.length ? (
      <SuggestionList>
        {filteredSuggestions.map((suggestion, index) => {
          let className;
          // Flag the active suggestion with a class
          if (index === activeSuggestionIndex) {
            className = 'suggestion-active';
          }
          return (
            <li className={className} key={suggestion} onClick={onClick}>
              {suggestion}
            </li>
          );
        })}
      </SuggestionList>
    ) : (
      <div className="no-suggestions">
        <em>No suggestions, you're on your own!</em>
      </div>
    );
  };

  return (
    <Container>
      <InputWrapper>
        <StyledInput type="text" onChange={onHandlerchange} value={input} />
        {showSuggestions && input && <SuggestionsListComponent />}
      </InputWrapper>
    </Container>
  );
};

export { AutoComplete };
