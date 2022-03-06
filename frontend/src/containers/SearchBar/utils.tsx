import { ICity } from '../../types/interface';
export const mapPreferences = (
  suggestion,
  preferences: { suggestion: ICity[]; preferences: number[] },
) => {
  const result = suggestion.map((city) => {
    const citySelected = preferences.find((e) => e === city.geonameid);
    return {
      geonameid: city.geonameid,
      name: city.name,
      country: city.country,
      subcountry: city.subcountry ? city.subcountry : '',
      isSelected: citySelected ? true : false,
    };
  });
  return result;
};
