import React, { Dispatch, SetStateAction, useState, FC } from 'react';
import { AutoComplete } from '../../components/AutoComplete/AutoComplete';
import classes from './SearchBar.module.css';
import lodash from 'lodash';
import { ICity } from '../../types/interface';
import { fetchCities, addToPreferenceUser } from '../../../services/cities';

export interface ISearchType {
  setCitiSelected: Dispatch<SetStateAction<ICity>>;
  preferences: number[];
}

const SearchBar: FC<ISearchType> = ({ setCitiSelected, preferences }) => {
  const [query, setQuery] = useState<string>('');
  const [suggestions, setSuggestion] = useState<ICity[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const [, setSearchQuery] = useState<any>({});
  const onChange = (value: string) => {
    setQuery(value);
    const search = lodash.debounce(sendQuery, 500);

    setSearchQuery((prevSearch: { cancel: () => void }) => {
      if (prevSearch.cancel) {
        prevSearch.cancel();
      }
      return search;
    });

    if (search) {
      search();
    } else {
      setSuggestion([]);
    }
  };

  const sendQuery = async () => {
    setLoading(true);
    const { result } = await fetchCities(query);
    if (result) {
      setSuggestion(result.data);
      setLoading(false);
    } else {
      setSuggestion([]);
      setLoading(false);
    }
  };

  const onClick = async (
    itemSelected: ICity,
    checked: boolean,
  ): Promise<void> => {
    setQuery(itemSelected.name);
    await addToPreferenceUser(itemSelected.geonameid, checked);
    setCitiSelected(itemSelected);

    const updatesuggestion = suggestions.map((suggestion) => {
      const isSelected = preferences.find((e) => e == itemSelected.geonameid)
        ? true
        : false;
      return {
        ...suggestion,
        isSelected,
      };
    });

    setSuggestion(updatesuggestion);
  };

  return (
    <div className={classes.container}>
      <div className={classes.input}>
        <AutoComplete
          placeholder="Select the city"
          preferences={preferences}
          suggestions={suggestions}
          onChange={onChange}
          onClick={onClick}
          value={query}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default SearchBar;
