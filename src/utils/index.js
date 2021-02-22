import { get } from "~/config/fetch.js";

// 导出
export function exportData(url, keyword, fileName, employeeType = null) {
    let param = {
        KeyWord: keyword,
        responseType: "blob",
    };

    if (employeeType != null) {
        param.EmployeeType = employeeType
    }

    get(url, param).then((res) => {
        var content = res.data;
        var blob = new Blob([content]);
        fileName = fileName + ".xlsx"; //要保存的文件名称
        if ("download" in document.createElement("a")) {
            // 非IE下载
            var elink = document.createElement("a");
            elink.download = fileName;
            elink.style.display = "none";
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
        } else {
            // IE10+下载
            navigator.msSaveBlob(blob, fileName);
        }
    });
}