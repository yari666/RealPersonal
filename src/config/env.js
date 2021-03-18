// 定义访问的根目录
let baseUrl = ''
// 每页最大显示记录数
const maxResultCount = 10
if (process.env.NODE_ENV === 'development') {
    baseUrl = 'https://www.xhssmz.com:9020'
} else {
    baseUrl = 'https://ceshi.xhssmz.com:9020/'
    // baseUrl = 'https://www.xhssmz.com:9020'

}

export { baseUrl, maxResultCount }
