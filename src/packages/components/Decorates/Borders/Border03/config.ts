import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { Border03Config } from './index'
import cloneDeep from 'lodash/cloneDeep'
import { defaultBorderText } from '@/settings/designSetting'
export const option = {
  colors: ['#6586ec', '#2cf7fe'],
  backgroundColor: '#000',

  ...defaultBorderText
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = Border03Config.key
  public chartConfig = cloneDeep(Border03Config)
  public option = cloneDeep(option)
  public type = 'Html'
}
