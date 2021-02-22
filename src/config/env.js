// 定义访问的根目录
let baseUrl = ''
// 每页最大显示记录数
const maxResultCount = 10
if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://121.36.223.127:9021/'
} else {
    baseUrl = 'http://192.168.3.11:6688/'
    // baseUrl = 'http://121.36.223.127:9021/'

}

export { baseUrl, maxResultCount }
