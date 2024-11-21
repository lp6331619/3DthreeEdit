/*
 * @Author: sorry 247076126@qq.com
 * @Date: 2024-10-12 14:14:10
 * @LastEditors: sorry 247076126@qq.com
 * @LastEditTime: 2024-11-21 14:29:28
 * @FilePath: \3DThreeEdit\src\packages\components\Icons\Common\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { IconConfig } from '../Default/Icon/index'
import { PackagesCategoryEnum } from '@/packages/index.d'
import { ChatCategoryEnum, ChatCategoryEnumName } from '../index.d'

const iconNames = [
  'uim:adobe',
  'uim:airplay',
  'uim:align',
  'uim:angle-double-down',
  'uim:angle-double-left',
  'uim:angle-double-right',
  'uim:angle-double-up',
  'uim:angle-down',
  'uim:angle-left',
  'uim:angle-right',
  'uim:angle-up',
  'uim:android-alt',
  'uim:apple',
  'uim:apps',
  'uim:bag',
  'uim:battery-bolt',
  'uim:bing',
  'uim:box',
  'uim:briefcase',
  'uim:calender',
  'uim:chart',
  'uim:chart-pie',
  'uim:circle-layer',
  'uim:clinic-medical',
  'uim:clock',
  'uim:comment-alt',
  'uim:comment-alt-dots',
  'uim:docker',
  'uim:download-alt',
  'uim:dribbble',
  'uim:dropbox',
  'uim:entry',
  'uim:exclamation-circle',
  'uim:exclamation-triangle',
  'uim:exit',
  'uim:facebook',
  'uim:facebook-messenger',
  'uim:facebook-messenger-alt',
  'uim:google-drive',
  'uim:google-play',
  'uim:graph-bar',
  'uim:head-side-mask',
  'uim:horizontal-align-left',
  'uim:hospital',
  'uim:house-user',
  'uim:image-v',
  'uim:key-skeleton',
  'uim:layer-group',
  'uim:layers-alt',
  'uim:link-h',
  'uim:microscope',
  'uim:microsoft',
  'uim:object-group',
  'uim:object-ungroup',
  'uim:paypal',
  'uim:refresh',
  'uim:repeat',
  'uim:right-indent-alt',
  'uim:rocket',
  'uim:shield-plus',
  'uim:social-distancing',
  'uim:telegram-alt',
  'uim:user-md',
  'uim:toilet-paper',
  'uim:youtube'
]
const iconList = iconNames.map(name => ({
  ...IconConfig,
  category: ChatCategoryEnum.COMMON,
  categoryName: ChatCategoryEnumName.COMMON,
  package: PackagesCategoryEnum.ICONS,
  image: name,
  icon: name,
  dataset: name,
  title: name.replace('uim:', ''),
  redirectComponent: `${IconConfig.package}/${IconConfig.category}/${IconConfig.key}` // 跳转组件路径规则：packageName/categoryName/componentKey
}))

export default iconList
