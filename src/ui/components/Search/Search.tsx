import { TextInput } from '../TextInput';

interface SearchProps {
  isMini?: boolean;
  value: string;
  onChange(value: string): void;
}

export const Search: React.FC<SearchProps> = ({ isMini, value, onChange }) => {
  return (
    <TextInput
      iconLeft="search"
      iconRight={value ? 'close' : undefined}
      isMini={isMini}
      placeholder="Search here..."
      type="search"
      value={value}
      width="auto"
      onChange={onChange}
      onClickRightIcon={() => onChange('')}
    />
  );
};
