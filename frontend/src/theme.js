import { extendTheme } from '@chakra-ui/react';
import '@fontsource/graduate';

export const theme = extendTheme({
  fonts: {
    heading: `'Graduate', serif`,
    body: `'Graduate', serif`,
  },
  colors: {
    brand: {
      chocolate_cosmos: '#47001Bff',
      rich_black: '#00051Dff',
      magenta_dye: '#BE0567ff',
      vista_blue: '#8AA9FCff',
    },
  },
});
