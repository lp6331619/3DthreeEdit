import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { Border13Config } from './index'
import cloneDeep from 'lodash/cloneDeep'
import { defaultBorderText } from '@/settings/designSetting'
export const option = {
  colors: ['#2862b7', '#4b77b7'],
  backgroundColor: '#000',
  ...defaultBorderText
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = Border13Config.key
  public chartConfig = cloneDeep(Border13Config)
  public option = cloneDeep(option)
  public type = 'Html'
}
