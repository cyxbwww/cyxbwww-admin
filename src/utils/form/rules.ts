import { FormItemRule } from 'naive-ui';
import { REGEXP_PHONE, REGEXP_EMAIL } from '@/config';

/** 创建自定义错误信息的必填表单规则 */
export const createRequiredFormRule = ({ message = '不能为空', type = null }): FormItemRule => ({
  required: true,
  trigger: type ? ['change'] : ['blur', 'input'],
  message,
  type
});

/** 表单规则 */
interface CustomFormRules {
  /** 手机号码 */
  phone: FormItemRule[];
  /** 用户名 */
  userName: FormItemRule[];
  /** 密码 */
  password: FormItemRule[];
  /** 图片验证码 */
  imgVerificationCode: FormItemRule[];
  /** 短信验证码 */
  code: FormItemRule[];
  /** 邮箱 */
  email: FormItemRule[];
}

/** 表单规则 */
export const formRules: CustomFormRules = {
  phone: [
    createRequiredFormRule({ message: '请输入手机号码' }),
    { pattern: REGEXP_PHONE, message: '手机号码格式错误', trigger: ['blur', 'input'] }
  ],
  userName: [createRequiredFormRule({ message: '请输入用户名' })],
  password: [createRequiredFormRule({ message: '请输入密码' })],
  imgVerificationCode: [createRequiredFormRule({ message: '请输入图片验证码' })],
  code: [createRequiredFormRule({ message: '请输入短信验证码' })],
  email: [
    createRequiredFormRule({ message: '请输入邮箱' }),
    { pattern: REGEXP_EMAIL, message: '邮箱格式错误', trigger: ['blur', 'input'] }
  ]
};
