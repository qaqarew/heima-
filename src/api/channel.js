import request from '@/utils/request'

// c4-创建接口文档
export const getChannelAPI=()=>{
    return request({
        url:'/v1_0/user/channels'
    })
}

// c13-1-
/**
 * 获取所有频道
 * @returns  Promise
 */
export const getAllChannelsAPI =() =>{
    return request({
        url:'/v1_0/channels'
    })
}