import { AzureCustomizationsDark } from '@mylib/newdep';
import React from 'react';
import { VTButton } from './Button';
import {
  Customizer,
  Fabric,
  SearchBox,
  Stack,
  initializeIcons,
} from '@fluentui/react';
import { SelectionBasicExample } from './SearchResult';
import { TagPickerBasicExample } from './TagBox';

export default {
  title: 'ButtonStory',
};
initializeIcons();

export const ButtonStory = () => (
  <>
    <Customizer {...AzureCustomizationsDark}>
      <Fabric>
        <div>
          <Stack tokens={{ childrenGap: 20 }}>
            <TagPickerBasicExample
              selectedItems={[{ name: 'blue', key: 'blue' }]}
            />
            <SearchBox
              placeholder="Search with no animation"
              onSearch={(newValue: any) => console.log('value is ' + newValue)}
              onFocus={() => console.log('onFocus called')}
              onBlur={() => console.log('onBlur called')}
              onChange={() => console.log('onChange called')}
            />
            <SelectionBasicExample />
            <VTButton>sadasd</VTButton>
          </Stack>
        </div>
      </Fabric>
    </Customizer>
    <Stack tokens={{ childrenGap: 20 }}>
      <SearchBox
        placeholder="Search with no animation"
        onSearch={(newValue: any) => console.log('value is ' + newValue)}
        onFocus={() => console.log('onFocus called')}
        onBlur={() => console.log('onBlur called')}
        onChange={() => console.log('onChange called')}
      />
      <SelectionBasicExample />
      <VTButton>sadasd</VTButton>
    </Stack>
  </>
);
