import React, { useState, FC, useEffect } from 'react';
import { Typography } from 'antd';
import { AutoComplete } from '../../components/AutoComplete/AutoComplete';
import classes from './SearchBar.module.css';
import lodash from 'lodash';
import { ICity } from '../../types/interface';
import { mapPreferences } from './utils';
import {
  fetchCities,
  addToPreferenceUser,
  fetchPreferencesCities,
} from '../../../services/cities';

const { Text } = Typography;

export interface ISearchType {
  cities: ICity[];
}

const SearchBar: FC = ({ setCitiSelected }) => {
  const [query, setQuery] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState({});

  const [suggestions, setSuggestion] = useState<ICity[]>([]);
  const [preferences, setPreferences] = useState<ICity[]>([]);

  const [loading, setLoading] = useState<boolean>(false);

  console.log('query', query);
  console.log('loading', loading);

  useEffect(() => {
    getPreferences();
  }, []);

  const getPreferences = async () => {
    const { result } = await fetchPreferencesCities();
    if (result) setPreferences(result.data);
    else setPreferences([]);
  };

  const onChange = (value: string) => {
    setQuery(value);
    const search = lodash.debounce(sendQuery, 500);

    setSearchQuery((prevSearch) => {
      if (prevSearch.cancel) {
        prevSearch.cancel();
      }
      return search;
    });

    if (value) {
      search(value);
    } else {
      setSuggestion([]);
    }
  };

  const sendQuery = async () => {
    setLoading(true);
    const { result } = await fetchCities(query);
    console.log('result', result);
    if (result) {
      setSuggestion(result.data);
      setLoading(false);
    } else {
      setSuggestion([]);
      setLoading(false);
    }
  };

  const onClick = async (e, value: ICity) => {
    setCitiSelected(e);
    setQuery(e.name);
    const { result } = await addToPreferenceUser(e.geonameid, value);

    setSuggestion(updateSelected);
    // await getPreferences();
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
        />
      </div>
    </div>
  );
};

export default SearchBar;
