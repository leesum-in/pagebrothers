import {
  LeftAddOnHttpButton,
  LeftAddOnSearchIcon,
} from '@repo/shared/src/components/textInput/textInputLeftAddOn';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Elements/LeftAddOn',
} as Meta;

// 새로운 옵션은 아래에 이어서 추가해주세요.
export const SearchIconAddOn: StoryFn = () => <LeftAddOnSearchIcon />;
export const HttpButtonAddOn: StoryFn = () => <LeftAddOnHttpButton />;
