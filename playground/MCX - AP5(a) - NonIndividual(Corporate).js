var commonFunction = require('../Common/CommonFunctions');
var connect = require('../Data/Connect');
var datamodel = require('../Data/DataModel');
var dataaccess = require('../Data/DataAccess');
var dataconn = require('../Data/DataConnection');
var path = require('path')
module.exports = {
    createDocDefinition: async (fileParams) => {
        let AP_Draft_General_Details = datamodel.AP_Draft_General_Details()
        let date = commonFunction.ConvertDateSlash(new Date())
        console.log(date)

        let apData = await dataaccess.FindOne(AP_Draft_General_Details, { where:{  Id:fileParams.apId }})

var dd = {
	content: [

{text:[ 
		{text: `\n\n(On the letter head of Authorised Person)`, bold: 'true', alignment: 'center',color:'red',background:'yellow'},
			{text: `\nAP-5a  `, bold: 'true', alignment: 'center',},
				{text: `\n(For Corporate)`, bold: 'true', alignment: 'center',},
      
    `\n\nShareholding Pattern of `,
      {text: `${apData.Account_Name== null ? ' ' :apData.Account_Name.toUpperCase()}`,decoration:'underline', bold: 'true'},
      ` (name of Authorised Person) as on Date:`,
      {text:` ${date}`,decoration:'underline', bold:'true'},`(date)`,

`\n\nPaid up __________________Rs.________________________________________________ 

Face value of each equity share _____________Rs.__________________________________
 
`,

]},


        {
            style: 'tableExample',
            table: {
                widths: [60,120,80,70,'*'],
                body: [
                    [{text:`Sr. No.`, alignment:'center'}, {text:`Name`, alignment:'center'}, {text:`Number of Shares held `, alignment:'center'},{text:`Amt paid-up Rs.`, alignment:'center'},{text:`% age of total`, alignment:'center'}],
                    [' 1.', '', '','','',],
                    [' 2.', '', '','','',],
                    [' 3.', '', '','','',],
                    [' 4.', '', '','','',],
                    [' 5.', '', '','','',],
                    ['Others','','','',''],
                    [' TOTAL', '', '','','100%',],
 

                ]
            }
        },

{text:`\nDate : ${date}`, bold:'true'},

{text:`\nPlace:`,},

{text:[
{text:`\n\n Signature(s)`, alignment: 'left'},
{text:`\nName of Director(s) `, alignment: 'left'},
{text:`\nWith Stamp of the Authorised Person`, alignment: 'left'},

{text:`\n\n\nCERTIFICATE`,alignment:'center',bold:'true'},
`\n\nThis is to certify that the Shareholding in `,
{text: `${apData.Account_Name== null ? ' ' :apData.Account_Name.toUpperCase()}`,decoration:'underline', bold:'true'}, 
 ` as given above, based on my/ our scrutiny of the books of accounts, records and documents is true and correct to the best of my/our knowledge and as per information provided to my/our satisfaction. Further, we confirm that there is no foreign shareholding in the said entity. 
`,

{text:`\n\nDate :`,},
{text:`\n\nPlace:`,},


{text:`\n\n\n\n\n For (Name of Certifying Firm)`,alignment: 'left'},
{text:`\nName of the Partner/Proprietor `,alignment: 'left'},    
{text:`\nChartered Accountant `,alignment: 'left'},
{text:`\nMembership Number`,alignment: 'left'},
]},

]}
return dd
    }
}