import { FormItemRule } from 'naive-ui';
import { REGEXP_PHONE } from '@/config';

/** 表单规则 */
interface CustomFormRules {
  /** 手机号码 */
  phone: FormItemRule[];
  /** 用户名 */
  username: FormItemRule[];
  /** 密码 */
  password: FormItemRule[];
  /** 图片验证码 */
  imgVerificationCode: FormItemRule[];
  /** 短信验证码 */
  code: FormItemRule[];
}

/** 表单规则 */
export const formRules: CustomFormRules = {
  phone: [
    { required: true, message: '请输入手机号码' },
    { pattern: REGEXP_PHONE, message: '手机号码格式错误', trigger: 'blur' }
  ],
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  imgVerificationCode: [{ required: true, message: '请输入图片验证码', trigger: 'blur' }],
  code: [{ required: true, message: '请输入短信验证码', trigger: 'blur' }]
};
