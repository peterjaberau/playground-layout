export interface Props {
  orientation?: "horizontal" | "vertical" | undefined
  items: ItemProps[]
  disabled?: boolean | undefined
  // onValueChange?: ((details: ValueChangeDetails<T>) => void) | undefined
  value?: string[] | undefined
  defaultValue?: string[] | undefined
  deselectable?: boolean | undefined
  onSelect?: ((value: string) => void) | undefined
}

export interface PropsState {

}

export interface Api {
  selectedValue: string[]
  hasSelectedItems: boolean
  value: string[]
  selectValue: (value: string) => void
  setValue: (value: string[]) => void
  clearValue: (value?: string) => void
  getItemProps: (value: string) => ItemProps
  /**
   * returns the selected item(s) state
   */
  getItem: (value: string) => ItemState
  getSelectedItems: () => ItemState[]
  disabled: boolean
}



export interface ItemProps {
  text?: string | undefined
  icon?: string | undefined
  value: string | null
}

export interface ItemState {
  value: string
  icon?: string
  disabled: boolean
  selected: boolean
  highlighted: boolean
}

