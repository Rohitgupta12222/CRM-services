var connect = require('../Data/Connect');
var datamodel = require('../Data/DataModel');
var dataaccess = require('../Data/DataAccess');
var dataconn = require('../Data/DataConnection');
var commonFunc = require('../Common/CommonFunctions')
var path = require('path')
module.exports = {


    createDocDefinition: async (fileParams) => {
        let AP_Draft_General_Details = datamodel.AP_Draft_General_Details()
        let AP_Draft_Branch_Details = datamodel.AP_Draft_Branch_Details()
        let EntityMst = datamodel.EntityMst()
        let CountryMst = datamodel.CountryMst()
        let CityMst = datamodel.CityMst()
        let StateMst = datamodel.StateMst()
        let logo_img = path.join(__dirname, '/Sample1.png')



        let date = commonFunc.ConvertDateToDDMMYYYY(new Date())
        let entityData = await dataaccess.FindAll(EntityMst, { limit: 1, order: [['Id']] })

        let param = { where: { Id: Number(fileParams.apId) } }
        let apData = await dataaccess.FindOne(AP_Draft_General_Details, param)
        let apBranchDtls = await dataaccess.FindOne(AP_Draft_Branch_Details, { where: { AP_Id: Number(fileParams.apId), IsRegistered: true } })

        let age = new Date().getFullYear() - apData.DOB_INC.toString().slice(0, 10)
        let entity_Name = entityData[0].Entity_Name;
        let country = {};
        let city = {};
        let state = {};
    
        if (apBranchDtls) {
            if (apBranchDtls.Country_Code_ID) {
                country = await dataaccess.FindOne(CountryMst, { where: { Id: apBranchDtls.Country_Code_ID } })
            } else {
                country.Country_Name = ' ';
            }
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
            b = ((apBranchDtls.Address_1 == null ? ' ' : apBranchDtls.Address_1) + ', ' + (apBranchDtls.Address_2 == null ? ' ' : apBranchDtls.Address_2) + ', ' + (city.City_name == null ? ' ' : city.City_name) + ', ' + (state.State_Name == null ? ' ' : state.State_Name) + '-' + (apBranchDtls.Pin_Code == null ? ' ' : apBranchDtls.Pin_Code) + ', ' + (country.Country_Name== null ?' ':country.Country_Name)).toUpperCase()
        } else {
            b = '';
        }
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
                                    image: logo_img,
                                    fit: [100, 100],
                                    alignment: 'left'
                                },
                                {
                                    text: `${entity_Name}`,
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

                    text: `to circular No. NCDEX/COMPLIANCE-017/2019 April 15, 2019`, alignment: 'center'

                },
                { text: `\nANNEXURE VI`, style: 'header', alignment: 'center' },

                {
                    text: `\nMember and Authorised Person Agreement`, style: 'header', alignment: 'center'
                },
                {
                    text: [
                        `\n\nThis Agreement is entered into this _______ day of ________ 20__ at ________ between `,
                        { text: `${entityData[0].Entity_Name}`, bold: 'true', },
                        `, Member of National Commodity & Derivatives Exchange Ltd. (hereinafter referred to as “NCDEX” or “EXCHANGE”), ordinarily carrying on business in sale and purchase of commodity derivatives/securities in the name and style of `,
                        { text: `${entityData[0].Entity_Name}`, bold: 'true', }, ` from`, { text: ` July 11, 2019`, bold: 'true', },
                        ` (hereinafter referred to as "the Trading Member") and having his/its office/registered office at`,
                        { text: ` ${entityData[0].RegisteredAddress}`, bold: 'true', },
                        ` (which expression shall, unless repugnant to the context or meaning thereof, be deemed to mean and include his/her heirs, executors, administrators and legal representatives/the partners for the time being of the said entity, the survivor or survivors of them and their respective heirs, executors, administrators and legal representatives/its successors, as the case may be, of the `,
                        { text: `One Part;`, bold: 'true' },
                        { text: `\n\nAND\n\n`, bold: 'true', alignment: 'center' }
                    ]
                },
                {
                    text: [
                        {
                            text: `${apData.Account_Name== null ? ' ' :apData.Account_Name.toUpperCase()}`, bold: 'true'
                        },
                        ` a individual/partnership firm/LLP/body corporate desirous of providing access to the trading platform of NCDEX as an agent of the Trading Member in the Commodity derivatives segment in the name and style of `,
                        { text: `${apData.Trade_Name== null ? ' ' :apData.Trade_Name.toUpperCase()}.`, bold: 'true' }, ` (hereinafter referred to as "the Authorised Person") and having his/its office/registered office at `,
                        { text: `${b}`, bold: 'true' },
                        ` which expression shall, unless repugnant to the context or meaning thereof, be deemed to mean and include his/her heirs, executors, administrators and legal representatives/the partners for the time being of the said entity, the survivor or survivors of them and their respective heirs, executors, administrators and legal representatives/its successors, as the case may be, of the`,
                        { text: ` Other Part;`, bold: 'true' },
                        { text: `\n\nWHEREAS,`, bold: 'true' }
                    ]
                },
                {
                    text: `
            1. Securities Exchange Board of India (hereinafter referred to as “SEBI”) vide its Circular MIRSD/DR-1/Cir-16/09 dated 6th November 2009 has allowed SEBI registered stock brokers (including trading members) of stock exchanges to provide access to clients through Authorised Persons.
        
            2. The Trading Member is a member of NCDEX and is a SEBI registered Member/broker 
        
            3. The Authorised Person is desirous of affiliating to the Trading Member to provide access to trading platform of NCDEX in Commodity Derivatives/Securities as an agent of the Trading Member. 
        
            4. The Authorised person understands that it shall not be entitled to become an Authorised Person of any other member of the Exchange during the subsistence of this agreement. 
        
            5. The Trading Member has satisfied about the eligibility criteria of the Authorised Person as stipulated by SEBI and NCDEX from time to time and therefore has agreed to the request of the Authorised Person. 
        
            6. SEBI vide the said Circular has stipulated that the Member/broker and Authorised Person shall enter into written agreement(s) in the form(s) specified by Exchange which would interalia cover scope of the activities, responsibilities, confidentiality of information, commission sharing, termination clause, etc.; `},

                { text: '\nNOW THEREFORE THIS AGREEMENT WITNESSETH AS FOLLOWS: ', style: 'altStyle' },
                {
                    text: [

                        { text: `\n1. `, style: 'altStyle' },
                        { text: `SCOPE OF THE ACTIVITIES`, style: 'defaultStyle' },

                        `\n\n(a) The Trading Member and the Authorised Person shall act as per the requirements specified by SEBI and NCDEX. 
        
        (b) The Trading Member and the Authorised Person shall be governed by the NCDEX Bye-Laws and Regulations and its amendments thereto and the Circulars issued from time to time. 
        
        (c) The Authorised Person hereby acknowledge and confirm that the Authorised Person is entitled to act as a ‘Authorised Person’ within the meaning and subject to SEBI Circular MIRSD/ DR-1/ Cir- 16 /09 dated November 06, 2009 and Circulars issued by SEBI and NCDEX from time to time. 
        
        (d) All the clients dealing through the Authorised Person shall be registered with Trading Member only and for all purposes shall be clients of the Member. The funds and securities of the clients shall be settled directly between Trading Member and client and all documents like contract note, statement of funds and securities would be issued to client by Trading Member. The Authorised person may provide administrative assistance in procurement of documents and settlement, but shall not issue any document to client in its own name. No fund/securities of clients shall go to account of the Authorised Person. 
        
        (e) All acts of omission and commission of the Authorised Person shall be deemed to be of the Trading Member. 
        
        (f) The Trading Member as well as the Authorised Person shall not do or omit to do anything that is likely to affect or harm the interests of clients of the Trading Member. ‘ 
        
        (g) All documents like contract notes, statement of funds and commodities, etc. as required under the Rules, Bye-laws and Regulations of the Exchange shall be issued by the Trading Member to the client. The Authorised Person shall, if required by the Member, provide administrative assistance in procurement of documents and settlement, but shall not issue any document to the client in its own name. 
        
        (h) The Member and Authorised Person shall reconcile their accounts at the end of every month with reference to all trades and settlements during the month. 
        
        `,
                        { text: '2. ', style: 'altStyle' },
                        { text: 'RESPONSIBILLITES/OBLIGATIONS OF THE AUTHORISED PERSON ', style: 'defaultStyle' },

                        `\n\n(a) The Authorised Person shall not place any order on behalf of any person unless all the ‘Know Your Customer’ documents prescribed by the Exchange or the SEBI including Trading Member and Constituent Agreement/Undertaking, Client Registration Form and Risk Disclosure Documents are obtained from such person. The Authorised Person shall ensure that the client has duly signed all the documents and shall also witness the KYC documents submitted by the client and retain a copy for its record. 
        
        (b) The Authorised Person shall not commit transactions in commodity derivatives/securities through the Trading Member in excess of the amount mutually agreed upon in writing from time to time. 
        
        (c) The Authorised Person shall receive his remuneration - fees, charges, commission, brokerage, salary, etc. - for his services only from the Trading Member as mutually agreed between the Trading Member and Authorised Person and he/it shall not charge any amount from the clients. 
        
        (d) The Authorised Person shall inform the Trading Member of any proposed material change in its status and constitution and shall not make any change/s in the status, constitution, shareholding, partners or directors or place of business without obtaining prior written approval of the Trading Member who in turn shall apply and obtain approval for any such change from the NCDEX. 
        
        (e) The Authorised Person shall not receive or pay any money or commodities in its own name or account. All receipts and payments of commodities and funds shall be in the name or account of Trading Member. 
        
        (f) The Authorised Person shall not issue any documents like bill, confirmation memo and statement of funds/commodities to the clients in its own name. 
        
        (g) The Authorised Person agrees that the Trading Member and NCDEX would be entitled to establish any other additional control that it desires to ensure safe and secure dealing of investors with the Authorised Person. 
        
        (h) The Authorised Person shall not indulge in any deceptive, fraudulent or manipulative trade practices and shall not destabilize market equilibrium. 
        
        (i) The Authorised Person shall permit the Trading Member, SEBI and NCDEX or the persons authorized by them, to conduct the inspection of the branch where the terminals are located and records of the operations carried out by the Authorised Person. 
        
        (j) The Authorised Person understands and agreed that it shall not disclose or divulge to any person, any details of investment or personal details of confidential nature of the clients or their transactions and dealings except to the Trading Member, the Exchange or Officials of the Regulatory Authority under applicable Law or in compliance of any statutory obligation. 
         `,

                        { text: `\n3. `, style: 'altStyle' },
                        { text: `RIGHTS, RESPONSIBILLITES/OBLIGATIONS OF THE TRADING MEMBER`, style: 'defaultStyle' },

                        `\n\n(a) The Trading Member shall be responsible for all acts of omission and commission of the Authorised Person and/or their employees, including liabilities arising there from. 
        
        (b) The Trading Member shall maintain a separate record including accounts in respect of the dealings in commodity derivatives /securities entered into on behalf of the individual client’s dealing, with bifurcation showing the details by the Authorised Person. 
        
        (c) The Trading Member shall upload the details of clients pertaining to Unique Client Code as prescribed by the Exchange and the Authorised Person shall not create or allot any other Unique Client Code to any client at any point of time. 
        
        (d) The Trading Member shall be responsible to the Exchange and to the clients for all transactions of the clients entered through the Authorised Person and to ensure settlement of all such trades and to comply with all the requirements thereto in accordance with Rules, Bye Laws and Regulations of the Exchange and the directives of SEBI. 
        
        (e) The Trading Member shall be entitled to fix the limit on the volume of trades that may be entered by the Authorised Person and such limit may be reduced or increased as the Member may deem fit during the course of business subject however, to the procedure and terms if any, set by NCDEX 
        
        (f) The Trading Member shall display at the branch office additional information such as particulars of the Authorised Person in charge of that branch, time lines for dealing through Authorised Person, etc., as may be specified by NCDEX. 
        
        (g) On noticing irregularities, if any, in the operations of the Authorised Person, the Trading Member shall be entitled to seek withdrawal of approval, withhold all moneys due to Authorised Person till resolution of investor problems, alert investors in the location where Authorised Person operates, file a complaint with the police, and take all measures required to protect the interest of investors and commodity derivatives/securities market. 
        
        (h) The Trading Member shall be entitled to conduct inspection of premises of the Authorised Person, operations carried out by the Authorised Person and all the records including records in electronic formats, at such periodicity as deemed appropriate by the Member or as may be stipulated by NCDEX or SEBI from time to time. 
        `,

                        { text: `\n\n4. `, style: 'altStyle' },
                        { text: `SHARING OF COMMISSION`, style: 'defaultStyle' },

                        `\n\nThe Authorised Person shall receive such remuneration - fees, charges, commission, salary, etc. - for his services from the Trading Member as may be mutually agreed between the Authorised Person and the Trading Member from time to time. `,
                        { text: `\n\n5. `, style: 'altStyle' },
                        { text: `TERM AND TERMINATION`, style: 'defaultStyle' },

                        `\n\n(a) The Trading Member and the Authorised person agree that irrespective of the date of the Agreement, the Authorised Person will commence business only after receipt of approval granted by 
        NCDEX, continue business during currency of the approval and will stop business as an Authorised Person from the date of withdrawal of approval by NCDEX. 
        
        (b) The Trading Member and the Authorised Person shall be entitled to terminate this Agreement without giving any reasons to the other party after giving notice in writing of not less than one month to the other party at its respective address mentioned above. 
        
        (c) Where the Trading Member has terminated his/its agreement with the Authorised Person, the Trading Member shall inform NCDEX forthwith of such termination. 
        
        (d) This Agreement shall forthwith stand terminated\n\n`,
                    ]},
        
        {
            style: 'tableExample',
            layout: 'noBorders',
            table: {

                widths: [15, '*'],
                body: [
                    [{ text: `i)`, alignment: 'right' }, { text: `if the Trading Member for any reason ceases to be a member of NCDEX including by mcessation of membership by reason of the Trading Member's, death, resignation, expulsion or having being declared a defaulter or if the certificate issued by the SEBI is cancelled;` }],
                    [{ text: `ii)`, alignment: 'right' }, { text: `upon the demise/insolvency of the Authorised Person or the withdrawal of his/its approval with NCDEX.` }],
                    [{ text: `iii)`, alignment: 'right' }, { text: `on being satisfied that the continuation of Authorised Person is detrimental to the interest of investors or commodity derivatives/securities market or the Authorised Person at a subsequent date becomes ineligible under clause 4 SEBI circular vide reference no. MIRSD/ DR-1/ Cir- 16 /09 dated November 06, 2009 or Circulars issued from time to time and also Circulars issued by NCDEX from time to time.` }],
                    ]

        },
        margin: [20, 0, 0, 0]
    },
        
       {
    text: [
        `\n(e) In the event of withdrawal of the Authorised Person approval, the Trading Member shall ensure that investors / general public is informed about cancellation / suspension / termination of appointment of the Authorised Person.A public advertisement to that effect shall be required to be issued by the Trading Member in a local newspaper where the Authorised Person’s registered office, Head Office / Corporate office is situated and another in English daily newspaper with wide circulation.The Exchange shall also be entitled to issue notification to the public through any media about such cancellation / termination / suspension. 
        
        (f) Notwithstanding any such cancellation / termination / suspension under clauses mentioned herein, all rights, liabilities and obligations of the parties arising out of or in respect of transactions entered prior to the termination of this Agreement shall continue to subsist and vest in /be binding on the respective parties, their legal heirs/ representatives, executors, administrators, successors and attorneys as the case may be and the Member shall be entitled to withhold all moneys due to the Authorised Person till resolution of all clients grievances, alerts clients in the location where the Authorised Person operates and take all such measures as may be required to protect the interests of the clients and the market 
            `,
            { text: `\n6. `, style: 'altStyle' },
            { text: `DISPUTES `, style: 'defaultStyle' },

                `\n\n(a) The Member and the Authorised Person shall co - operate with each other in settling complaints pertaining to trades, clearing, settlement and delivery etc.in respect of the commodities delivered / to be delivered, received / to be received by the clients from the Member or vice - versa. 
        
        (b) If any dispute arises between the Trading Member and the Authorised Person, then in such an event the Trading Member and Authorised person shall be responsible to each other for their acts of omissions and negligence, if any.Further, the directives of SEBI and the Bye - laws and Regulations of NCDEX applicable, if any, shall apply. 
        
        (c) Dispute between a client and an Authorised Person shall be treated as dispute between the client and the Trading Member and the same shall be submitted for redressal to the Investor Service Cell / Arbitration mechanism of NCDEX in accordance with the Rules, Bye - laws and Regulations of NCDEX and any directives issued by SEBI. 
         `

                ,
                {text: `\n7. `, style: 'altStyle'},
                {text: `COMMON COVENANTS: `, style: 'defaultStyle'},

                `\n\n(a) The Member and the Authorised Person shall be responsible for their respective statutory liabilities like income tax, PF of its employees etc. 
        
        (b) The Authorised Person declares that it is authorised under the law to enter into this Agreement and to do the business contemplated hereunder. 
        
        (c) This Agreement shall be subject to the Rules, Bye - Laws and Regulations of the NCDEX including any amendments thereof and shall be governed by the provisions of SCRA and SEBI Regulations and Directives issued thereunder and the laws of India. 
         `

                ,
                {text: `\n8. `, style: 'altStyle'},
                {text: `GENERAL`, style: 'defaultStyle'},

                { text: `\n\n(a) Confidential`, style: 'altStyle' },

                `\n\nThe Parties shall keep confidential all information pursuant to this Agreement and save and except which may be required to be disclosed under law or on need to know basis.The disclosing Party shall inform the other concerned Party(ies) of receipt of any such Communication / notice / intimation requiring such disclosure to enable the concerned Party(ies) to take appropriate action, if required.`,


                { text: `\n\n(b) Binding Effect`, style: 'altStyle' },

                `\n\nThis Agreement shall be binding upon and inure to the benefit of the parties hereto and their respective legal successors.`,

                { text: `\n\n(c) Force Majeure`, style: 'altStyle' },

                `\n\nNeither party shall be liable for any failure to perform any of its obligations under this Agreement if the performance is prevented, hindered or delayed by a Force Majeure Event(defined below) and in such case its obligations shall be suspended for so long as the Force Majeure Event continues.Each party shall promptly inform the other of the existence of a Force Majeure Event and shall consult together to find a mutually acceptable solution. “Force Majeure Event” means any event due to any cause beyond the reasonable control of the Trading Member and the Authorised Person, including, without limitation, unavailability of any communication system, breach or virus in the processes, sabotage, fire, flood, explosion, acts of God, civil commotion, strikes or industrial action of any kind, riots, insurrection, war, acts of government, computer hacking unauthorized access to computer data and storage devices, computer crashes, etc.`,


                { text: `\n\n(d) Variation`, style: 'altStyle' },

                `\n\nThe Agreement shall not be altered, amended and / or modified by the Parties in a manner that shall be in a contravention of any other provisions of this Agreement.`,

                { text: `\n\n(e) Severability`, style: 'altStyle' },

                `\n\nIf any provision of this Agreement is agreed by the parties to be illegal, void or unenforceable under any law that is applicable hereto or if any court of competent jurisdiction in a final decision so determines, this Agreement shall continue in force save that such provision shall be deemed to be deleted here from with effect from the date of such agreement or decision or such earlier date as the Parties may agree.`,

                { text: `\n\n(f) Interpretation`, style: 'altStyle' },

                `\n\nIn this Agreement, unless otherwise stated: - Words in the singular shall include the plural and vice versa; The headings in this Agreement are for convenience only and are not intended to have any legal effect; and Words denoting persons shall include bodies corporate, unincorporated associations and partnerships.`,

                { text: `\n\n(g) Waiver`, style: 'altStyle' },

                `\n\nA failure by either party to exercise or enforce any rights conferred upon it by this Agreement shall not be deemed to be a waiver of any such rights or operate so as to bar the exercise or enforcement thereof at any subsequent time or times.`,

                { text: `\n\n(h) Governing law and jurisdiction`, style: 'altStyle' },

                `\n\nThe construction, validity and performance of this Agreement shall be governed in all respects by the laws of India.The parties hereby submit to the exclusive jurisdiction of the Courts at Mumbai. 
        
        IN WITNESS WHEREOF, the parties hereto have set their hands and signatures on the day, month and year first above written.`,
            ]},
                {text:`\n`, pageBreak:'before'},
                `Signed for and on behalf of the Trading Member
    Witness:

    1.





    2. 
        
        
        
        
        
        Signed for and on behalf of the Authorised Person
    Witness

    1.





    2.





        `,





            ],

            styles: {

                header: {

                    fontSize: 12,

                    bold: true,

                    alignment: 'center'

                },

                defaultStyle: {

                    bold: true,

                    decoration: 'underline',

                    alignment: 'left'

                },

                altStyle: {

                    bold: true,

                    alignment: 'left'

                },

                rightStyle: {

                    bold: true,

                    alignment: 'right'

                }

            }

        };
        return dd
    }
}
