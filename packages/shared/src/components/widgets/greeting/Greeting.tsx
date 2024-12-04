'use client';

import type { GreetingWidgetConfig } from '../../../types/pageBrothers.type';

interface GreetingProps {
  config: GreetingWidgetConfig;
}

function Greeting({ config }: GreetingProps) {
  return <div>Greeting</div>;
}

export default Greeting;
