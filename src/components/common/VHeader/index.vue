<template>
    <div class="v-header">
        <h1 class="title">Hcp360后台管理系统</h1>
        <div class="r-btns">
<el-dropdown @command="handleCommand">
  <span class="el-dropdown-link">
      <i class="icon user el-icon-user"></i>
     {{userInfo.userName}}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
  <el-dropdown-menu slot="dropdown">
    <el-dropdown-item command="a">注销</el-dropdown-item>
  </el-dropdown-menu>
</el-dropdown>

          <!-- <span v-if="userInfo.roleListStr">【{{userInfo.roleListStr}}】</span> -->
          <!-- <span class="icon logout" @click="logout"><i class="el-icon-switch-button"></i>注销</span> -->
        </div>
    </div>
</template>
<script>
import { logout } from '../../../api/login';
import {logoutAccount} from '@/utils/common';
import Cookie from 'js-cookie'
export default {
    props: {
        userInfo: {
            type: Object,
            default: () => {
                return { nickname: "", userId: "", roleList: [],roleListStr:""};
            }
        }
    },
    data() {
        return {
        };
    },
    computed: {
        defaultActive() {
            return this.$route.path || "/";
        }
    },
    mounted() {
    },
    created(){
        // console.log(this.userInfo)
    },
    methods: {
        // logout(){
        //     logout().then(() => {
        //         logoutAccount();
        //         // this.$router.push('/login')
        //     });
        // }
        handleCommand() {
            // Cookie.remove('EuserName');
            // Cookie.remove('Epassword');
            // this.$router.push('/login')
            // this.$message('click on item ' + command);
            logout().then(() => {
                logoutAccount();
                Cookie.remove('userInfo')
                this.$router.push('/login')
            });
        }
    }
};
</script>

<style lang="stylus" scoped>
.v-header {
    width: 100%;
    height: 60px;
    background: #011e3c;
    color: #fff;
    border-bottom: solid 1px #011e3c;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;

    .el-icon-switch-button, .el-icon-user {
        font-size: 17px;
        font-weight: 900;
        margin-right: 8px;
        margin-left: 20px;
    }
     .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}
</style>
