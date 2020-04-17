import {
  mergeStyleSets,
  IRawStyle,
  ISelection,
  Check,
  Selection,
  memoizeFunction,
  CommandBar,
  MarqueeSelection,
  SelectionZone,
  IContextualMenuItem,
  SelectionMode,
  IObjectWithKey,
} from '@fluentui/react';
import React from 'react';
type IExampleItem = {
  name: string;
  color: string;
  thumbnail: string;
  description: string;
  shape: string;
  width: number;
  height: number;
  location: string;
} & IObjectWithKey;
function createListItems(count: number, startIndex = 0): IExampleItem[] {
  if (startIndex === void 0) {
    startIndex = 0;
  }
  return Array.from(new Array(count), function(item, index): IExampleItem {
    const size = 150 + Math.round(Math.random() * 100);
    return {
      thumbnail: '//placehold.it/' + size + 'x' + size,
      // eslint-disable-next-line no-useless-concat
      key: 'item-' + (index + startIndex) + ' ' + 'ee',
      name: 'lorem',
      description: 'lorem',
      color: 'red',
      shape: '',
      location: '',
      width: size,
      height: size,
    };
  });
}
const commonStyles: IRawStyle = {
  display: 'inline-block',
  cursor: 'default',
  boxSizing: 'border-box',
  verticalAlign: 'top',
  background: 'none',
  backgroundColor: 'transparent',
  border: 'none',
};
const classNames = mergeStyleSets({
  item: {
    selectors: {
      '&:hover': { background: '#eee' },
    },
  },
  // Overwrites the default style for Button
  check: [commonStyles, { padding: '11px 8px' }],
  cell: [
    commonStyles,
    {
      overflow: 'hidden',
      height: 36,
      padding: 8,
    },
  ],
});

const ITEM_COUNT = 100;

type ISelectionBasicExampleState = {
  items: IExampleItem[];
  selection: ISelection;
  selectionMode: SelectionMode;
  canSelect: 'all' | 'vowels';
};

type ISelectionItemExampleProps = {
  item: IExampleItem;
  itemIndex?: number;
  selection?: ISelection;
  selectionMode?: SelectionMode;
};

/**
 * The SelectionItemExample controls and displays the selection state of a single item
 */
const SelectionItemExample: React.FunctionComponent<ISelectionItemExampleProps> = (
  props: ISelectionItemExampleProps,
) => {
  const { item, itemIndex, selection } = props;
  let isSelected = false;

  if (selection && itemIndex !== undefined) {
    isSelected = selection.isIndexSelected(itemIndex);
  }

  return (
    <div
      className={classNames.item}
      data-is-focusable={true}
      data-selection-index={itemIndex}
    >
      {selection &&
        selection.canSelectItem(item) &&
        selection.mode !== SelectionMode.none && (
          <div
            className={classNames.check}
            data-is-focusable={true}
            data-selection-toggle={true}
          >
            <Check checked={isSelected} />
          </div>
        )}
      <span className={classNames.cell}>{item.name}</span>
      <a
        className={classNames.cell}
        href="https://bing.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Link that avoids selection
      </a>
      <a
        className={classNames.cell}
        data-selection-select={true}
        href="https://bing.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        Link that selects first
      </a>
    </div>
  );
};

/**
 * The SelectionBasicExample controls the selection state of all items
 */
export class SelectionBasicExample extends React.Component<
  {},
  ISelectionBasicExampleState
