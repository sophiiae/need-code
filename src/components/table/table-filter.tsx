import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'

interface SelectItemType {
  value: string,
  label: string,
  color?: string,
  disable?: boolean,
}

interface TableFilterProps {
  title: string,
  value: string,
  items: SelectItemType[],
  handleChange: (e: any) => void
}

export const TableFilter = ({ title, value, items, handleChange }: TableFilterProps) => {
  return (
    <FormControl sx={{ minWidth: 120 }} size='small'>
      <InputLabel id='filter-select-title'>{title}</InputLabel>
      <Select
        labelId='filter-select-item'
        id='filter-select-item'
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      >
        <MenuItem value=''>
          <em>None</em>
        </MenuItem>
        {
          items.map((item) =>
            <MenuItem
              value={item.value}
              key={item.value}
              sx={{ color: item.color ? item.color : 'inherit' }}
              disabled={item.disable}>
              {item.label}
            </MenuItem>
          )
        }
      </Select>
    </FormControl>
  )
}
