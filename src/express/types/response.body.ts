
export interface ResponseBody<T>{
    status:"success"|"fail"|"error",
    message,
    data:ResponseData<T>
}
interface ResponseData<T>{
payload:T
}