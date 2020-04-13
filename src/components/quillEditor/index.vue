<template>
  <div class>
    <div v-loading="imageLoading" element-loading-text="请稍等，上传中">
      <quill-editor ref="newEditor" v-model="content" :options="editorOption" @change="onChange"></quill-editor>
      <!-- 文件上传input 将它隐藏-->
      <el-upload
        style="display:none"
        :action="imgUrl"
        :show-file-list="false"
        :with-credentials='true'
        :before-upload="newEditorbeforeupload"
        :on-success="newEditorSuccess"
        :on-error="uploadError"
        ref="uniqueId"
        id="uniqueId"
      ></el-upload>
      <!-- 视频上传 -->
      <el-upload
        style="display:none"
        :action="videoUrl"
        :show-file-list="false"
        :with-credentials='true'
        :before-upload="newEditorbeforeuploadVideo"
        :on-success="newEditorSuccessVideo"
        :on-error="uploadError"
        ref="upvideo"
        id="upvideo"
      ></el-upload>
    </div>
  </div>
</template>

<script>
import * as Quill from "quill";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
// 这里引入修改过的video模块并注册
import Video from "./video.js";
Quill.register(Video, true);

export default {
    //import引入的组件需要注入到对象中才能使用
    components: {
        quillEditor
    },
    props: {
        a_content: {
            type: String,
            default: ""
        }
    },
    data() {
        //这里存放数据
        return {
            content: "",
            editorOption: {
                placeholder: "",
                modules: {
                    toolbar: [
                        ["bold", "italic", "underline", "strike"],
                        ["blockquote", "code-block"],
                        [{ header: 1 }, { header: 2 }],
                        [{ list: "ordered" }, { list: "bullet" }],
                        [{ indent: "-1" }, { indent: "+1" }],
                        [{ size: ["small", false, "large", "huge"] }],
                        [{ header: [1, 2, 3, 4, 5, 6, false] }],
                        [{ color: [] }, { background: [] }],
                        [{ align: [] }],
                        ["clean"],
                        ["link", "image", "video"]
                    ]
                }
            },
            imageLoading: false,
            isImgtype: false,
            imgUrl: process.env.BASE_API + "/article/img/upload",
            videoUrl: process.env.BASE_API + "/article/video/upload"
        };
    },
    //方法集合
    methods: {
        onChange() {
            this.$emit("inputContent", this.content);
        },
        changeUrl() {
            let url = this.isImgtype ? this.imgUrl : this.videoUrl;
            return url;
        },
        newEditorbeforeupload(file) {
            const isJPG =
                file.type === "image/jpeg" || file.type === "image/png";
            const isLt2M = file.size / 1024 / 1024 < 10;
            if (!isJPG) {
                this.$message.error("上传图片只能是 JPG或PNG 格式!");
            }
            if (!isLt2M) {
                this.$message.error("上传图片大小不能超过 10MB!");
            }
            if (isJPG && isLt2M) this.imageLoading = true;
            return isJPG && isLt2M;
        },
        //上传图片回调
        newEditorSuccess(response) {
            let message = response.message ? response.message : "上传成功";
            this.$message({
                message,
                type: "success"
            });
            if (response.code == "200") {
                this.addImgRange = this.$refs.newEditor.quill.getSelection();
                let length = this.$refs.newEditor.quill.selection.savedRange
                    .index;
                let domType = "image";
                this.$refs.newEditor.quill.insertEmbed(
                    length,
                    domType,
                    response.data
                );
                this.$refs.newEditor.quill.setSelection(length + 1);
            }
            this.imageLoading = false;
        },

        //上传视频
        newEditorbeforeuploadVideo(file) {
            if (file && file.type && file.type.startsWith("video")) {
                this.imageLoading = true;
                return true;
            } else {
                this.$message.error("上传图片只能视频格式!");
                return false;
            }
        },
        newEditorSuccessVideo(response) {
            let message = response.message ? response.message : "上传成功";
            this.$message({
                message,
                type: "success"
            });
            // 获取光标所在位置
            let quill = this.$refs.newEditor.quill;
            let length = quill.getSelection().index;
            quill.insertEmbed(length, "video", response.data);
            quill.setSelection(length + 1);
            this.imageLoading = false;
        },
        uploadError() {
            this.$message("上传失败");
            this.imageLoading = false;
        }
    },
    //生命周期 - 创建完成（可以访问当前this实例）
    created() {},
    //生命周期 - 挂载完成（可以访问DOM元素）
    mounted() {
        this.content = this.a_content;
        var imgHandler = async function(state) {
            if (state) {
                var fileInput = document.querySelector("#uniqueId input"); //隐藏的file元素
                fileInput.click(); //触发事件
            }
        };
        var videoHandler = async function(state) {
            if (state) {
                var fileInput = document.querySelector("#upvideo input"); //隐藏的file元素
                fileInput.click(); //触发事件
            }
        };
        this.$refs.newEditor.quill
            .getModule("toolbar")
            .addHandler("image", imgHandler);

        this.$refs.newEditor.quill
            .getModule("toolbar")
            .addHandler("video", videoHandler);
    }
};
</script>
<style>
.proessBox {
    max-width: 400px;
}
.testFweb {
    width: 800px;
    margin: 50px auto;
}
.testFweb_box .custom-file-label::after {
    content: "选择视频文件";
    display: none;
}
.floatsmBox {
    padding: 20px;
    background-color: #fff;
    margin-top: 5%;
}
.floatBox {
    position: fixed;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.2);
    width: 100%;
    height: 100%;
    padding: 0 10%;
    z-index: 10;
}
</style>