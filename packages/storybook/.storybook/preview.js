import { addParameters, addDecorator } from '@storybook/react';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { withA11y } from '@storybook/addon-a11y';

/**
 * создает кнопку viewport в меню над канвасом
 */
addParameters({
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
});
/**
 * проверка на доступность https://github.com/storybookjs/storybook/tree/master/addons/a11y
 */
addDecorator(withA11y);

/**
 * проверь на наличие поддержки mdx https://youtrack.jetbrains.com/issue/WEB-32599
 */
