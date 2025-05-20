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
        let AP_Draft_Contact_Details = datamodel.AP_Draft_Contact_Details()

        let apData = await dataaccess.FindOne(AP_Draft_General_Details, { where:{  Id:fileParams.apId }})
        let apContact = await dataaccess.FindAll(AP_Draft_Contact_Details,{where:{  AP_Id:fileParams.apId },attributes:['Contact_Person_Name']})
        let str = apContact.map(e =>e.Contact_Person_Name== null ? ' ' :e.Contact_Person_Name.toUpperCase() ).join(', ')
 var dd = {
	content: [

{text:[ 
		{text: `\n\n(On the letter head of Authorised Person)`, bold: 'true', alignment: 'center',color:'red',background:'yellow'},
			{text: `\n\nAP-5b  `, bold: 'true', alignment: 'center',},
				{text: `\n(For Firms/LLP)`, bold: 'true', alignment: 'center',},
      
      `\n\nSharing Pattern of `,
      {text: `${apData.Account_Name== null ? ' ' :apData.Account_Name.toUpperCase()}`,decoration:'underline', bold:'true'},
      ` (name of Authorised Person) as on `,
      {text:`${date}`,decoration:'underline', bold:'true'},`(date)
\n\n`,

]},


        {
            style: 'tableExample',
            table: {
                widths: [60,120,120,120,70],
                body: [
                    [{text:`Sr. No.`, alignment:'center'}, {text:`Name of the Partner`, alignment:'center'}, {text:`Capital in the Firm (Rs.) `, alignment:'center'},{text:`Share in Profits.`, alignment:'center'},{text:`Share in Losses`, alignment:'center'}],
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
{text:`\nPartner: Mr. / Ms. ${str} `,bold:'true'},        

{text:`\nDate : ${date}`,},

{text:`\nPlace:`,},

{text:[
{text:`\n\n\n Signature(s)`, alignment: 'left'},
{text:`\nName of Partner(s)  `, alignment: 'left'},
{text:`\nWith Stamp of the Authorised Person`, alignment: 'left'},

{text:`\n\n\nCERTIFICATE`,alignment:'center',bold:'true'},
`\n\nThis is to certify that the Capital and Sharing Pattern of `,
{text: `${apData.Account_Name== null ? ' ' :apData.Account_Name.toUpperCase()}`,decoration:'underline',bold: 'true'},
` as given above, based on my/ our scrutiny of the books of accounts, records and documents is true and correct to the best of my/our knowledge and as per information provided to my/our satisfaction. We confirm that there is no foreign holding in the said entity.  
`,

{text:`\n\nDate :`,},
{text:`\nPlace:`,},


{text:`\n\n\n For (Name of Certifying Firm)`,alignment: 'left'},
{text:`\nName of the Partner/Proprietor `,alignment: 'left'},    
{text:`\nChartered Accountant `,alignment: 'left'},
{text:`\nMembership Number`,alignment: 'left'},
]},

]}
return dd
    }
}