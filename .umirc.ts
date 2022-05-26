/*
 * @Date: 2022-05-24 21:37:47
 * @LastEditors: yunze yunze.wydl@raycloud.com
 * @LastEditTime: 2022-05-26 20:10:19
 * @Description: Do not edit
 * @FilePath: /l-lib/.umirc.ts
 */
import { defineConfig } from 'dumi';
import navs from './routes/navs';
export default defineConfig({
  title: 'l-lib',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  // more config: https://d.umijs.org/config
  // 配置
  navs: navs,
});
