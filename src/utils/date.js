//时间戳格式化为yyyy-MM-dd hh:mm:ss格式，其他格式也可自行更改

  var formatDateTime = function(date){
    if(date == 0){
      return "暂无"
    }
    var date = new Date(date*1000);
    var timeStr = date.getFullYear() + '-';
    if(date.getMonth() < 9) {
      //月份从0开始的
      timeStr += '0';
    }
    timeStr += date.getMonth() + 1 + '-';
    timeStr += date.getDate() < 10 ? ('0' + date.getHours()) : date.getHours();
    timeStr += ' ';
    timeStr += date.getHours() < 10 ? ('0' + date.getHours()) : date.getHours();
    timeStr += ':';
    timeStr += date.getMinutes() < 10 ? ('0' + date.getMinutes()) : date.getMinutes();
    timeStr += ':';
    timeStr += date.getSeconds() < 10 ? ('0' + date.getSeconds()) : date.getSeconds();
    return timeStr;
  }

  export default formatDateTime