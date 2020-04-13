<template>
  <div class="main-detail">
     <div class="left">
        <dl>
           <dt><b>代表姓名:</b><span>{{object.repName}}</span></dt>
           <dt><b>申请兑换时间:</b><span>{{object.exchangeTime}}</span></dt>
           <dt><b>兑换数量:</b><span>{{object.exchangeNum}}</span></dt>
           <dt class="imgs"><b >礼品图片:</b><img :src="object.giftImagePath" alt class="img"></dt>
           <dt><b>兑换状态:</b><span>{{object.exchangeState | filterV}}</span></dt>
        </dl>
     </div>
     <div class="right">
        <dl>
          <dt><b class="label">所属项目:</b><span>{{object.projectName}}</span></dt>
          <dt><b class="label">兑换礼品:</b><span>{{object.exchangeGiftName}}</span></dt>
          <dt><b class="label">所需积分:</b><span>{{object.requiredIntegral}}</span></dt>
          <dt><b class="label">礼品描述:</b><span class="content">{{object.giftDescribe}}</span></dt>
          <dt><b class="label">兑换时间:</b><span>{{object.timeOfApplicationForExchange}}</span></dt>
        </dl>        
     </div>
  </div>
</template>

<script>
export default {
    props:{
        object:{
            type:Object,
            default:()=>{
                return {}
            }
        }
    },
    filters:{
        filterV:(val) => {
            if(val == 1){
                return '兑换'
            } else if(val == 2){
                return '已兑换'
            } else {
                return ''
            }
        }
    },
    mounted(){
        
    }
}
</script>

<style lang='stylus' scoped>
.main-detail{
    width: 100%;
    height: 500px;
    display flex;
    border:1px solid #ccc;
    margin:auto;
    .left{
        flex:1;
        height: 100%
       margin-left :10%;
       dl{
           dt{
               margin-top: 25px;
               b{
                   display: inline-block;
                   margin-left:20px;
               }
               span{
                   display: inline-block;
                   margin-left:20px;
               }
               .imgs{
                  display flex;
                  justify-content center;
                  align-items center;
               }
               .img{
                   width 80px;
                   height 80px
                   border 1px solid #ccc;
                   margin-left:20px;
                   vertical-align: top;
               }
           }
       }
    }
    .right{
        flex:1;
        height:100%;
        margin-left :10%;
       dl{
           dt{
               display: flex;
               margin-top: 25px;
               b{
                   display: inline-block;
                   margin-left:20px;
                   &.label{
                       min-width: 62px;
                   }
               }
               span{
                   display: inline-block;
                   margin-left:20px;
                   &.content{
                        line-height: 18px;
                        padding-right: 15px;
                   }
               }
              
           }
       }
    }

}
</style>