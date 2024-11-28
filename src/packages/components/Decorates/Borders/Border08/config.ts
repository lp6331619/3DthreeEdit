import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { Border08Config } from './index'
import cloneDeep from 'lodash/cloneDeep'
import { defaultBorderText } from '@/settings/designSetting'
export const option = {
  colors: ['#235fa7', '#4fd2dd'],
  dur: 3,
  reverse: false,
  backgroundColor: '#000',
  ...defaultBorderText
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = Border08Config.key
  public chartConfig = cloneDeep(Border08Config)
  public option = cloneDeep(option)
  public type = 'Html'
}
