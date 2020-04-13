<template>
    <div>
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="会议数据" name="first">
                <Mettingtabel></Mettingtabel>
            </el-tab-pane>
            <el-tab-pane label="参会数据" name="second">
                <Attendmetting></Attendmetting>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import Mettingtabel from "./components/mettingTabel";
import Attendmetting from "./components/attendMetting";
export default {
    components: {
        Mettingtabel,
        Attendmetting
    },
    data() {
        return {
            activeName: "first"
        };
    },
    methods: {
        handleClick(tab, event) {
            this.activeName = tab.name;
        }
    }
};
</script>

<style></style>
