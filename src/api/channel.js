import request from '@/utils/request'

// c4-创建接口文档
/**
 * 我的频道api
 * @returns  Promise
 */
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

// c14-3-2删除频道接口
/**
 * 
 * @param {Number/String} id  频道id
 * @returns promise
 */
export const delChannelAPI =(id)=>{
    return request({
        url:`/v1_0/channels/${id}`,
        method: 'DELETE'
    })
}
// c14-4-2添加频道接口
/**
 * 
 * @param {String|Number} id 新增频道id
 * @param {Number}} seq  新增频道添加的索引值
 * @returns Promise
 */
export const addChannelAPI =(id,seq) =>{
    return request({
        url:'/v1_0/user/channels',
        method:'PATCH',
        data:{
            channels:[{id,seq}]
        }
    })
}