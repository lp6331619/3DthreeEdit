import { PublicConfigClass } from '@/packages/public'
import { CreateComponentType } from '@/packages/index.d'
import { Border09Config } from './index'
import cloneDeep from 'lodash/cloneDeep'
import { defaultBorderText } from '@/settings/designSetting'
export const option = {
  colors: ['#3140ad', '#235fa7'],
  backgroundColor: '#000',
  ...defaultBorderText
}

export default class Config extends PublicConfigClass implements CreateComponentType {
  public key = Border09Config.key
  public chartConfig = cloneDeep(Border09Config)
  public option = cloneDeep(option)
  public type = 'Html'
}
