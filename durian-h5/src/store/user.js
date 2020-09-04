Date.prototype.addDays = function(days) {
  var date = new Date(this.valueOf());
  date.setDate(date.getDate() + days);
  return date;
}

export function setToken(token) {
  const date = new Date().addDays(7);
  const obj = JSON.stringify({'token': token, 'date':date});
  localStorage.setItem("token", obj);
}

export function getToken() {
  const obj = localStorage.getItem("token");
  if(obj){
    const {token, date} = JSON.parse(obj);
    const time = Date.parse(date);
    const now = new Date();
    if(now.getTime() > time){
      clearToken();
      return undefined;
    }else{
      return token;
    }
  }
  return undefined;
}

export function clearToken() {
  return localStorage.removeItem("token");
}

export function setRecomendId(recomendId) {
  localStorage.setItem("recomendId", recomendId);
}

export function getRecomendId() {
  return localStorage.getItem("recomendId");
}

export function clearRecomendId() {
  return localStorage.removeItem("recomendId");
}

export function setUserInfo(userInfo) {
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
}

export function getUserInfo() {
  return JSON.parse(localStorage.getItem("userInfo"));
}

export function clearUserInfo() {
  return localStorage.removeItem("userInfo");
}
