var dataconn = require('./Data/DataConnection');
var express = require('express');
var path = require('path');
var fs = require('fs');
var app = express();
var config = require('./Config');
var cron = require('./CronScheduler/RunScheduler');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

// CORS Middleware node.js package for connect express
app.use(function (req, res, next) {
	var menthods = "GET, POST";
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Methods", menthods);
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType, Content-Type, Accept, Authorization");
	if (!menthods.includes(req.method.toUpperCase())) {
		return res.status(200).json({});
	};
	next();
});

// const staticImageRootLocal = path.join(__dirname + '/public/');
// app.use(express.static(staticImageRootLocal));

// Service checking method
app.get("/api/sample", function (req, res) {
	res.status(200).json({ Success: true, Message: "Service Running", Data: null });
});

// Connection checking method
app.get("/api/CheckConnection", function (req, res) {
	dataconn.CheckConnection(res);
});

//Table creation Method
app.get("/api/CreateTable", function (reg, res) {
	dataconn.CreateTable(res);
});

var loginService = require('./Service/Login/LoginService')();
app.use("/api/login", loginService);

var menuService = require('./Service/Login/MenuService')();
app.use("/api/menu", menuService);



var errorlogService = require('./Service/ErrorLog/ErrorLogService')();
app.use("/api/errorlog", errorlogService);

var userService = require('./Service/UserManagement/UserService')();
app.use("/api/user", userService);

var homeService = require('./Service/Home/Home')()
app.use("/api/home", homeService)

var roleService = require('./Service/UserManagement/RoleService')();
app.use("/api/role", roleService);

var uiroleService = require('./Service/UserManagement/UIRoleService')();
app.use("/api/uirolemap", uiroleService);

var Dashboard = require('./Service/Admin/Dashboard')();
app.use("/api/Dashboard", Dashboard);

var ManageUser = require('./Service/Admin/ManageUser')();
app.use("/api/ManageUser", ManageUser);

var scheduler=require('./Service/Scheduler/SchedulerFunction')();
app.use("/api/scheduler", scheduler);





var Signature = path.join(__dirname + config.Uploads_Folder + config.Signature_Folder);
if (!fs.existsSync(Signature)) {
	fs.mkdirSync(Signature, { recursive: true });
}



//Documents Start

let pdfService = require('./Service/FileDownload/pdfGenerate')
app.use("/api/fileDownload", pdfService)




var Signature = path.join(__dirname + config.Uploads_Folder + config.Signature_Folder);
if (!fs.existsSync(Signature)) {
	fs.mkdirSync(Signature, { recursive: true });
}

//var Closure = path.join(__dirname  +  '/../' + '/AP' + '/APClosureDocument');
// console.log("Closurepath",Closure)
// if (!fs.existsSync(Closure)) {
// 	fs.mkdirSync(Closure, { recursive: true });
// }

// var ClientMapping = path.join(__dirname +  '/../' + 'AP/' + config.ClientMapping_Folder);
// if (!fs.existsSync(ClientMapping)) {
// 	fs.mkdirSync(ClientMapping, { recursive: true });
// }


// var ReportsService = require('./Service/ReportsNew/Reports')()
// app.use("/api/Reports", ReportsService)



var server = app.listen(process.env.port || config.service_port, function () {
	var host = server.address().address;
	var port = server.address().port;
	var datetime = new Date();
	var message = "Server :- " + host + " running on Port : - " + port + " Started at :- " + datetime;
	console.log(message);
});