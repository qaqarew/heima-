// dayjs 默认的语言是英语
import dayjs from 'dayjs'

const relativeTime = require('dayjs/plugin/relativeTime')
require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)

export default dayjs