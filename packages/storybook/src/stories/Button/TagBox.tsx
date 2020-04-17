import {
  TagPicker,
  IBasePicker,
  ITag,
  Checkbox,
  mergeStyles,
} from '@fluentui/react';
import React from 'react';

const rootClass = mergeStyles({});

const _testTags: ITag[] = [
  'black',
  'blue',
  'brown',
  'cyan',
  'green',
  'magenta',
  'mauve',
  'orange',
  'pink',
  'purple',
  'red',
  'rose',
  'violet',
  'white',
  'yellow',
].map((item) => ({ key: item, name: item }));

// eslint-disable-next-line @typescript-eslint/interface-name-prefix
export interface ITagPickerDemoPageState {
  isPickerDisabled?: boolean;
}
export interface TagPickerDemoPageProps {
  isPickerDisabled?: boolean;
  selectedItems?: ITag[];
}

export class TagPickerBasicExample extends React.Component<
  TagPickerDemoPageProps,
  ITagPickerDemoPageState
> {
  // All pickers extend from BasePicker specifying the item type.
  private _picker = React.createRef<IBasePicker<ITag>>();

  constructor(props: { isPickerDisabled: false; selectedItems: [] }) {
    super(props);
    this.state = {
      isPickerDisabled: props.isPickerDisabled,
    };
  }

  public render() {
    return (
      <div className={rootClass}>
        <TagPicker
          selectedItems={this.props.selectedItems}
          removeButtonAriaLabel="Remove"
          componentRef={this._picker}
          onResolveSuggestions={this._onFilterChangedNoFilter as any}
          onItemSelected={this._onItemSelected as any}
          getTextFromItem={this._getTextFromItem}
          pickerSuggestionsProps={{
            suggestionsHeaderText: 'Suggested Tags',
            noResultsFoundText: 'No Color Tags Found',
          }}
          itemLimit={2}
          disabled={this.state.isPickerDisabled}
          inputProps={{
            onBlur: (ev: React.FocusEvent<HTMLInputElement>) =>
              console.log('onBlur called'),
            onFocus: (ev: React.FocusEvent<HTMLInputElement>) =>
              console.log('onFocus called'),
            'aria-label': 'Tag Picker',
          }}
        />
      </div>
    );
  }

  private _getTextFromItem(item: ITag): string {
    return item.name;
  }

  private _onDisabledButtonClick = (): void => {
    this.setState({
      isPickerDisabled: !this.state.isPickerDisabled,
    });
  };

  private _onFilterChanged = (filterText: string, tagList: ITag[]): ITag[] => {
    return filterText
      ? _testTags
          .filter(
            (tag) =>
              tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0,
          )
          .filter((tag) => !this._listContainsDocument(tag, tagList))
      : [];
  };

  private _onFilterChangedNoFilter = (
    filterText: string,
    tagList: ITag[],
  ): ITag[] => {
    return filterText
      ? _testTags.filter(
          (tag) =>
            tag.name.toLowerCase().indexOf(filterText.toLowerCase()) === 0,
        )
      : [];
  };

  private _onItemSelected = (item: ITag): ITag | null => {
    if (
      this._picker.current &&
      this._listContainsDocument(item, this._picker.current.items)
    ) {
      return null;
    }
    return item;
  };

  private _listContainsDocument(tag: ITag, tagList?: ITag[]) {
    if (!tagList || !tagList.length || tagList.length === 0) {
      return false;
    }
    return (
      tagList.filter((compareTag) => compareTag.key === tag.key).length > 0
    );
  }
}
