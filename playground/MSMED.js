var connect = require('../Data/Connect');
var datamodel = require('../Data/DataModel');
var dataaccess = require('../Data/DataAccess');
var dataconn = require('../Data/DataConnection');
var commonFunc = require('../Common/CommonFunctions')


module.exports = {


    createDocDefinition: async (fileParams) => {
        let date = commonFunc.ConvertDateToDDMMYYYY(new Date())
        var dd = {
    background: function (currentPage, pageSize) {
       return [
           {
               canvas: [
                   { type: 'line', x1: 10, y1: 10, x2: 585, y2: 10, lineWidth: 1 }, //Up line
                   { type: 'line', x1: 10, y1: 10, x2: 10, y2: 835, lineWidth: 1 }, //Left line
                   { type: 'line', x1: 10, y1: 835, x2: 585, y2: 835, lineWidth: 1 }, //Bottom line
                   { type: 'line', x1: 585, y1: 10, x2: 585, y2: 835, lineWidth: 1 }, //Rigth line
               ]

           }
       ]
   },
  
   content: [
       
{text:[
    `\n\n\n\n\n\n\n\n`,
    {text:`To Be Printed on Vendor's Letter Head\n`,bold:'true',alignment:'center',fontSize: 12},
    {text:`\n Format - (A)\n`,bold:'true',alignment:'center',fontSize: 12,},
    {text:`\n CONFIRMATION ON APPLICABILITY OF “MICRO, SMALL AND MEDIUM ENTERPRISES
    DEVELOPMENT ACT, 2006 (MSMED ACT 2006)\n`,bold:'true',alignment:'center',fontSize: 12},
  
`\nI / We hereby confirm the following.\n\n`,
  ]},
      {
           style: 'tableExample',
             layout: 'noBorders',
           table: {
             widths:[30,'*'],
               body: [

  [ {text:` 1.`,alignment:'right'}, {text: `Our organization is registered under the MSMED Act 2006 :
       \u200B\t Yes  [   ]
               \u200B\t No   [   ]
`,fontSize:11,},],
[` `, {text:`(Please put a tick in the appropriate box)`,bold:true,fontSize:11,}],

[{text:` 2.`,alignment:'right'},  {text:`That the certificate so obtained is valid as on today’s date:
                \u200B\t Yes  [   ]
               \u200B\t No   [   ]
`,fontSize:11},],
[` `,{text:`(Please put a tick in the appropriate box)`,bold:true,fontSize:11},],

[{text:` 3.`,alignment:'right'},{text:` If the answer to Q 1 is yes, kindly provide the following additional information:

                 Our organization falls under the definition of:
                 a.   Micro Enterprise -       [   ]
                 b.   Small Enterprise -       [   ]
                 c.    Medium Enterprise -  [   ]
`,fontSize:11},],

[` `,{text:`(Please put a tick in the appropriate box)`,bold:true,fontSize:11},],
       ]
           }
       },

{text:`\nSelf-attested copy of valid registration certificate / Valid Document [indicating registration no.] of being a Micro/Small/ Medium Enterprises is enclosed.`,fontSize:11},

{text:`\n \u200B\t MSMED Registration No:

\u200B\t Certificate Issued Date:
`,bold:true,fontSize:11},
{text:[

{text:`\nI / We hereby undertake that in case in future there is any change to the above facts, the same shall be intimated on mail ID`},{text:` accounts.payable@edelweissfin.com`,decoration:'underline'},

{text:`\n\nI / We hereby confirm that we comply with the investment criteria required for Micro, Small, Medium enterprise under the MSMED Act 2006.`,fontSize:11},

{text:`\n\n
Place:

Date:${date}

Name:

Signature of Authorized Signatory:

Designation:

Name of Organization with Seal:

CIN Number:

PAN Number:
`,bold:true,fontSize:11},
  
]},

]}
return dd
    }
}