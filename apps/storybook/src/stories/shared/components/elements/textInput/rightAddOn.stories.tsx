import {
  RightAddOnArrowIcon,
  RightAddOnButton,
  RightAddOnCalendarIcon,
} from '@shared/components/elements/textInputRightAddOn';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Elements/RightAddOn',
} as Meta;

// 새로운 옵션은 아래에 이어서 추가해주세요.
export const ButtonAddOn: StoryFn = () => <RightAddOnButton />;
export const ArrowIconAddOn: StoryFn = () => <RightAddOnArrowIcon />;
export const CalendarIconAddOn: StoryFn = () => <RightAddOnCalendarIcon />;