> {
  private _hasMounted: boolean;

  constructor(props: {}) {
    super(props);

    this._hasMounted = false;
    // Memoizing this means that given the same parameters, it will return the same array of command objects
    // (performance optimization)
    this._getCommandItems = memoizeFunction(this._getCommandItems);

    this.state = {
      items: createListItems(ITEM_COUNT),
      selection: new Selection({
        onSelectionChanged: this._onSelectionChanged,
      }),
      selectionMode: SelectionMode.multiple,
      canSelect: 'all',
    };
    this.state.selection.setItems(this.state.items, false);
  }

  public componentDidMount(): void {
    this._hasMounted = true;
  }
  /* eslint-disable @typescript-eslint/no-explicit-any */
  public render(): JSX.Element {
    const { items, selection, canSelect } = this.state;

    return (
      <div className="ms-SelectionBasicExample">
        <CommandBar items={this._getCommandItems(selection.mode, canSelect)} />
        <MarqueeSelection
          selection={selection}
          isEnabled={selection.mode === SelectionMode.multiple}
        >
          <SelectionZone
            selection={selection}
            onItemInvoked={this._alertItem as any}
          >
            {items.map((item: IExampleItem, index: number) => (
              <SelectionItemExample
                key={item.key}
                item={item}
                itemIndex={index}
                selection={selection}
              />
            ))}
          </SelectionZone>
        </MarqueeSelection>
      </div>
    );
  }

  private _alertItem = (item: IExampleItem): void => {
    alert('item invoked: ' + item.name);
  };

  private _onSelectionChanged = (): void => {
    if (this._hasMounted) {
      this.forceUpdate();
    }
  };

  private _onToggleSelectAll = (): void => {
    const { selection } = this.state;
    selection.toggleAllSelected();
  };

  private _onSelectionModeChanged = (
    ev: React.MouseEvent<HTMLElement>,
    menuItem: IContextualMenuItem,
  ): void => {
    this.setState((previousState) => {
      const newSelection = new Selection({
        onSelectionChanged: this._onSelectionChanged,
        canSelectItem:
          previousState.canSelect === 'vowels'
            ? (this._canSelectItem as any)
            : undefined,
        selectionMode: menuItem.data,
      });
      newSelection.setItems(previousState.items, false);

      return {
        selection: newSelection,
      };
    });
  };

  private _onCanSelectChanged = (
    ev: React.MouseEvent<HTMLElement>,
    menuItem: IContextualMenuItem,
  ): void => {
    const canSelectItem =
      menuItem.data === 'vowels' ? this._canSelectItem : undefined;

    this.setState((previousState: ISelectionBasicExampleState) => {
      const newSelection = new Selection({
        onSelectionChanged: this._onSelectionChanged,
        canSelectItem: canSelectItem as any,
        selectionMode: previousState.selection.mode,
      });
      newSelection.setItems(previousState.items, false);
      return {
        selection: newSelection,
        canSelect: menuItem.data === 'vowels' ? 'vowels' : 'all',
      };
    });
  };

  private _canSelectItem = (item: IExampleItem): boolean => {
    return /^[aeiou]/.test(item.name || '');
  };

  private _getCommandItems = (
    selectionMode: SelectionMode,
    canSelect: 'all' | 'vowels',
  ): IContextualMenuItem[] => {
    return [
      {
        key: 'selectionMode',
        text: 'Selection Mode',

        subMenuProps: {
          items: [
            {
              key: SelectionMode[SelectionMode.none],
              text: 'None',
              canCheck: true,
              checked: selectionMode === SelectionMode.none,
              onClick: this._onSelectionModeChanged as any,
              data: SelectionMode.none,
            },
            {
              key: SelectionMode[SelectionMode.single],
              text: 'Single select',
              canCheck: true,
              checked: selectionMode === SelectionMode.single,
              onClick: this._onSelectionModeChanged as any,
              data: SelectionMode.single,
            },
            {
              key: SelectionMode[SelectionMode.multiple],
              name: 'Multi select',
              canCheck: true,
              checked: selectionMode === SelectionMode.multiple,
              onClick: this._onSelectionModeChanged as any,
              data: SelectionMode.multiple,
            },
          ],
        },
      },
      {
        key: 'selectAll',
        text: 'Select All',
        iconProps: { iconName: 'CheckMark' },
        onClick: this._onToggleSelectAll,
      },
      {
        key: 'allowCanSelect',
        text: 'Choose selectable items',
        subMenuProps: {
          items: [
            {
              key: 'all',
              text: 'All items',
              canCheck: true,
              checked: canSelect === 'all',
              onClick: this._onCanSelectChanged as any,
              data: 'all',
            },
            {
              key: 'a',
              text: 'Names starting with vowels',
              canCheck: true,
              checked: canSelect === 'vowels',
              onClick: this._onCanSelectChanged as any,
              data: 'vowels',
            },
          ],
        },
      },
    ];
  };
}
