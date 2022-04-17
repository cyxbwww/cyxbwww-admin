import type { Ref } from 'vue'
import type { FormItemRule } from 'naive-ui'
import { REGEXP_PHONE, REGEXP_PWD, REGEXP_EMAIL } from '@/config'

// 表单规则
interface CustomFormRules {
  // 手机号码
  phone: FormItemRule[]
  // 密码
  password: FormItemRule[]
  // 邮箱
  email: FormItemRule[]
}

/** 表单规则 */
export const formRules: CustomFormRules = {
  phone: [
    { required: true, message: '请输入手机号码' },
    { pattern: REGEXP_PHONE, message: '手机号码格式错误', trigger: 'input' },
  ],
  password: [
    { required: true, message: '请输入密码' },
    {
      pattern: REGEXP_PWD,
      message: '密码为8-18位数字/字符/符号，至少2种组合',
      trigger: 'input',
    },
  ],
  email: [{ pattern: REGEXP_EMAIL, message: '邮箱格式错误', trigger: 'blur' }],
}
