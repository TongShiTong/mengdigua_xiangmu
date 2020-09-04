 function getBaseApi() {
    // if (process.env.NODE_ENV === 'development') { // 测试用
    //     return 'https://api-develop.mengdigua.cn'
    // } else {
        return window.location.origin + '/web'
    // }
}

export function TimeStap(time){ //时间格式：'2018-12-27 18:30:00'，返回时间戳
  return moment(time).valueOf();
}
export function TimeString(timestamp){ //时间格式：以上方法返回的时间戳
  if((timestamp*1)>0){
    let objData=new Date(timestamp)
    const leftSecond = parseInt(timestamp/1000)
    const Day = Math.floor(leftSecond / (60 * 60 * 24))
    const Hour = Math.floor((leftSecond - Day * 24 * 60 * 60) / 3600)
    const Minute = Math.floor((leftSecond - Day * 24 * 60 * 60 - Hour * 3600) / 60)
    const Second = Math.floor(leftSecond - Day * 24 * 60 * 60 - Hour * 3600 - Minute * 60)
    return {
      'year':'00',
      'monuth':'00',
      'day':String((Day<10?'0'+Day:Day)),
      'hour':String((Hour<10?'0'+Hour:Hour)),
      'minute':String((Minute<10?'0'+Minute:Minute)),
      'second':String((Second<10?'0'+Second:Second)),
      'timeData1':`${(Day*24+Hour*1)?(Day*24+Hour*1):'00'}:${Minute?Minute:'00'}:${Second?Second:'00'}`,
      'timeData2':new Date(parseInt(timestamp)).toLocaleString().replace(/年|月|\//g, "-").replace(/日/g, " "),
      'timeData2':objData.getFullYear() + '-'+(objData.getMonth()+1 < 10 ? '0'+(objData.getMonth()+1) : objData.getMonth()+1) + '-'+(objData.getDate()+1 < 10 ? '0'+(objData.getDate()) : objData.getDate()) + ' '+(objData.getHours()+1 < 10 ? '0'+(objData.getHours()) : objData.getHours()) + ':'+(objData.getMinutes()+1 < 10 ? '0'+(objData.getMinutes()) : objData.getMinutes()) + ':'+(objData.getSeconds()+1 < 10 ? '0'+(objData.getSeconds()) : objData.getSeconds())
    }
  }else{
    return {
      'year':'00',
      'monuth':'00',
      'day':'00',
      'hour':'00',
      'minute':'00',
      'second':'00',
      'timeData1':'00:00:00',
    }    
  }
}


export {
    getBaseApi,
}