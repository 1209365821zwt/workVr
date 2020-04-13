<template>
  <div>
      <!-- <Checkbox :checklist="checklist"></Checkbox> -->
  </div>
</template>

<script>
// import Checkbox from '../components/checkbox'
export default {
    components:{
        // Checkbox
    },
    data(){
        return {
            checklist:[
                {
                    title:'医生列表',
                    children:[
                        {
                            title:'区分多产品'
                        },
                        {
                            title:'区分医生tab'
                        },
                        {
                            title:'筛选医生'
                        }
                    ]
                },
                {
                    title:'医生画像',
                    children:[
                        {
                            title:'在线问诊'
                        },
                        {
                            title:'论文'
                        },
                        {
                            title:'参加活动'
                        }
                    ]
                },
                {
                    title:'认识其他医生',
                    children:[
                        {
                            title:"TA想认识的医生"
                        }
                    ]

                },
                {
                    title:'医生列表',
                    children:[
                        {
                            title:'区分多产品'
                        },
                        {
                            title:'区分医生tab'
                        },
                        {
                            title:'筛选医生'
                        }
                    ]
                },
                {
                    title:'医生画像',
                    children:[
                        {
                            title:'在线问诊'
                        },
                        {
                            title:'论文'
                        },
                        {
                            title:'参加活动'
                        }
                    ]
                },
                {
                    title:'认识其他医生',
                    children:[
                        {
                            title:"TA想认识的医生"
                        }
                    ]

                }
            ]
        }
    }
 
}
</script>

<style>

</style>