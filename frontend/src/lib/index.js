export const getDayFromDate = (date) => {
    const now = new Date();
    if(now.getMonth() === date.getMonth()){
        if(now.getDate() === date.getDate()){
          let hours = date.getHours();
          let minutes = date.getMinutes();
          if(hours<10){
            hours = "0"+ hours;
          }
          if(minutes<10){
            minutes = "0"+ minutes;
          }
            return `${hours}:${minutes}`;
        }
        else {
            switch (date.getDay()) {
                case 0:
                  return "CN";
                case 1:
                  return "T2";
                case 2:
                  return "T3";
            
                case 3:
                  return "T4";
            
                case 4:
                  return "T5";
            
                case 5:
                  return "T6";
            
                case 6:
                  return "T7";
                default:
                  break;
              }
        }
    }
    else{
        const day = date.getDate()+1;
        const month = date.getMonth()+1;
        if(day<10){
          day = "0"+ day;
        }
        if(month<10){
          month = "0"+ month;
        }
        return `${day} Tháng ${month}`;
    }

};
