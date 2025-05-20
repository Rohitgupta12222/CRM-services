var connect = require('../Data/Connect');
var datamodel = require('../Data/DataModel');
var dataaccess = require('../Data/DataAccess');
var dataconn = require('../Data/DataConnection');


module.exports = {
    createDocDefinition: async (fileParams) => {
        let EntityMst = datamodel.EntityMst()

        let AP_Draft_General_Details = datamodel.AP_Draft_General_Details()
        let apData = await dataaccess.FindOne(AP_Draft_General_Details, { where: { Id: fileParams.apId } })
        let entityData = await dataaccess.FindAll(EntityMst, { limit: 1, order: [['Id']] })
        // let date = commonFunction.ConvertDateSlash(new Date())



        var dd = {
            content: [
                `\n\n\n\n\n\n\n\n`,
                { text: `(On the letterhead of the Authorised person)`, bold: 'true', alignment: 'center', color: '#919191' },
                { text: `\nAnnexure - 2`, bold: 'true', alignment: 'center' },
                { text: `\nUndertaking`, bold: 'true', alignment: 'center', },
                {
                    text: [
                        `\n\nI Mr./Ms. `,
                        {
                            text:
                                `${apData.Account_Name== null ? ' ' :apData.Account_Name.toUpperCase()}`, bold: 'true', decoration: 'underline'
                        },
                        { text: ` (name of the applicant authorised person)`, color: '#36454F' },
                        ` had applied for appointment as Authorised Person of the Stock Exchange on`,
                        { text: `\n\n(Tick the segment (s) applied for)\n`, color: '#36454F' },
                        { text: "\n\uf096 ", style: 'fontawesome' },
                        `  Capital Market\n `,
                        { text: "\uf096 ", style: 'fontawesome' },
                        `  Futures & Options\n`,
                        { text: "\uf096 ", style: 'fontawesome' },
                        `  Currency Derivatives
       
       
Segment (s) through trading member, `,


                        { text: `${entityData[0].Entity_Name}.`, bold: 'true' },
                        { text: `(name of the trading member)`, color: '#36454F' },

                        `).  In this regard, I hereby confirm/undertake that:

1. I have not been convicted for any offence in the past and presently and not under trial for any offence involving fraud and dishonesty. 
\n2. I will deal with investors on behalf of Trading Member only and that I would not engage in any activities with investors which could result in unauthorised intermediations.
\n3. I am neither an Authorised Person of any other member of the stock exchange and nor has/have applied for appointment as Authorised Person with any other member of the stock exchange.
\n4. I confirm that I am not a defaulter/expelled on any stock exchange.
\n5. I confirm that I am “fit and proper” under SEBI (Intermediaries) Regulations, 2008 and no action has been taken against me by SEBI, RBI, etc. and I have not defaulted in payment to any agency.

Date : ______________
					
Place: ______________                              __________________________________________       
                   
`,
                        { text: `   *Name, Signature & Seal `, bold: 'true ', alignment: 'center' },
                        `\n\n*Should be signed by Proprietor/Directors/Partners of the Authorised Person.`,
                    ]
                },



            ],
            styles: {

                fontawesome: {

                    'font': 'FontAwesome',

                    'color': "#656565"



                }

            }
        }
        return dd
    }
}