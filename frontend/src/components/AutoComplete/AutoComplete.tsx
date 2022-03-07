import { FC, useMemo } from 'react';
import { StyledInput, Container, InputWrapper, SpinWrapper } from './Styles';
import { ICity } from '../../types/interface';
import { Spin, Typography } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { SuggestionsList } from './SuggestionsList';
const { Text } = Typography;

interface IAutocomplete {
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  onClick: (itemSelected: ICity, value: string) => void;
  suggestions: ICity[];
  loading: boolean;
  preferences: number[];
}

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const AutoComplete: FC<IAutocomplete> = ({
  suggestions,
  onClick,
  loading,
  onChange,
  value,
  placeholder,
  preferences,
}) => {
  const emptyMessage = useMemo(() => {
    if (value.length) {
      return !suggestions.length ? <Text>Not result found</Text> : null;
    } else {
      return null;
    }
  }, [suggestions.length]);

  return (
    <Container>
      <InputWrapper>
        <Text strong>City Selector</Text>
        <StyledInput
          type="text"
          placeholder={placeholder}
          onChange={(ev) => onChange(ev.target.value)}
          value={value}
        />
        <SpinWrapper loading={loading}>
          <Spin indicator={antIcon} />
        </SpinWrapper>
        {value && (
          <SuggestionsList
            preferences={preferences}
            suggestions={suggestions}
            onClick={onClick}
            value={value}
          />
        )}
      </InputWrapper>
      {emptyMessage}
    </Container>
  );
};

export { AutoComplete };
