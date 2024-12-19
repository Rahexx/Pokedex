import type { Preview } from '@storybook/react';
import '../postcss.config.mjs';
import '../tailwind.config';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
