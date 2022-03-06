import { useState, useEffect } from 'react';
import { fetchPreferencesCities } from '../../services/cities';
import { ICity } from '../src/types/interface';
export const usePreferences = (citiSelected) => {
  const [preferences, setPreferences] = useState([]);

  useEffect(() => {
    const getPreferences = async () => {
      const { result } = await fetchPreferencesCities();
      if (result) {
        setPreferences(result.data);
      } else {
        setPreferences([]);
      }
    };

    getPreferences();
  }, [citiSelected]);

  return { preferences };
};
