import { SuggestionList, Dropdown } from './Styles';
import { ICity } from '../../types/interface';
import { FC } from 'react';
import { ListItem } from './ListItem';

interface ISuggestionsList {
  suggestions: ICity[];
  onClick: (suggestion, isCheckbox) => {};
  value: string;
}

const SuggestionsList: FC<ISuggestionsList> = ({
  suggestions,
  onClick,
  value,
}) => {
  if (!suggestions.length) return null;

  return (
    <Dropdown>
      <SuggestionList>
        {suggestions.map((suggestion, index) => {
          return (
            <ListItem
              onClick={onClick}
              key={index}
              index={index}
              item={suggestion}
              currentValue={value}
            />
          );
        })}
      </SuggestionList>
    </Dropdown>
  );
};

export { SuggestionsList };
