import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { Border05Config } from './index'
import cloneDeep from 'lodash/cloneDeep'
import { defaultBorderText } from '@/settings/designSetting'
export const option = {
  colors: ['#1d48c4', '#d3e1f8'],
  backgroundColor: '#000',
  ...defaultBorderText
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = Border05Config.key
  public chartConfig = cloneDeep(Border05Config)
  public option = cloneDeep(option)
  public type = 'Html'
}
