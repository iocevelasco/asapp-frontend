import { ListItemWrapper, ListLabel } from './Styles';
import { ICity } from '../../types/interface';
import { Typography, Checkbox } from 'antd';
const { Text } = Typography;

interface IListItem {
  item: ICity;
  onClick: (suggestion, isCheckbox) => {};
  currentValue: string;
  index: number;
}

const ListItem = ({ item, onClick, currentValue }: IListItem) => {
  return (
    <ListItemWrapper onClick={() => onClick(item, isCheckbox)}>
      <Checkbox checked={item.isSelected}>
        <ListLabel>
          {findMatches(item.name, currentValue)}
          <div>
            <Text>{item.country}</Text> - <Text>{item.subcountry}</Text>
          </div>
        </ListLabel>
      </Checkbox>
    </ListItemWrapper>
  );
};

const findMatches = (
  text,
  currentValue: { text: string; currentValue: string },
) => {
  const index = text.indexOf(currentValue);
  const initialPart = text.substring(0, index);
  const middlePart = text.substring(index, currentValue.length);
  const lastPart = text.substring(currentValue.length);
  return (
    <span>
      <span>{initialPart}</span>
      <span style={{ fontWeight: 800 }}>{middlePart}</span>
      <span>{lastPart}</span>
    </span>
  );
};

export { ListItem };
