// 添加字典
export function createDictionary(handler, params) {
  return handler.post("sysDictionary", params);
}

// 得到指定的字典信息
export function getDictionary(handler, id) {
  return handler.get("sysDictionary/" + id);
}

// 得到所有字典信息
export function getPagedDictionarys(handler, param) {
  return handler.get("sysDictionary", { params: param });
}

// 修改字典信息
export function updateDictionary(handler, params) {
  return handler.put("sysDictionary/" + params.id, params);
}

// 删除字典信息
export function deleteDictionary(handler, id) {
  return handler.delete("sysDictionary/" + id);
}

// 得到字典下拉信息
export function getDictionaryDropdown(handler) {
  return handler.get("sysDictionary/parentDictionary");
}

// 得到区域数据
export function getAreaList(handler) {
  return handler.get("sysDictionary/areaList");
}
