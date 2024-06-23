import {env} from 'process'
export default () =>({
    mail: {
        host: 'smtp.qq.com',
        port: 465,
        secure: true,
        auth: {
        user: env.MAIL_USER,
        pass: env.MAIL_PASS
      }
    },
    mailCaptchaExpire: {
      expire: 60 * 30
    }
})
