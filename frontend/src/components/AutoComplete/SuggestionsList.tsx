import { SuggestionList, Dropdown } from './Styles';
import { ICity } from '../../types/interface';
import { FC } from 'react';
import { ListItem } from './ListItem';

interface ISuggestionsList {
  suggestions: ICity[];
  preferences: number[];
  onClick: (ICity: ICity, value: string) => void;
  value: string;
}

const SuggestionsList: FC<ISuggestionsList> = ({
  suggestions,
  onClick,
  value,
  preferences,
}) => {
  console.log('suggestions', suggestions);
  if (!suggestions.length) return null;

  return (
    <Dropdown>
      <SuggestionList data-testid={'list-container'}>
        {suggestions.map((suggestion, index) => {
          const isSelected = preferences.find((e) => e == suggestion.geonameid)
            ? true
            : false;
          return (
            <ListItem
              onClick={onClick}
              data-testid={`${index}-list-item`}
              key={index}
              index={index}
              item={suggestion}
              currentValue={value}
              isSelected={isSelected}
            />
          );
        })}
      </SuggestionList>
    </Dropdown>
  );
};

export { SuggestionsList };
