<template>
    <div class="home">
        <div class="img"></div>
        <div class="text">暂无数据</div>
    </div>
</template>
<style lang="stylus" scoped>
.home{
    width 100%
    height 100%
    // background-image  url('../../../assets/images/homebg.png');
    // background-size cover;
    // background-color pink
    display flex
    justify-content center
    align-items center
    flex-direction column
    position relative
    top -20%
    color #999
    font-size 20px
    .img{
        width 30%
        height 30%
        min-height: 400px;
        background-image  url('../../../assets/images/homebg.png');
        background-size cover;
        margin-bottom 40px
    }

}
</style>
