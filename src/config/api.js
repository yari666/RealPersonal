import { get, post, put, del } from "./fetch.js";


// 登录 获取用户信息
export function Login(params) {
    return post("authenticate/authrization", params);
}

// 验证码
export function Vcode(params) {
    return get('verificationCode/code', params,)
}

// 修改用户密码
export function UserPwd(params) {
    return put("user/userPwd", params)
}

// 获取菜单
export function Menu(params) {
    return get(`menu/menuList`, params)
}

// 获取区域信息
export function AreaList(params) {
    return get('sysDictionary/areaList', params)
}

// 导出数据
export function GetFile(params) {
    return get('attachment/attachmentByFileName', params)
}

// 附件上传
export function UploadFile(params) {
    return post('attachment/uploadAttachment', params)
}

// 附件 下载
export function DownloadFile(params) {
    return get('attachment/attachmentById', params)
}

// 附件删除
export function DelFile(params) {
    return del('attachment/deleteAttachment', params)
}

/****
 * 业主方
 */

// 项目管理 获取项目列表
export function ProjectList(params) {
    return get('project', params)
}

// 项目管理 新增项目
export function AddProject(params) {
    return post('project', params)
}

// 项目管理 修改项目
export function EditProject(params) {
    return put('project', params)
}

// 项目管理 删除项目
export function DelProject(params) {
    return del('project', params)
}

// 污水站管理 获取列表
export function SewageStation(params) {
    return get('sewageStation', params)
}

// 污水站管理 新增
export function AddSewageStation(params) {
    return post('sewageStation', params)
}

// 污水站管理 修改
export function EditSewageStation(params) {
    return put('sewageStation', params)
}

// 污水站管理 删除
export function DelSewageStation(params) {
    return del('sewageStation', params)
}

// 污水站详情
export function SewageDetail(params) {
    return get('sewageStation/sewageStationDetails', params)
}

// 根据userId获取对应污水站列表   下拉使用
export function SewageStationByUserId(params) {
    return get('sewageStation/sewageStationByUserId', params)
}

// 根据userId获取对应污水站列表   信息较全
export function SewageStationSelect(params) {
    return get('sewageStation/sewageStationSelect', params)
}

//  根据当前账户id获取对应的项目
export function ProjectByUserId(params) {
    return get('project/projectByUserId', params)
}

// 设备管理 获取列表
export function DeviceList(params) {
    return get('device', params)
}

// 设备管理 新增设备
export function AddDevice(params) {
    return post('device', params)
}

// 设备管理 编辑设备
export function EditDevice(params) {
    return put('device', params)
}

// 设备管理 删除设备
export function DelDevice(params) {
    return del('device', params)
}

// 获取设备工艺列表
export function DeviceDesign(params) {
    return get('device/designProcess', params)
}

// 运维管理 第三方运维列表
export function ThirdOperationList(params) {
    return get('ownerThirdOperation', params)
}

// 运维管理 第三方运维 新增运维
export function AddThirdOperation(params) {
    return post('ownerThirdOperation', params)
}

// 运维管理 第三方运维 删除运维
export function DelThirdOperation(params) {
    return del('ownerThirdOperation', params)
}

// 运维管理  获取需要选择的运维企业信息
export function ThirdOperationCompany(params) {
    return get('ownerThirdOperation/thirdOperationCompany', params)
}

// 运维管理  展示已经关联的运维污水站信息
export function RelativeOperationSewage(params) {
    return get('ownerThirdOperation/relativeOperationSewageStation', params)
}

// 新增 运维污水站
export function AddThirdOperationSewage(params) {
    return post('ownerThirdOperation/operationSewageStation', params)
}

// 删除 运维污水站
export function DelThirdOperationSewage(params) {
    return del('ownerThirdOperation/operationSewageStation', params)
}

/****
 * 运维方
 */

// 运维方 业主列表
export function MyOwnerLists(params) {
    return get('myOwner/myOwnerLists', params)
}

// 运维方 通知列表
export function NoticeLists(params) {
    return get('notice', params)
}

// 通知 新增
export function AddNotice(params) {
    return post('notice', params)
}

// 通知 获取一条通知信息
export function GetNoticeInfo(params) {
    return get('notice/' + params.id, {})
}

// 运维方 获取运维污水站列表
export function OperationSewageStationLists(params) {
    return get('myOwner/operationSewageStationLists', params)
}

// 获取运维设备列表
export function OperationDeviceLists(params) {
    return get('myOwner/operationDeviceLists', params)
}

// 通过企业id获取业主详细信息
export function OwnerDetailByComapnyId(params) {
    return get('myOwner/ownerDetailByComapnyId', params)
}

// 
export function ProjectDetails(params) {
    return get('project/projectDetails', params)
}

/****
 * 监管方
 */

// 获取监管污水站列表
export function SewageStationForGovList(params) {
    return get('sewageStation/sewageStationForGovList', params)
}

// 获取监管业主列表
export function JgOwnerLists(params) {
    return get('myOwner/ownerLists', params)
}