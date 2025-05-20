var cron = require('node-cron');

var SchedulerFunction = require('../Service/Scheduler/SchedulerFunction');

//For Get_BankCSO_Details_API Master Data
 cron.schedule('00 20 * * *',function(){  
    SchedulerFunction.Get_BankCSO_Details_API();
 });

 //For Client_Details Data
 cron.schedule('30 20 * * *',function(){
    SchedulerFunction.Get_Client_Details_API();
});

//For Client_Upload_Details Data
cron.schedule('16 13 * * *',function(){
   SchedulerFunction.Get_Client_Upload_Details_API();
});

//For Empolyee_Details Data
cron.schedule('21 18 * * *',function(){
   SchedulerFunction.Get_Empolyee_Details_API();
});
//For Empolyee_Details Data
cron.schedule('21 18 * * *',function(){
   SchedulerFunction.Get_Folio_Details_API();
});
