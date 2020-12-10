// 定义访问的根目录
let baseUrl = ''
// 每页最大显示记录数
const maxResultCount = 10

if (process.env.NODE_ENV === 'development') {
    baseUrl = 'http://water.admin.xhs-sz.com:9015/api/app/'
    // baseUrl = 'http://192.168.3.2:44391/api/app/'
} else {
    // baseUrl = 'http://192.168.3.2:44391/api/app/'
    baseUrl = 'http://water.admin.xhs-sz.com:9015/api/app/'
}

export { baseUrl, maxResultCount }
