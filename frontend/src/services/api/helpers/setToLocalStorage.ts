export const setToLocalStorage = <T>(key:string,value:T):void=>{
    if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(value));
    }
}