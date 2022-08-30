import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers';

export default () => {
  return [
    AutoImport({
      dts: './src/typings/auto-imports.d.ts',
      imports: ['vue', 'vue-router', 'pinia'],
      eslintrc: {
        enabled: true,
        filepath: './.eslintrc-auto-import.json',
        globalsPropValue: true
      },
      resolvers: [NaiveUiResolver()]
    }),
    Components({
      dts: './src/typings/components.d.ts',
      dirs: ['src/components'],
      types: [{ from: 'vue-router', names: ['RouterLink', 'RouterView'] }],
      resolvers: [NaiveUiResolver()]
    })
  ];
};
