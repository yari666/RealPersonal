<template>
    <div class="main">
        <div ref="editorElem" id="editorElem" style="text-align: left"></div>
    </div>
</template>

<script>
import E from "wangeditor";

export default {
    name: "editor",
    data() {
        return {
            editorContent: "",
        };
    },
    props: ["content"],
    mounted() {
        var editor = new E("#editorElem");
        let projectId = "5bbac651-1e3a-d2de-05cf-39f87ba8f2dc";

        //图片上传地址
        editor.config.uploadImgServer = `http://water.admin.xhs-sz.com:9015/api/app/`;
        // `http://water.admin.xhs-sz.com:9015/api/app/attachment/uploadAttachment?guid=${projectId}&fileType=0&category=1&categoryName='通知'`;
        // "http://water.admin.xhs-sz.com:9015/api/app/";

        editor.config.onchange = (html) => {
            this.editorContent = html;
        };

        editor.config.onblur = (newHtml) => {
            this.editorContent = newHtml;
            this.$emit("submitForm", { editorContent: this.editorContent });
        };

        editor.config.onfocus = (newHtml) => {
            this.$emit("editorFocus");
        };

        editor.create();
    },
};
</script>