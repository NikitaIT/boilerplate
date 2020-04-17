import { IExtendedSemanticColors } from '../IExtendedSemanticColors';
import {
  FontSizes,
  ICheckboxStyleProps,
  ICheckboxStyles,
} from '@fluentui/react';

export const CheckboxStyles = (
  props: ICheckboxStyleProps,
): Partial<ICheckboxStyles> => {
  const { disabled, checked, theme } = props;
  const { semanticColors } = theme;
  const extendedSemanticColors = semanticColors as IExtendedSemanticColors;

  return {
    text: [
      {
        fontSize: FontSizes.small,
        color: semanticColors.bodyText,
      },
      disabled && {
        color: semanticColors.disabledBodyText,
      },
    ],
    checkbox: [
      {
        backgroundColor: semanticColors.bodyBackground,
      },
      checked && {
        borderColor: extendedSemanticColors.controlOutline,
      },
      disabled && {
        borderColor: extendedSemanticColors.controlOutlineDisabled,
      },
    ],
    checkmark: [
      {
        color: semanticColors.focusBorder,
      },
      disabled && {
        color: extendedSemanticColors.controlOutlineDisabled,
      },
    ],
    root: [
      !disabled && [
        !checked && {
          selectors: {
            ':hover .ms-Checkbox-label .ms-Checkbox-checkbox': {
              borderColor: extendedSemanticColors.controlOutlineHovered,
            },
            ':hover .ms-Checkbox-label .ms-Checkbox-checkmark': {
              color: semanticColors.bodyBackground,
            },
          },
        },
        checked && {
          selectors: {
            '.ms-Checkbox-label .ms-Checkbox-checkbox': {
              background: semanticColors.bodyBackground,
            },
            ':hover .ms-Checkbox-label .ms-Checkbox-checkbox': {
              borderColor: extendedSemanticColors.controlOutlineHovered,
            },
            ':focus .ms-Checkbox-label .ms-Checkbox-checkbox': {
              borderColor: extendedSemanticColors.focusBorder,
            },
          },
        },
      ],
    ],
  };
};
