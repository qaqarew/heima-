import request from "@/utils/request";

/**
 * 
 * @param {*} q 搜索的关键词
 * @returns promise
 */
// d4-1-创建关键词api接口
export const getSuggestionsAPI =(q) =>{
    return request({
        url:'/v1_0/suggestion',
        params:{
            q
        }
    })
}

// d5-1-创建搜索结果
/**
 * 
 * @param {Number} page 分页页数，非必填，不填默认值1
 * @param {Number} per_page 每一页数据量
 * @param {String} [} q  搜索关键词
 * @returns 
 */
export const getResultsAPI =(page,per_page,q) =>{
    return request({
        url:'/v1_0/search',
        params:{
            page,
            per_page,
            q
        }
    })
}