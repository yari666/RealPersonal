// 添加平台账号
export function createUser(handler, params) {
  return handler.post("user", params);
}

// 得到指定的平台账号信息
export function getUser(handler, id) {
  return handler.get("user/" + id);
}

// 得到平台账号信息
export function getPagedUsers(handler, param) {
  return handler.get("user", { params: param });
}

// 修改平台账号信息
export function updateUser(handler, params) {
  return handler.put("user/" + params.id, params);
}

// 删除账号信息
export function deleteUser(handler, id) {
  return handler.delete("user/" + id);
}

// 得到监管级别数据
export function getRegulatoryLevel(handler) {
  return handler.get("user/regulatoryLevel");
}

// 得到业主类型数据
export function getOwnerType(handler) {
  return handler.get("user/ownerType");
}
// ----------------------------------------------

// 得到业主账号信息
export function getPagedOwnerUsers(handler, param) {
  return handler.get("ownerUser/", { params: param });
}

// 得到指定的业主账号信息
export function getOwnerUser(handler, id) {
  return handler.get("ownerUser/" + id);
}

// 添加业主账号
export function createOwnerUser(handler, params) {
  return handler.post("ownerUser/", params);
}

// 修改业主账号信息
export function updateOwnerUser(handler, params) {
  return handler.put("ownerUser/" + params.id, params);
}

// 删除业主账号信息
export function deleteOwnerUser(handler, id) {
  return handler.delete("ownerUser/" + id);
}

// ----------------------------------------------

// 得到运维账号信息
export function getPagedOperationUsers(handler, param) {
  return handler.get("operationUser/", { params: param });
}

// 得到指定的运维账号信息
export function getOperationUser(handler, id) {
  return handler.get("operationUser/" + id);
}

// 添加运维账号
export function createOperationUser(handler, params) {
  return handler.post("operationUser/", params);
}

// 修改运维账号信息
export function updateOperationUser(handler, params) {
  return handler.put("operationUser/" + params.id, params);
}

// 删除运维账号信息
export function deleteOperationUser(handler, id) {
  return handler.delete("operationUser/" + id);
}

// ----------------------------------------------

// 得到监管账号信息
export function getPagedGovUsers(handler, param) {
  return handler.get("govUser/", { params: param });
}

// 得到指定的监管账号信息
export function getGovUser(handler, id) {
  return handler.get("govUser/" + id);
}

// 添加监管账号
export function createGovUser(handler, params) {
  return handler.post("govUser/", params);
}

// 修改监管账号信息
export function updateGovUser(handler, params) {
  return handler.put("govUser/" + params.id, params);
}

// 删除监管账号信息
export function deleteGovUser(handler, id) {
  return handler.delete("govUser/" + id );
}
