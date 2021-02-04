// 定义访问的根目录
let baseUrl = ''
// 每页最大显示记录数
const maxResultCount = 10
if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://192.168.3.5:6688'
} else {
    baseUrl = 'http://192.168.3.5:6688'
}

export { baseUrl, maxResultCount }
