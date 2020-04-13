<template class="positon">
	<div class="login">
        <h2 class="title">Hcp360 后台管理系统</h2>
		<el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="用户名">
                <el-input v-model="form.email" size="small" style="width:250px" @keyup.native="keyup"></el-input>
			</el-form-item>
			<el-form-item label="密码">
				<el-input v-model="form.password" type="password" size="small" style="width:250px" @keyup.native="keyup"></el-input>
			</el-form-item>
			<el-form-item class="el-flex" label="验证码">
				<template class="fl-j-center">
					<el-input v-model="form.code" size="small" style="width:150px;margin-right:20px" @keyup.native="keyup"></el-input>
                    <a
                        href="javascript:void(0);"
                        title="点击更换验证码"
                        class="codeImg" 
                        @click="getVerify"
                    >
                        <img id="img" alt="验证码" :src='src' />
                    </a>
					<!-- <img class="codeImg" :src="'data:image/jpeg;base64,'+imgUrl" alt @click="getCaptcha" ><i v-if="!imgUrl.length" class="el-icon-loading"></i> -->
				</template>
			</el-form-item>
			<el-button type="primary" @click="onLogin">登录</el-button>
		</el-form>
	</div>
</template>
<script>

import * as API from "@/api/login";
import Cookie from 'js-cookie';
import axios from 'axios';
export default {
    data(){
        return {
            form: {
                email: Cookie.get('EuserName') || 'xiaofei.liu@naxions.com',
                password: "liuF0223_",
                code: "",
                token: "",
                text:""
            },
            src: `${process.env.BASE_API}/getVerifyCode?${new Date() * 1}`,
            sessionId:''
        };
    },
    mounted() {
        Cookie.remove("sessionId")
        this.getSessionId();
    },
    methods: {
        keyup(e) {
            if(e.keyCode == 13) {
                this.onLogin();
            }
        },
        getSessionId(){
            let url = `${process.env.BASE_API}/getSessionId`;
            axios.get(url).then((res) => {
                if(res.data.code&&res.data.code == 200 && res.data.data){
                    this.sessionId=res.data.data;
                    Cookie.set("sessionId",this.sessionId)
                    this.getVerify();
                }else{
                    this.$message.error("获取sessionId失败, 请稍后重试! ");
                }
            }).catch(() => {
                this.$message.error("获取sessionId失败, 请稍后重试! ");
            })
        },
        //获取验证码
        getVerify() { 
            let src = `${process.env.BASE_API}/getVerifyCode?${new Date() * 1}&sessionId=${this.sessionId}`;
            this.src = src;
        },
        //登录
        onLogin() {
            let isEmpty = this.isEmpty();
            if(!isEmpty) {
                return;
            }
            let form = {}
            form.userName = this.form.email.trim();
            form.password = this.form.password.trim();
            form.verifyCode = this.form.code.trim();
            API.login(form).then( (res) => {
                Cookie.set("EuserName",form.userName)
                Cookie.set("Epassword",form.password)
                Cookie.set('userInfo',res)
                let backgroundAuthorityList = res.backgroundAuthorityList || [];
                // this.setCookie(form.userName, form.password);
                this.$router.push({
                    path: '/home'
                })
            }).catch(()=>{
                this.getVerify();
            });
        },
        //非空验证
        isEmpty() {
            if(!this.form.email.trim()) {
                this.Message("请输入用户名");
                return false;
            }
            if(!this.form.password.trim()) {
                this.Message("请输入密码");
                return false;
            }
            if(!this.form.code.trim()) {
                this.Message("请输入验证码");
                return false;
            }else if(this.form.text&&this.form.code.trim() != window.decodeURI(atob(this.form.text))){
                this.Message("请输入正确的验证码");
                return false;
            }
            return true;
        },
        Message(message, type) {
            type = type || "warning";
            this.$message({
                message,
                type
            });
        },
        // setCookie(c_name, c_pwd, exdays) {
        //     var exdate = new Date(); //获取时间
        //     exdays = exdays || 7;
        //     exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
        //     //字符串拼接cookie
        //     window.document.cookie = "EuserName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
        //     window.document.cookie = "Epassword" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
        //     // window.document.cookie = "Etoken" + "=" + c_token + ";path=/;expires=" + exdate.toGMTString();
        // }
    }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
	.fl {
		display: flex;
	}
	
	.fl-j-center {
		display: flex;
		justify-content: center;
	}
	
	.fl-a-center {
		display: flex;
		align-items: center;
	}
	
	.login {
		// position: relative;
		height: 100vh;
        width 100vw;
        background url('./../../assets/images/eapp-ops-web-loginbg.jpeg') no-repeat;
        background-size cover;
        display flex;
        justify-content center
        align-items center;
        flex-direction column
        .title{
            margin-bottom 24px
            color #fff
        }
		.el-form {
			width: 460px;
			padding: 30px;
			border: 1px solid #ccc;
			background: #fff;
			box-shadow: 0 0 30px 0 rgba(0, 0, 0, 0.1);
			border-radius: 8px;
			// position: absolute;
			// right: 120px;
			// top: 25vh;
			// margin-top: -295px;
		}
		.codeImg {
			width: 110px;
			height: 40px;
			border: 1px solid #eee;
			border-radius: 3px;
            cursor: pointer
		}
		.el-flex {
			.el-form-item__content {
				display: flex;
				align-items: center;
			}
		}
		.el-button {
			width: 80%;
			position: relative;
			left: 10%;
		}
        .el-icon-loading{
            position: relative;
            left: -66px;
            font-size: 20px;
        }
	}
</style>
