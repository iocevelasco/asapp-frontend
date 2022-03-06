export interface ICity {
  geonameid: number|null;
  name: string;
  country: string;
  subcountry?: string;
  isSelected?:boolean;
}