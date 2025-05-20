// playground requires you to assign document definition to a variable called dd
var connect = require('../Data/Connect');
var datamodel = require('../Data/DataModel');
var dataaccess = require('../Data/DataAccess');
var dataconn = require('../Data/DataConnection');
var commonFunc = require('../Common/CommonFunctions')

module.exports = {


    createDocDefinition: async (fileParams) => {
        let AP_Draft_General_Details = datamodel.AP_Draft_General_Details()
        let apData = await dataaccess.FindOne(AP_Draft_General_Details, { where: { Id: fileParams.apId } })

var dd = {
    content: [

        { text: `Undertaking`, bold: 'true', fontSize: 18, alignment: 'center' },
        {
            text: [

                `\n\nI hereby declare that, the AP / DSA getting registered in the name of : `, 
{text:`${(apData.Account_Name == null ? ' ':apData.Account_Name ).toUpperCase()}`, decoration:'underline'},` PAN Number : `,
{text:`${apData.PAN_Number == null ? ' ' : apData.PAN_Number.toUpperCase()}`,decoration: 'underline'},
` is not my dependent relatives and/or any Ex-employee of Edelweiss or family members of Ex-Employee and in case if there are any such instance (s) I undertake to bring up the same to the notice of My Reporting Authority at Edelweiss Broking Limited (EBL) immediately before getting them registered as 
an AP / DSA. The absence of such intimation may lead to such actions including 
warning/penalty/termination as EBL may deem fit. Further, also agree that upon 
identification of relationship the said AP may be mapped under different RM of EBL without 
my consent and EBL reserves the right to assign the same to any other RM as it may deem fit.\n\n
I hereby confirm that the above consent is true to my knowledge.`,
                `\n\n\n______________
Signature of FRM`,
                `\n\n\n`,
                { text: `_______________ `, alignment: 'left' }, { text: `                                        _______________ `, alignment: 'center', }, { text: `                                                   ____________ `, alignment: 'right', },
                { text: `\nFRM Name: `, alignment: 'left' }, { text: `                                                          Designation :`, alignment: 'center', }, { text: `                                                        Zone:`, alignment: 'right', },

                { text: `\n\n\n\nIf any relation found,`, bold: 'true', decoration: 'underline' },
                `•    In case of Ex-Employee or Ex-employee’s relative –`,
                { text: `To Take HR’s approval first`, bold: 'true' },

                `•    In case of dependent relative : Concerned RAs are requested to report the same to SBAP team 
          and remap the partner to some other FRM who is not connected with the said partner/s by 
          fill following details :
\nDetails of AP (Related as mentioned above)`,

                { text: `\n\n\n\n__________________ `, alignment: 'left' }, { text: `                    _______________________________________________________ ` },
                `\nAP/DSA Name& Code`, `                       Name of Employee Related to AP/DSA`, `         (With type of relation)`,
                { text: `\n\n\n\n`, alignment: 'center' }, { text: `______________________________`, alignment: 'center' },
                { text: `\nMapped to another Employee`, alignment: 'center' },


                { text: `\n\n\n\n_______________ `, alignment: 'left' }, { text: `                                _______________ `, alignment: 'center', },
                { text: `\nFRM Name: `, alignment: 'left' }, { text: `                                            Name of RA`, alignment: 'center', },




            ]
        }
    ]

}
return dd }}