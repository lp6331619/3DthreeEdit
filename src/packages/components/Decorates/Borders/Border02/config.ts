import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { Border02Config } from './index'
import cloneDeep from 'lodash/cloneDeep'
import { defaultBorderText } from '@/settings/designSetting'
export const option = {
  colors: ['#6586ec', '#2cf7fe'],
  backgroundColor: '#000',
  ...defaultBorderText
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = Border02Config.key
  public chartConfig = cloneDeep(Border02Config)
  public option = cloneDeep(option)
  public type = 'Html'
}
