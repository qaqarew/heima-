import request from '@/utils/request'

// c4-创建接口文档
export const getChannelAPI=()=>{
    return request({
        url:'/v1_0/user/channels'
    })
}