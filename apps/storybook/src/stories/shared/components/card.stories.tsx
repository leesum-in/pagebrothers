import React from 'react';
import { Card } from '../../../../../../packages/shared/src/components';

export default {
  title: 'Shared/Components/Card',
  component: Card,
};

export const Default = () => (
  <Card title="Example Title" href="https://example.com">
    Example Children Content
  </Card>
);
