import { SuggestionList, Dropdown } from './Styles';
import { ICity } from '../../types/interface';
import { FC } from 'react';
import { ListItem } from './ListItem';

interface ISuggestionsList {
  suggestions: ICity[];
  preferences: number[];
  onClick: () => void;
  value: string;
}

const SuggestionsList: FC<ISuggestionsList> = ({
  suggestions,
  onClick,
  value,
  preferences,
}) => {
  if (!suggestions.length) return null;

  return (
    <Dropdown>
      <SuggestionList>
        {suggestions.map((suggestion, index) => {
          const isSelected = preferences.find((e) => e == suggestion.geonameid);
          return (
            <ListItem
              onClick={onClick}
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
