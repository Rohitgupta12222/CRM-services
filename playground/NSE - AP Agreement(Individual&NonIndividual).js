var connect = require('../Data/Connect');
var datamodel = require('../Data/DataModel');
var dataaccess = require('../Data/DataAccess');
var dataconn = require('../Data/DataConnection');
var commonFunc = require('../Common/CommonFunctions');
let path = require('path');

module.exports = {
    createDocDefinition: async (fileParams) => {
        let p = path.join(__dirname, '/Sample1.png')
        let AP_Draft_General_Details = datamodel.AP_Draft_General_Details()
        let AP_Draft_Branch_Details = datamodel.AP_Draft_Branch_Details()
        let AP_Draft_Contact_Details = datamodel.AP_Draft_Contact_Details()
        let AP_Draft_Brokerage_Sharing_Details = datamodel.AP_Draft_Brokerage_Sharing_Details()
        let EntityMst = datamodel.EntityMst()
        let CityMst = datamodel.CityMst()
        let StateMst = datamodel.StateMst()
        let entityData = await dataaccess.FindAll(EntityMst, { limit: 1, order: [['Id']] })

        let segmentMst = datamodel.SegmentMst()
        let apData = await dataaccess.FindOne(AP_Draft_General_Details, { where: { Id: fileParams.apId } })
        let apContactData = await dataaccess.FindAll(AP_Draft_Contact_Details, { where: { AP_Id: fileParams.apId, IsActive: true } })
        let apBranchDtls = await dataaccess.FindOne(AP_Draft_Branch_Details, { where: { AP_Id: fileParams.apId, IsRegistered: true } })
        let apBrokerageDtls = await dataaccess.FindAll(AP_Draft_Brokerage_Sharing_Details, { where: { AP_Id: fileParams.apId, Exchange: 4 }, attributes: ['Segment'] })
        let str = apContactData.map(e => e.Contact_Person_Name).join(',')
        let str1 = apBrokerageDtls.map(e => e.Segment)
        let str2 = [];
        for (let i = 0; i < str1.length; i++) {
          // const element = str1[i];
          if (str1[i] == 1 || str1[i] == 3 || str1[i] == 4) {
    
            let segmentData = await dataaccess.FindAll(segmentMst, { where: { Id: str1[i] }, attributes: ['Segment_Alias'] })
            str2.push(segmentData[0].Segment_Alias);
            // console.log(str2);
    
          }
        }
        str2 = str2.filter((item,
          i) => str2.indexOf(item) === i);
        str2 = str2.toString().replace(/\n/g, ', ')
    
        console.log("str2", str2);
        let city = {};
        let state = {};
        if (apBranchDtls) {
            if (apBranchDtls.City_Code) {
                city = await dataaccess.FindOne(CityMst, { where: { Id: apBranchDtls.City_Code } })
            } else {
                city.City_name = ' ';
            }
            if (apBranchDtls.State_Code) {
                state = await dataaccess.FindOne(StateMst, { where: { Id: apBranchDtls.State_Code } })
            } else {
                state.State_Name = ' ';
            }
        }
        let b;
        if (apBranchDtls) {
            b = ((apBranchDtls.Address_1 == null ? ' ' : apBranchDtls.Address_1) + ', ' + (apBranchDtls.Address_2 == null ? ' ' : apBranchDtls.Address_2) + ' ,' + (city.City_name == null ? ' ' : city.City_name) + ', ' + (state.State_Name == null ? ' ' : state.State_Name) + '- ' + (apBranchDtls.Pin_Code == null ? ' ' : apBranchDtls.Pin_Code)).toUpperCase()
        } else {
            b = '';
        }
        let date = new Date()
        date = commonFunc.ConvertDateSlash(date)

        var dd = {
            footer: {
                layout: 'noBorders',
                margin: [20, 0, 10, 100],
                table: {
                    widths: [370, 250],
                    body: [
                        [{ text: ' ', },
                        {
                            stack: [
                                {
                                    image: p,
                                    fit: [100, 100],
                                    alignment: 'left',
                                },
                                {

                                    text: `${entityData[0].Entity_Name}`,
                                    bold: 'true',
                                    alignment: 'left'
                                },
                            ]
                        },]]
                },
            },
            pageMargins: [ 40, 60, 40, 100 ],
            content: [
                '\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n',
                {
                    text: '(To be on a non-judicial stamp paper of minimum Rs. 100)',
                    fontSize: 11,
                    alignment: 'center',
                    color: '#919191'
                },
                {
                    text: '\nAgreement between Member and Authorised Person\n\n\n',
                    fontSize: 11.5,
                    alignment: 'center',
                    bold: 'true',
                },
                {
                    text: [
                        `This Agreement is entered into this _______ day of ________ 20__ at _____________ between `,

                        { text: `${entityData[0].Entity_Name}`, bold: true, },
                        `, Member of `,
                        { text: `National Stock Exchange of India Ltd. `, bold: true, },
                        `(hereinafter referred to as “NSEIL”), ordinarily carrying on business in sale and purchase of shares and securities in the name and style of `,
                        { text: ` ${entityData[0].Entity_Name}`, bold: true, },
                        ` from `,
                        { text: `24th September 2008 `, bold: true, },
                        `Edelweiss House, off C.S.T. Road, Kalina, Mumbai- 400098 `,
                        { text: `${entityData[0].RegisteredAddress}`, bold: true, },
                        ` which expression shall, unless repugnant to the context or meaning thereof, be deemed to mean and include his/her heirs, executors, administrators and legal representatives/the partners for the time being of the said entity, the survivor or survivors of them and their respective heirs, executors, administrators and legal representatives/its successors, as the case may be, of the`,
                        {
                            text: ` One Part;`, bold: true,},
{text:`\n\nAND `, alignment: 'center',bold: true},
                        
                        { text: `\n\n${apData.Account_Name == null ? ' ' : apData.Account_Name.toUpperCase()}`, bold: true, decoration: 'underline' },
                        ` a individual/partnership firm/LLP/body corporate desirous of providing access to the trading platform of NSEIL as an agent of the Trading Member in the Capital Markets/Futures & Options /Currency derivatives segment in the name and style of `,
                        { text: `${apData.Trade_Name == null ? ' ' : apData.Trade_Name.toUpperCase()}`, bold: 'true' },
                        ` (hereinafter referred to as "the Authorised Person".) and having his/its office/registered office at `,
                        { text: `${b}`, decoration: 'underline', bold: 'true' },
                        ` (address), which expression shall, unless repugnant to the context or meaning thereof, be deemed to mean and include his/her heirs, executors, administrators and legal representatives/the partners for the time being of the said entity, the survivor or survivors of them and their respective heirs, executors, administrators and legal representatives/its successors, as the case may be, of the `,
                        { text: `Other Part;`, bold: true},
                        { text: `\n\nWHEREAS,`, bold: true},
                        `\n\n1. Securities Exchange Board of India (hereinafter referred to as “SEBI”) vide its Circular MIRSD/DR-1/Cir-16/09 dated 6th November 2009 has allowed SEBI registered stock brokers (including trading members) of stock exchanges to provide access to clients through authorised persons. 

2. The Trading Member is a member of NSEIL and is a SEBI registered stock broker. `,

                        `\n\n3. The Authorised Person is desirous of affiliating to the Trading Member to provide access to trading platform of NSEIL in ${str2} segment as an agent of the Trading Member. 

`,
                    ]
                },
                { text: `\n`, pageBreak: 'before' },
                {
                    text: [
`4. The Trading Member has satisfied about the eligibility criteria of the Authorised Person as stipulated by SEBI and NSEIL from time to time and therefore has agreed to the request of the Authorised Person. 

5. SEBI vide the said Circular has stipulated that the stock broker and authorised person shall enter into written agreement(s) in the form(s) specified by Exchange which would inter-alia cover scope of the activities, responsibilities, confidentiality of information, commission sharing, termination clause, etc;

\n`,
                        { text: `NOW THEREFORE THIS AGREEMENT WITNESSETH AS FOLLOWS:`, bold: 'true'},
                        { text: `\n\n1. SCOPE OF THE ACTIVITIES `, bold: 'true'},
                        `\n\n(a) The Trading Member and the Authorised Person shall act as per the requirements specified by SEBI and NSEIL in its Circulars issued from time to time. 

(b) The Authorised Person hereby acknowledge and confirm that the Authorised Person is entitled to act as a ‘Authorised Person’ within the meaning and subject to SEBI Circular MIRSD/ DR-1/ Cir- 16 /09 dated November 06, 2009 and Circulars issued by SEBI and NSEIL from time to time. 

(c) The client shall be registered with Trading Member only. The funds and securities of the clients shall be settled directly between Trading Member and client and all documents like contract note, statement of funds and securities would be issued to client by Trading Member. The Authorised person may provide administrative assistance in procurement of documents and settlement, but shall not issue any document to client in its own name. No fund/securities of clients shall go to account of the Authorized Person. 

(d) All acts of omission and commission of the Authorized Person shall be deemed to be of the Trading Member.`,

                        { text: `\n\n2. RESPONSIBILLITES/OBLIGATIONS OF THE AUTHORISED PERSON`, bold: 'true', },
                        `\n\n(a) The Authorised Person shall not commit transactions in securities through the Trading Member in excess of the amount mutually agreed upon in writing from time to time. 

(b) The Authorised Person shall receive his remuneration - fees, charges, commission, salary, etc. - for his services only from the Trading Member and he/it shall not charge any amount from the clients. 

(c) The Authorised Person shall inform the Trading Member of any proposed material change in its status and constitution. 

(d) The Authorized Person shall not receive or pay any money or securities in its own name or account. All receipts and payments of securities and funds shall be in the name or account of Trading Member. 
`,
                        `
(e) The Authorised Person shall not to issue any documents like bill, confirmation memo, statement of funds/securities to the clients in its own name. 

(f) The Authorised Person agrees that the Trading Member and NSEIL would be entitled to establish any other additional control that it desires to ensure safe and secure dealing of investors with the Authorised Person. 

(g) The Authorised Person shall permit the Trading Member and NSEIL to conduct the inspection of the branch where the terminals are located and records of the operations carried out by the Authorised Person. 
`,

]
},
{text:`\n`,pageBreak:'before'},
{
    text: [
                        { text: `\n3. RIGHTS, RESPONSIBILLITES/OBLIGATIONS OF THE TRADING MEMBER`, bold: 'true',pageBreak:'before' },
                        `\n\n(a) The Trading Member shall be responsible for all acts of omission and commission of the Authorised Person and/or their employees, including liabilities arising there from. 

(b) The Trading Member shall maintain a separate record including accounts in respect of the dealings in securities entered into on behalf of the individual client’s dealing, with bifurcation showing the details by the Authorised Person. 

(c) The Trading Member shall display at the branch office additional information such as particulars of the Authorised Person in charge of that branch, time lines for dealing through Authorised Person, etc., as may be specified by NSEIL. 

(d) On noticing irregularities, if any, in the operations of the Authorised Person, the Trading Member shall be entitled to seek withdrawal of approval, withhold all moneys due to Authorised Person till resolution of investor problems, alert investors in the location where Authorised Person operates, file a complaint with the police, and take all measures required to protect the interest of investors and market. 
`,


                
                        `(e) The Trading Member shall be entitled to conduct periodic inspection of branch assigned to the Authorised Person and records of operations carried out by the Authorised Person. 
`,
                        { text: `\n4. SHARING OF COMMISSION `, bold: 'true', },
                        `\n\nThe Authorised Person shall receive such remuneration - fees, charges, commission, salary, etc. - for his services from the Trading Member as may be mutually agreed between the Authorised Person and the Trading Member from time to time. `,

                        { text: `\n\n5. TERM AND TERMINATION `, bold: 'true', },
                        `\n\n(a) The Trading Member and the Authorised person agree that irrespective of the date of the Agreement, the Authorised Person will commence business only after receipt of approval granted by NSEIL, continue business during currency of the approval and will stop business as an Authorised Person from the date of withdrawal of approval by NSEIL. 

(b) The Trading Member and the Authorised Person shall be entitled to terminate this Agreement without giving any reasons to the other party after giving notice in writing of not less than one month to the other party at its respective address mentioned above. 
`,
                        `
(c) Where the Trading Member has terminated his/its agreement with the Authorised Person, the Trading Member shall inform NSEIL. 

(d) This Agreement shall forthwith stand terminated- 

i) if the Trading Member for any reason ceases to be a member of NSEIL including by cessation of membership by reason of the Trading Member's, death, resignation, expulsion or having being declared a defaulter or if the certificate issued by the SEBI is cancelled; 
ii) upon the demise/insolvency of the Authorised Person or the withdrawal of his/its approval with NSEIL. 
iii) on being satisfied that the continuation of Authorised Person is detrimental to the interest of investors or securities market or the Authorised Person at a subsequent date becomes ineligible under clause 4 SEBI circular vide reference no. MIRSD/ DR-1/ Cir- 16 /09 dated November 06, 2009 or Circulars issued from time to time and also Circulars issued by NSEIL from time to time. 

(e) In the event of withdrawal of the Authorised Person approval, the Trading Member shall ensure that investors/general public is informed about cancellation of appointment of the Authorised Person. A public advertisement to that effect shall be required to be issued by the Trading Member in a local newspaper where the Authorised Person’s registered office, Head Office/Corporate office is situated and another in English daily newspaper with wide circulation. 
`,
                        { text: `\n6. DISPUTES `, bold: 'true', },
                        `\n\n(a) If any dispute arises between the Trading Member and the Authorised Person, the same shall be settled as per the dispute resolution mechanism in accordance with the Rules, Bye-laws and Regulations of NSEIL. 

(b) Dispute between a client and an Authorised Person shall be treated as dispute between the client and the Trading Member and the same shall be submitted for redressal to the Investor Service Cell/Arbitration mechanism of NSEIL. 
`,

                    ]
                },
                // { text: `\n`, pageBreak: 'before' },

                {
                    text: [

                        { text: `\n7. GENERAL`, bold: 'true', },

                        `\n\n(a)`,
                        { text: ` Confidential`, bold: 'true', },
                        `\n\nThe Parties shall keep confidential all information pursuant to this Agreement and save and except which may be required to be disclosed under law or on need to know basis. The disclosing Party shall inform the other concerned Party(ies) of receipt of any such communication/notice/intimation requiring such disclosure to enable the concerned Party(ies) to take appropriate action, if required.`,

                        `\n\n(b)`,
                        { text: ` Binding Effect`, bold: 'true', },
                        `\n\nThis Agreement shall be binding upon and inure to the benefit of the parties hereto and their respective legal successors. `,
                        `\n\n(c)`,
                        { text: ` Force Majeure `, bold: 'true', },
                        `\n\nNeither party shall be liable for any failure to perform any of its obligations under this Agreement if the performance is prevented, hindered or delayed by a Force Majeure Event (defined below) and in such case its obligations shall be suspended for so long as the Force Majeure Event continues. Each party shall promptly inform the other of the existence of a Force Majeure Event and shall consult together to find a mutually acceptable solution. “Force Majeure Event” means any event due to any cause beyond the reasonable control of the Trading Member and the Authorised Person, including, `,
                        `without limitation, unavailability of any communication system, breach or virus in the processes, sabotage, fire, flood, explosion, acts of God, civil commotion, strikes or industrial action of any kind, riots, insurrection, war, acts of government, computer hacking unauthorized access to computer data and storage devices, computer crashes, etc. `,
                        `\n\n(d)`,
                        { text: ` Variation `, bold: 'true', },
                        `\n\nThe Agreement shall not be altered, amended and/or modified by the Parties in a manner that shall be in a contravention of any other provisions of this Agreement. `,
                        `\n\n(e)`,
                        { text: ` Severability `, bold: 'true', },
                        `\n\nIf any provision of this Agreement is agreed by the parties to be illegal, void or unenforceable under any law that is applicable hereto or if any court of competent jurisdiction in a final decision so determines, this Agreement shall continue in force save that such provision shall be deemed to be deleted here from with effect from the date of such agreement or decision or such earlier date as the Parties may agree. `,

                        `\n\n(f)`,
                        { text: ` Interpretation  `, bold: 'true', },
                        `\n\nIn this Agreement, unless otherwise stated: - 
Words in the singular shall include the plural and vice versa; 
The headings in this Agreement are for convenience only and are not intended to have any legal effect; and Words denoting persons shall include bodies corporate, unincorporated associations and partnerships.`,
                        `\n\n(g)`,
                        { text: ` Waiver  `, bold: 'true', },
                        `\n\nA failure by either party to exercise or enforce any rights conferred upon it by this Agreement shall not be deemed to be a waiver of any such rights or operate so as to bar the exercise or enforcement thereof at any subsequent time or times. `,
                        `\n\n(h)`,
                        { text: ` Governing law and jurisdiction  `, bold: 'true', },
                        `\n\nThe construction, validity and performance of this Agreement shall be governed in all respects by the laws of India. The parties hereby submit to the exclusive jurisdiction of the Courts at Mumbai. 
IN WITNESS WHEREOF, the parties hereto have set their hands and signatures on the day, month and year first above written. 
`,
                    ]
                },
                // { text: `\n`, pageBreak: 'before' },
                {
                    text: [
                        `\nSigned for and on behalf of the`,
                        { text: ` ${entityData[0].Entity_Name}`, bold: 'true', },
                        `\nWitness: 
1. 


2. 

Signed for and on behalf of the Authorised Person 
Witness 
1. 


2. 
`,]
                },


            ]

        };
        return dd
    }
}
