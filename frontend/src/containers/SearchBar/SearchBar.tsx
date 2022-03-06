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
  const [searchQuery, setSearchQuery] = useState({});
  const onChange = (value: string) => {
    setQuery(value);
    const search = lodash.debounce(sendQuery, 500);

    setSearchQuery((prevSearch) => {
      if (prevSearch.cancel) {
        prevSearch.cancel();
      }
      return search;
    });

    if (search) {
      search(value);
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

  const onClick = async (itemSelected, checked: ICity) => {
    setCitiSelected(itemSelected);
    setQuery(itemSelected.name);
    await addToPreferenceUser(itemSelected.geonameid, checked);

    const updatesuggestion = suggestions.map((suggestion) => {
      const isSelected = preferences.find((e) => e == itemSelected.geonameid);
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
          onClick={onClick}
          suggestions={suggestions}
          onChange={onChange}
          value={query}
          loading={loading}
          placeholder="Select your city"
          preferences={preferences}
        />
      </div>
    </div>
  );
};

export default SearchBar;
