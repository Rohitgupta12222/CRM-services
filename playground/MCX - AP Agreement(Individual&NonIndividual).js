var commonFunction = require('../Common/CommonFunctions');
var connect = require('../Data/Connect');
var datamodel = require('../Data/DataModel');
var dataaccess = require('../Data/DataAccess');
var dataconn = require('../Data/DataConnection');
var path = require('path')
module.exports = {
    createDocDefinition: async (fileParams) => {
        let logo_img = path.join(__dirname, '/Sample1.png')
        let AP_Draft_General_Details = datamodel.AP_Draft_General_Details()
        let AP_Draft_Branch_Details = datamodel.AP_Draft_Branch_Details()
        let EntityMst = datamodel.EntityMst()
        let CountryMst = datamodel.CountryMst()
        let StateMst = datamodel.StateMst()
        let CityMst = datamodel.CityMst()

        //currently fetching only top row as entity id is not added in general table
        let entity_Data = await dataaccess.FindAll(EntityMst, { limit: 1, order: [['Id']] })
        let entity_Name = entity_Data[0].Entity_Name;
        let entity_RegAdd = entity_Data[0].RegisteredAddress;
        let entity_CorpAdd = entity_Data[0].CorporateAddress;
        let entity_regno_sebi = entity_Data[0].SebiRegistrationNo;
        let entity_memberid_mcx = entity_Data[0].MCX_MemberId;

        let apData = await dataaccess.FindOne(AP_Draft_General_Details, { where: { Id: fileParams.apId } })
        let apBranchDtls = await dataaccess.FindOne(AP_Draft_Branch_Details, { where: { AP_Id: Number(fileParams.apId), IsRegistered: true } })

        let country = {};
        let state = {};
        let city = {};
        if (apBranchDtls) {
            if (apBranchDtls.Country_Code_ID) {
                country = await dataaccess.FindOne(CountryMst, { where: { Id: apBranchDtls.Country_Code_ID } })
            } else {
                country.Country_Name = ' ';
            }
            if (apBranchDtls.State_Code) {
                state = await dataaccess.FindOne(StateMst, { where: { Id: apBranchDtls.State_Code } })
            } else {
                state.State_Name = ' ';
            }
            if (apBranchDtls.City_Code) {
                city = await dataaccess.FindOne(CityMst, { where: { Id: apBranchDtls.City_Code } })
            } else {
                city.City_name = ' ';
            }
        }
        let b;
        if (apBranchDtls) {
            b = ((apBranchDtls.Address_1 == null ? ' ' : apBranchDtls.Address_1) + ', ' + (apBranchDtls.Address_2 == null ? ' ' : apBranchDtls.Address_2) + ', ' + (city.City_name == null ? ' ' : city.City_name) + ', ' + (state.State_Name == null ? ' ' : state.State_Name) + '-' + (apBranchDtls.Pin_Code == null ? ' ' : apBranchDtls.Pin_Code) + ', ' + (country.Country_Name == null ? ' ' : country.Country_Name)).toUpperCase()
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
                    text: '(To be on a non-judicial stamp paper of minimum Rs. 100)',
                    alignment: 'center',
                    color: '#919191'
                },
                {
                    text: [
                        { text: `\nAP-6`, alignment: 'center', bold: 'true' },
                        { text: `\n\nMEMBER AND AUTHORISED PERSON AGREEMENT`, bold: 'true', alignment: 'center' }
                    ]
                },
                {
                    text: [
                        { text: `\n\nThis Agreement is entered into this _______ day of ________ 20__ at ________ between `, },
                        { text: `${entity_Name}`, bold: 'true', decoration: 'underline' }, { text: ` Member of Multi Commodity Exchange of India Ltd. (hereinafter referred to as “MCX”), ordinarily carrying on business of dealing in commodities derivatives contracts in the name and style of  ` },
                        { text: `${entity_Name}`, bold: 'true', decoration: 'underline' },
                        { text: ` from ` },
                        { text: `June 01, 2019 `, bold: 'true' },
                        { text: `(hereinafter referred to as "the Member") and having his/its office/registered office at ` },
                        { text: `${entity_RegAdd}`, bold: 'true' },
                        { text: ` (address) which expression shall, unless repugnant to the context or meaning thereof, be deemed to mean and include his/her heirs, executors, administrators and legal representatives/the partners for the time being of the said entity, the survivor or survivors of them and their respective heirs, executors, administrators and legal representatives/its successors, as the case may be, of the ` },
                        { text: `One Part; `, bold: 'true' },

                        { text: `\n\nAND\n\n`, bold: 'true', alignment: 'center', },
                        { text: `${apData.Account_Name == null ? ' ' : apData.Account_Name.toUpperCase()}`, decoration: 'underline', bold: 'true' }, ` an individual/partnership firm/LLP/body corporate desirous of providing access to MCX as an agent of the Member in the Commodities derivatives contracts in the name and style of `,
                        { text: `${apData.Trade_Name == null ? ' ' : apData.Trade_Name.toUpperCase()}`, decoration: 'underline', bold: 'true' },
                        { text: ` (hereinafter referred to as "the Authorised Person".) and having his/its office/registered office at ` },
                        { text: `${b}`, bold: 'true' },
                        { text: ` which expression shall, unless repugnant to the context or meaning thereof, be deemed to mean and include his/her heirs, executors, administrators and legal representatives/the partners for the time being of the said entity, the survivor or survivors of them and their respective heirs, executors, administrators and legal representatives/its successors, as the case may be, of the` },
                        { text: `Other Part;`, bold: 'true' },
                        { text: `\n\nWHEREAS,`, bold: 'true' },
                        {
                            text: `\n\n1. Securities And Exchange Board of India (hereinafter referred to as “SEBI”) vide its Circular no. MIRSD/DR-1/Cir-16/09 dated November 6, 2009 has allowed registered members of Commodities Exchanges to provide access to clients through authorised persons.`
                        },
                        {
                            text: `\n\n2. The Member is a member of MCX with member id `
                        },
                        { text: `${entity_memberid_mcx == null ? ' ' : entity_memberid_mcx.toUpperCase()} `, bold: 'true' },
                        { text: `and Unique Member Code/SEBI Registration No ` },
                        { text: `${entity_regno_sebi == null ? ' ' : entity_regno_sebi.toUpperCase()}`, bold: 'true', alignment: 'justify' },
                        {
                            text: `\n\n3. The Authorised Person is desirous of affiliating to the Member to provide access to MCX as an agent of the Member.`
                        }
                    ]
                },
                // { text: `\n`, pageBreak: 'before' },
                {
                    text: [
                        {
                            text: `\n\n4. The Member has satisfied itself about the eligibility criteria, infrastructure requirement, conditions of appointment of the Authorised Person as stipulated by SEBI and MCX from time to time and therefore has agreed to the request of the Authorised Person. Further, the Member also undertakes to fulfil the obligations as mentioned in clause (7) of the SEBI circular no. MIRSD/DR-1/Cir-16/09 dated November 6, 2009 on “Regulatory Framework for Market Access through Authorised Person in Commodity Futures Market” or such obligations for the members as may be prescribed by SEBI/MCX from time to time.`
                        },
                        {
                            text: `\n\n5. SEBI vide the said Circular has stipulated that the Member and authorised person shall enter into written agreement(s) in the form(s) specified by Exchange which would inter-alia cover scope of the activities, responsibilities, confidentiality of information, commission sharing, termination clause, etc;`
                        },
                        {
                            text: `\n\nNOW THEREFORE THIS AGREEMENT WITNESSETH AS FOLLOWS:`
                        },
                        {
                            text: `\n\n1. SCOPE OF THE ACTIVITIES`, bold: 'true'
                        },
                        {
                            text: `\n\n(a) The Member and the Authorised Person shall act as per the requirements specified by SEBI and MCX in its circulars / directives issued from time to time.`
                        },
                        {
                            text: `\n\n(b) The Authorised Person hereby acknowledge and confirm that the Authorised Person is entitled to act as a ‘Authorised Person’ within the meaning and subject to SEBI Circular no. MIRSD/DR-1/Cir-16/09 dated November 6, 2009 and circulars / directives issued by SEBI and MCX from time to time.`
                        },
                        {
                            text: `\n\n(c) The client shall be registered with Member only. The funds, monies, commodities or warehouse receipts, of the clients, as the case may be shall be settled directly between Member and client and all documents like contract note, statement of funds and commodities would be issued to client by Member. The Authorised Person may provide only administrative assistance in procurement of documents and settlement, but shall not issue any document including contract notes, statement of funds and commodities, to client in its own name. No fund/commodities of clients shall go to account of the Authorized Person.`
                        },
                        {
                            text: `\n\n(d) All acts of omission and commission of the Authorized Person shall be deemed to be of the Member.`
                        },
                        {
                            text: `\n\n2. RESPONSIBILLITES/OBLIGATIONS OF THE AUTHORISED PERSON`, bold: 'true'
                        },
                        {
                            text: `\n\n(a) The Authorised Person shall not commit transactions through the Member in excess of the amount mutually agreed upon in writing from time to time.`
                        },
                        {
                            text: `\n\n(b) The Authorised Person shall receive his remuneration - fees, charges, commission, salary, etc. - for his services only from the Member and he/it shall not charge any amount from the clients.`
                        },
                        {
                            text: `\n\n(c) The Authorised Person shall inform the Member of any proposed change in directors/partners, change in its status and constitution, change in shareholding/sharing pattern along with the details of the proposed changes at least 45 days in advance in the format prescribed by the Exchange.`
                        },
                        {
                            text: `\n\n(d) The Authorized Person shall not receive or pay any money or commodities in its own name or account. All receipts and payments of commodities and funds shall be in the name or account of Member.`
                        },
                        {
                            text: `\n\n(e) The Authorised Person shall not issue any documents like contract notes, statement of funds/commodities to the clients in its own name.`
                        },
                        {
                            text: `\n\n(f) The Authorised Person agrees that the Member and MCX would be entitled to establish any other additional control that it desires to ensure safe and secure dealing of clients with the Authorised Person.`
                        },
                        {
                            text: `\n\n(g) The Authorised Person shall permit the Member, MCX and/or SEBI to conduct the inspection of the branch where the terminals are located and records of the operations carried out by the Authorised Person.`
                        }
                    ]
                },
                // { text: `\n`, pageBreak: 'before' },
                {
                    text: [
                        {
                            text: `\n3. RIGHTS, RESPONSIBILLITES/OBLIGATIONS OF THE MEMBER`, bold: 'true'
                        },
                        {
                            text: `\n\n(a) The Member shall be solely responsible for all acts of omission and commission of the Authorised Person and/or their employees, including liabilities arising there from. However, between Member and the Authorised Person, the parties shall be responsible to each other for their acts, omissions and negligence if any.`
                        },
                        {
                            text: `\n\n(b) The Member shall ensure that Authorised Person is permitted to admit or introduce clients and accept orders from the clients on their behalf only after execution of the agreement.`
                        },
                        {
                            text: `\n\n(c) The Member shall maintain a separate record including accounts in respect of the dealings in commodities entered into on behalf of the individual client’s dealing, with bifurcation showing the details routed through the Authorised Person.`
                        },
                        {
                            text: `\n\n(d) The Member shall ensure that no orders are executed at Authorised person’s end before all documents as prescribed by the Exchange or the SEBI, as the case may be, including, Client Registration Form and Risk Disclosure Document are obtained from /given to each such client.`
                        },
                        {
                            text: `\n\n(e) The Member shall be responsible for uploading of the details pertaining to unique client code (UCC). Further the Authorised Person cannot create or allot unique client code to any client.`
                        },
                        {
                            text: `\n\n(f) The Member shall treat the office provided to Authorised Person as branch in case trading terminal(s) is/are provided to the Authorised Person.`
                        },
                        {
                            text: `\n\n(g) The Member shall display at the branch office additional information such as particulars of the Authorised Person in charge of that branch, terms and conditions of its appointment, time lines for dealing through Authorised Person, etc., as may be specified by MCX/SEBI from time to time.`
                        },
                        {
                            text: `\n\n(h) The Member shall notify changes, if any, in the Authorised Person to all registered clients of that branch at least 15 days before such change.`
                        },
                        {
                            text: `\n\n(i) On noticing irregularities, if any, in the operations of the Authorised Person, the Member shall be entitled to seek withdrawal of approval, withhold all moneys due to Authorised Person till resolution of client grievances, alert clients in the location where Authorised Person operates, file a complaint with the police, and take all measures required to protect the interest of clients and market.`
                        },
                        {
                            text: `\n\n(j) The Member shall be entitled to conduct periodic inspection of branch/branches assigned to the Authorised Person and records of operations carried out by the Authorised Person. The copies of such inspection shall be kept by the Member for inspection by MCX and/ or SEBI, if required.`
                        },
                        {
                            text: `\n\n(k) The Member shall be entitled to audit the records of the Authorised Person to ensure that it complies with all Rules, Byelaws, Business Rules, directions and circulars issued by the Exchange from time to time.`
                        },
                        {
                            text: `\n\n(l) The Member shall intimate the Exchange any, change in status and/or constitution, including change in partners/ directors, change in shareholding/sharing pattern of Authorised Person along with the details of the proposed change at least 30 days in advance in the format prescribed by the Exchange.`
                        },
                        {
                            text: `\n\n(m) The Member shall provide such information / documents as mentioned in 3 (d) and 3(e) above during their audit / inspection or as and when required by Exchange or the SEBI.`
                        },
                        {
                            text: `\n\n4. SHARING OF COMMISSION`, bold: 'true'
                        },
                        { text: `\n\nThe Authorised Person shall receive such remuneration - fees, charges, commission, salary, etc. - for his services only from the Member as may be mutually agreed between the Authorised Person and the Member from time to time and shall not charge any amount under whatever head from the clients of the Member. ` }
                    ]
                },
                // { text: `\n`, pageBreak: 'before' },
                {
                    text: [
                        {
                            text: `\n5. TERM AND TERMINATION`, bold: 'true'
                        },
                        {
                            text: `\n\n(a) The Member and the Authorised person agree that irrespective of the date of the Agreement, the Authorised Person will commence business only after receipt of approval granted by MCX, continue business during currency of the approval and will stop business as an Authorised Person from the date of withdrawal of approval by MCX.`
                        },
                        {
                            text: `\n\n(b) The Member and the Authorised Person shall be entitled to terminate this Agreement without giving any reasons to the other party after giving notice in writing of not less than one month to the other party at its respective address mentioned above. Where the Member has terminated his/its agreement with the Authorised Person, the Member shall inform MCX simultaneously whenever notice for such termination is issued.`
                        },
                        {
                            text: `\n\n(c) This Agreement shall forthwith stand terminated-`
                        }
                    ]
                },
                '\n',
                {
                    style: 'tableExample',
                    layout: 'noBorders',
                    table: {
                        widths: [10, '*'],
                        body: [
                            [{ text: `•`, alignment: 'center' }, { text: `if the Member for any reason ceases to be a member of MCX including by cessation of membership by reason of the Member's, death, resignation, expulsion or having being declared a defaulter;` }],
                            [{ text: `•`, alignment: 'center' }, { text: `upon the demise/insolvency of the Authorised Person or the withdrawal of his/its approval with MCX.` }],
                            [{ text: `•`, alignment: 'center' }, { text: `on being satisfied that the continuation of Authorised Person is detrimental to the interest of clients or commodities market or the Authorised Person at a subsequent date becomes ineligible under clause (6) of SEBI circular reference no. MIRSD/DR-1/Cir-16/09 dated November 6, 2009 or Circulars issued from time to time and also Circulars issued by MCX/SEBI from time to time.` }]
                        ]
                    }
                },
                {
                    text: [
                        {
                            text: `\n(d) In the event of withdrawal of the Authorised Person approval, the Member shall ensure that clients/general public is informed about cancellation of appointment of the Authorised Person. A public advertisement to that effect shall be required to be issued by the Member in a local newspaper where the Authorised Person’s registered office, Head Office/Corporate office is situated and another in English daily newspaper with wide circulation, at least 15 days prior to termination of such agreement with Authorised Person. Copy(ies) of such advertisement should also be retained by the Member for its record.`
                        },
                        {
                            text: `\n\n6. DISPUTES`, bold: 'true'
                        },
                        {
                            text: `\n\n(a) If any dispute arises between the Member and the Authorised Person, the same shall be settled as per the dispute resolution mechanism in accordance with the Rules, Bye-laws and Business Rules of MCX and or SEBI or circulars as may be issued from time to time by MCX/ SEBI.`
                        },
                        {
                            text: `\n\n(b) Dispute between a client and an Authorised Person shall be treated as dispute between the client and the Member and the same shall be submitted for redressal to the Investor Grievance Cell/Arbitration mechanism of MCX and will be dealt in accordance with the Rules, Bye-laws and Business Rules of MCX and or SEBI and in accordance with the SEBI circular no. MIRSD/DR-1/Cir-16/09 dated November 6, 2009 or circulars as may be issued from time to time by MCX/SEBI.`
                        }
                    ]
                },
                // { text: `\n`, pageBreak: 'before' },
                {
                    text: [
                        {
                            text: `\n7. GENERAL`, bold: 'true'
                        },
                        {
                            text: `\n\n(a) Confidential`, bold: 'true'
                        },
                        { text: `\nThe Parties shall keep confidential all information pursuant to this Agreement and save and except which may be required to be disclosed under law or on need to know basis. The disclosing Party shall inform the other concerned Party(ies) of receipt of any such communication/notice/intimation requiring such disclosure to enable the concerned Party(ies) to take appropriate action, if required. ` },
                        {
                            text: `\n\n(b) Binding Effect`, bold: 'true'
                        },
                        {
                            text: `\nThis Agreement shall be binding upon and inure to the benefit of the parties hereto and their respective legal successors.`
                        },
                        {
                            text: `\n\n(c) Force Majeure`, bold: 'true'
                        },
                        {
                            text: `\nNeither party shall be liable for any failure to perform any of its obligations under this Agreement if the performance is prevented, hindered or delayed by a Force Majeure Event (defined below) and in such case its obligations shall be suspended for so long as the Force Majeure Event continues. Each party shall promptly inform the other of the existence of a Force Majeure Event and shall consult together to find a mutually acceptable solution. “Force Majeure Event” means any event due to any cause beyond the reasonable control of the Member and the Authorised Person, including, without limitation, unavailability of any communication system, breach or virus in the processes, sabotage, fire, flood, explosion, acts of God, civil commotion, strikes or industrial action of any kind, riots, insurrection, war, acts of government, computer hacking unauthorized access to computer data and storage devices, computer crashes, etc.`
                        },
                        {
                            text: `\n\n(d) Variation`, bold: 'true'
                        },
                        {
                            text: `\nThe Agreement shall not be altered, amended and/or modified by the Parties in a manner that shall be in a contravention of any other provisions of this Agreement.`
                        },
                        {
                            text: `\n\n(e) Severability`, bold: 'true'
                        },
                        {
                            text: `\nIf any provision of this Agreement is agreed by the parties to be illegal, void or unenforceable under any law that is applicable hereto or if any court of competent jurisdiction in a final decision so determines, this Agreement shall continue in force save that such provision shall be deemed to be deleted here from with effect from the date of such agreement or decision or such earlier date as the Parties may agree.`
                        },
                        {
                            text: `\n\n(f) Interpretation`, bold: 'true'
                        },
                        {
                            text: `In this Agreement, unless otherwise stated: -`
                        },
                        {
                            text: `Words in the singular shall include the plural and vice versa;`
                        },
                        {
                            text: `The headings in this Agreement are for convenience only and are not intended to have any legal effect;`
                        },
                        {
                            text: `\nand`
                        },
                        {
                            text: `\nWords denoting persons shall include bodies corporate, Co-operative Society, unincorporated associations and partnerships.`
                        },
                        {
                            text: `\n\n(g) Waiver`, bold: 'true'
                        },
                        {
                            text: `\nA failure by either party to exercise or enforce any rights conferred upon it by this Agreement shall not be deemed to be a waiver of any such rights or operate so as to bar the exercise or enforcement thereof at any subsequent time or times.`
                        },
                        {
                            text: `\n\n(h) Governing law and jurisdiction`, bold: 'true'
                        },
                        {
                            text: `The construction, validity and performance of this Agreement shall be governed in all respects by the laws of India. The parties hereby submit to the exclusive jurisdiction of the Courts at Mumbai`
                        },
                        {
                            text: `IN WITNESS WHEREOF, the parties hereto have set their hands and signatures on the day, month and year first above written.`
                        },
                    ]
                },
                { text: `\n`, pageBreak: 'before' },
                {
                    text: [
                        {
                            text: `Signed for and on behalf of the Member`, bold: 'true'
                        },
                        {
                            text: `\n\n(Should be signed only by individual / proprietor / designated director as the case may be or the authorised signatory as on the records of the Exchange)`
                        },
                        {
                            text: `\n\nWitness:`, bold: 'true'
                        }
                    ]
                },
                {
                    style: 'tableExample',
                    layout: 'noBorders',
                    table: {
                        widths: [10, 240, 10, '*'],
                        body: [
                            [`1.`, `Signature`, `2.`, `Signature`],
                            [``, ` `, ``, ``],
                            [``, `Name`, ``, `Name`],
                            [``, ``, ``, ` `],
                            [``, `Address `, ``, `Address `]
                        ]
                    }
                },
                {
                    text: `\n\n\nSigned for and on behalf of the Authorised Person`, bold: 'true'
                },
                {
                    text: `\n(Should be signed by Individual / Partner / Director of the proposed Authorised Person)`
                },
                {
                    text: `\n\nWitness:`, bold: 'true'
                },
                {
                    style: 'tableExample',
                    layout: 'noBorders',
                    table: {
                        widths: [10, 240, 10, '*'],
                        body: [
                            [`1.`, `Signature`, `2.`, `Signature`],
                            [``, ` `, ``, ``],
                            [``, `Name`, ``, `Name`],
                            [``, ``, ``, ` `],
                            [``, `Address `, ``, `Address `]
                        ]
                    }
                }
            ]
        }
        return dd
    }
}