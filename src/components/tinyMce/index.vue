<template>
  <div v-loading="isLoading">
    <input type="file" id="photoFileUpload" style="display: none" />
    <textarea :id="Id"></textarea>
  </div>
</template>
<script>
import "../../../static/tinymce/tinymce";
import axios from "axios";
export default {
    name: "mceeditor",
    props: {
        value: {
            default: "",
            type: String
        },
        config: {
            type: Object,
            default: () => {
                return {
                    theme: "modern",
                    height: 600
                };
            }
        },
        url: {
            default: "",
            type: String
        },
        accept: {
            default: "image/jpeg, image/png",
            type: String
        },
        maxSize: {
            default: 8097152,
            type: Number
        }
    },
    data() {
        const Id = Date.now();
        return {
            Id: Id,
            myEditor: null,
            isLoading:false,
            DefaultConfig: {
                // GLOBAL
                language: "zh_CN", //汉化
                height: 500, //默认高度
                theme: "modern", //默认主题
                menubar: true,
                plugins:
                    "lists image media table wordcount code fullscreen help  toc fullpage autosave nonbreaking insertdatetime visualchars visualblocks searchreplace spellchecker pagebreak link charmap paste print preview hr anchor",
                toolbar: [
                    "styleselect | formatselect visualaid| fontselect | fontsizeselect | cut copy paste selectall| bold italic underline strikethrough |codeformat blockformats| superscript subscript  | forecolor backcolor | alignleft aligncenter alignright alignjustify ",
                    "outdent indent |  removeformat | lists image media table link |fullscreen help toc fullpage restoredraft nonbreaking insertdatetime visualchars visualblocks searchreplace spellchecker pagebreak anchor charmap  pastetext print preview hr",
                    `undo redo | fullscreen `
                ],
                // toolbar: `styleselect | fontselect | formatselect | fontsizeselect | forecolor backcolor | bold italic underline strikethrough | insertfile link image | table | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | preview removeformat  hr | paste code | undo redo | fullscreen `, //需要的工具栏
                // plugins: `
                //         paste
                //         importcss
                //         image
                //         code
                //         table
                //         advlist
                //         fullscreen
                //         link
                //         lists
                //         textcolor
                //         colorpicker
                //         hr
                //         preview
                //     `,
                // CONFIG
                forced_root_block: "p",
                force_p_newlines: true,
                importcss_append: true,
                // CONFIG: ContentStyle 这块很重要， 在最后呈现的页面也要写入这个基本样式保证前后一致， `table`和`img`的问题基本就靠这个来填坑了
                content_style: `
                        *                         { padding:0; margin:0; }
                        html, body                { height:100%; }
                        img                       { max-width:100%; display:block;height:auto; }
                        a                         { text-decoration: none; }
                        iframe                    { width: 100%; }
                        p                         { line-height:1.6; margin: 0px; }
                        table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
                        .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
                        ul,ol                     { list-style-position:inside; }
                    `,
                insert_button_items: "image link | inserttable",
                // CONFIG: Paste
                paste_retain_style_properties: "all",
                paste_word_valid_elements: "*[*]", // word需要它
                paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
                paste_convert_word_fake_lists: false, // 插入word文档需要该属性
                paste_webkit_styles: "all",
                paste_merge_formats: true,
                nonbreaking_force_tab: false,
                paste_auto_cleanup_on_paste: false,
                // CONFIG: Font
                fontsize_formats: "10px 11px 12px 14px 16px 18px 20px 24px",
                // CONFIG: StyleSelect
                style_formats: [
                    {
                        title: "首行缩进",
                        block: "p",
                        styles: { "text-indent": "2em" }
                    },
                    {
                        title: "行高",
                        items: [
                            {
                                title: "1",
                                styles: { "line-height": "1" },
                                inline: "span"
                            },
                            {
                                title: "1.5",
                                styles: { "line-height": "1.5" },
                                inline: "span"
                            },
                            {
                                title: "2",
                                styles: { "line-height": "2" },
                                inline: "span"
                            },
                            {
                                title: "2.5",
                                styles: { "line-height": "2.5" },
                                inline: "span"
                            },
                            {
                                title: "3",
                                styles: { "line-height": "3" },
                                inline: "span"
                            }
                        ]
                    }
                ],
                // FontSelect
                font_formats: `
                        微软雅黑=微软雅黑;
                        宋体=宋体;
                        黑体=黑体;
                        仿宋=仿宋;
                        楷体=楷体;
                        隶书=隶书;
                        幼圆=幼圆;
                        Andale Mono=andale mono,times;
                        Arial=arial, helvetica,
                        sans-serif;
                        Arial Black=arial black, avant garde;
                        Book Antiqua=book antiqua,palatino;
                        Comic Sans MS=comic sans ms,sans-serif;
                        Courier New=courier new,courier;
                        Georgia=georgia,palatino;
                        Helvetica=helvetica;
                        Impact=impact,chicago;
                        Symbol=symbol;
                        Tahoma=tahoma,arial,helvetica,sans-serif;
                        Terminal=terminal,monaco;
                        Times New Roman=times new roman,times;
                        Trebuchet MS=trebuchet ms,geneva;
                        Verdana=verdana,geneva;
                        Webdings=webdings;
                        Wingdings=wingdings,zapf dingbats`,
                // Tab
                tabfocus_elements: ":prev,:next",
                object_resizing: true,
                // Image
                imagetools_toolbar:
                    "rotateleft rotateright | flipv fliph | editimage imageoptions"
            }
        };
    },
    methods: {
        setContent(content) {
            this.myEditor.setContent(content);
        },
        getContent() {
            return this.myEditor.getContent();
        },
        init() {
            const self = this;
            window.tinymce.init({
                // 默认配置
                ...this.DefaultConfig,
                // 挂载的DOM对象
                selector: `#${this.Id}`,
                file_picker_types: "media",
                media_live_embeds: true,
                //上传视频
                file_picker_callback: function(cb, value, meta) {
                    self.isLoading = true;
                    //当点击meidia图标上传时,判断meta.filetype == 'media'有必要，因为file_picker_callback是media(媒体)、image(图片)、file(文件)的共同入口
                    if (meta.filetype == "media") {
                        //创建一个隐藏的type=file的文件选择input
                        let input = document.createElement("input");
                        input.setAttribute("type", "file");
                        input.setAttribute("accept", "video/*");
                        //onclick仅用来测试进度栏,属于多余内容，正常使用情况下删除掉它
                        input.onclick = function() {};
                        input.onchange = function() {
                            let file = this.files[0];
                            let formData = new FormData();
                            formData.append("file", file);
                            const instance = axios.create({
                                withCredentials: true
                            });
                            let url =
                                process.env.BASE_API + "/article/video/upload";
                            instance
                                .post(url, formData)
                                .then(res => {
                                    self.isLoading = false;
                                    if (res.status == 200) {
                                        if (res.data.code == 200) {
                                            //接口返回的文件保存地址
                                            let mediaLocation = res.data.data;
                                            //cb()回调函数，将mediaLocation显示在弹框输入框中
                                            cb(mediaLocation, {
                                                title: file.name
                                            });
                                        } else {
                                            let message = res.data.message
                                                ? res.data.message
                                                : "上传失败";
                                            self.$message.error(message);
                                        }
                                    } else {
                                        self.$message.error("上传失败");
                                    }
                                })
                                .catch(() => {
                                    self.isLoading = false;
                                    self.$message.error("上传失败");
                                });
                        };
                        //触发点击
                        input.click();
                    }
                },
                // 图片上传
                images_upload_handler: function(blobInfo, success, failure) {
                    if (blobInfo.blob().size > self.maxSize) {
                        failure("文件体积过大");
                    }
                    if (self.accept.indexOf(blobInfo.blob().type) >= 0) {
                        uploadPic();
                    } else {
                        failure("");
                    }
                    function uploadPic() {
                        self.isLoading = true;
                        let formData = new FormData();
                        formData.append("file", blobInfo.blob());
                        const instance = axios.create({
                            withCredentials: true
                        });
                        let url = process.env.BASE_API + "/article/img/upload";
                        instance
                            .post(url, formData)
                            .then(res => {
                                self.isLoading = false;
                                let message = res.data.message
                                    ? res.data.message
                                    : "上传失败";
                                if (!res.data.data) {
                                    self.$message.error(message);
                                    return;
                                }
                                success(res.data.data);
                            })
                            .catch(() => {
                                self.isLoading = false;
                                failure("上传失败");
                            });
                    }
                },
                // prop内传入的的config
                ...this.config,
                setup: editor => {
                    self.myEditor = editor;
                    editor.on("init", () => {
                        self.loading = true;
                        self.$emit("on-ready"); // 抛出 'on-ready' 事件钩子
                        editor.setContent(self.value);
                        self.loading = false;
                    });
                    // 抛出 'input' 事件钩子，同步value数据
                    editor.on("input change undo redo", () => {
                        self.$emit("input", editor.getContent());
                    });
                }
            });
        }
    },
    mounted() {
        this.init();
    },
    beforeDestroy() {
        // 销毁tinymce
        this.$emit("on-destroy");
        window.tinymce.remove(`#${this.Id}`);
    }
};
</script>
<style lang="stylus">
.mce-object-video {
    display: none;
}
</style>

