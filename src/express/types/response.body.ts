
export interface ResponseBody<T>{
    status:"success"|"fail"|"error",
    data:ResponseData<T>
}
interface ResponseData<T>{
payload:T
}