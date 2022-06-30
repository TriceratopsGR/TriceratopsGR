import { v4 as uuidv4 } from 'uuid';
// 生成一个随机的字符串，且每次执行不能发生变化，游客身份持久化存储
export const getUUID = () => {
    // 先从本地存储获取uuid 看一下是否存在uuid
    let uuid_token = localStorage.getItem("UUIDTOKEN");
    // 如果没有
    if (!uuid_token) {
        // 我生成一个游客临时身份
        uuid_token = uuidv4();
        // 本地存储一次
        localStorage.setItem("UUIDTOKEN", uuid_token);
    }
    // 切记有返回值，没有返回值undefined
    return  uuid_token
}