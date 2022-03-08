import { AutoComplete } from './AutoComplete';
import { SuggestionsList } from './SuggestionsList';
import { ListItem, findMatches } from './ListItem';
import {
  render,
  fireEvent,
  waitFor,
  screen,
  RenderResult,
  getAllByText,
} from '@testing-library/react';
import '@testing-library/jest-dom';

const suggestions = [
  {
    country: 'Argentina',
    geonameid: 10172104,
    isSelected: false,
    name: 'Adrogué',
    subcountry: 'Buenos Aires',
  },
  {
    country: 'Argentina',
    geonameid: 10172104,
    isSelected: false,
    name: 'Bahía Blanca',
    subcountry: 'Buenos Aires',
  },
];

const preferences = [10172104, 10172104];

describe('ListItems', () => {
  let props;
  let component: RenderResult<
    typeof import('@testing-library/dom/types/queries'),
    HTMLElement
  >;
  beforeEach(() => {
    component = render(
      <ListItem
        item={suggestions[0]}
        currentValue="Argentina"
        index={0}
        isSelected={true}
        onClick={() => {}}
      />,
    );
  });

  it('Should show the item seleted', () => {
    const { getByText } = component;
    expect(getByText('Adrogué'));
    expect(getByText('Buenos Aires'));
    expect(getByText('Argentina'));
  });
});

describe('SuggestionsList', () => {
  let component: RenderResult<
    typeof import('@testing-library/dom/types/queries'),
    HTMLElement
  >;
  beforeEach(() => {
    component = render(
      <SuggestionsList
        suggestions={suggestions}
        preferences={preferences}
        onClick={() => {}}
        value="Bahía Blanca"
      />,
    );
  });

  it('Should show suggesting list', () => {
    const element = screen.getByTestId('list-container');
    expect(element);
  });

  it('Should quantity list items', () => {
    const listElement = component.getAllByText('Buenos Aires');
    expect(listElement.length == 2);
  });

  it('Should quantity list items', () => {
    const listElement = component.getAllByText('Buenos Aires');
    expect(listElement.length == 2);
  });
});

describe('AutoComplete', () => {
  let component: RenderResult<
    typeof import('@testing-library/dom/types/queries'),
    HTMLElement
  >;

  it('Should render value', async () => {
    const handleClick = jest.fn();
    const onChange = jest.fn();

    const wrapper: RenderResult<
      typeof import('@testing-library/dom/types/queries'),
      HTMLElement
    > = render(
      <AutoComplete
        placeholder="Select the city"
        preferences={preferences}
        suggestions={suggestions}
        onChange={onChange}
        onClick={handleClick}
        value="Buenos Aires"
        loading={false}
      />,
    );
    const placeholder = wrapper.getByPlaceholderText(
      'Select the city',
    ) as HTMLInputElement;

    expect(placeholder);
    const input = (await document.getElementById(
      'autosuggest-input',
    )) as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'Buenos Aires' } });
    expect(input.value).toBe('Buenos Aires');
    const listElement = wrapper.getAllByText('Buenos Aires');
    expect(listElement.length == 2);
  });
});
