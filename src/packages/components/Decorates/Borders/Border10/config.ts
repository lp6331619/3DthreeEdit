import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { Border10Config } from './index'
import cloneDeep from 'lodash/cloneDeep'
import { defaultBorderText } from '@/settings/designSetting'
export const option = {
  colors: ['#1089ff', '#0000ff'],
  backgroundColor: '#000',
  ...defaultBorderText
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = Border10Config.key
  public chartConfig = cloneDeep(Border10Config)
  public option = cloneDeep(option)
  public type = 'Html'
}
