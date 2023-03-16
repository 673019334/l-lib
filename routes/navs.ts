/*
 * @Date: 2022-05-24 22:21:12
 * @LastEditors: LSY
 * @LastEditTime: 2023-03-16 23:38:24
 * @Description: Do not edit
 * @FilePath: /l-lib/routes/navs.ts
 */
const navs = [
  // null, // null 值代表保留约定式生成的导航，只做增量配置
  // {
  //   title: 'github',
  //   path: 'https://github.com/umijs/dumi',
  // },
  {
    title: '其它',
    // path: '链接是可选的',
    // 可通过如下形式嵌套二级导航菜单，目前暂不支持更多层级嵌套：
    children: [
      { title: '浏览器', path: '/浏览器' },
      // { title: '第二项', path: '/guide' },
    ],
  },
];
export default navs;
