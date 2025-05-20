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
        let a;
        if (apBranchDtls) {
            a = ((apBranchDtls.Address_1 == null ? ' ' : apBranchDtls.Address_1) + ', ' + (apBranchDtls.Address_2 == null ? ' ' : apBranchDtls.Address_2) + ', ' + (city.City_name == null ? ' ' : city.City_name) + ', ' + (state.State_Name == null ? ' ' : state.State_Name) + '-' + (apBranchDtls.Pin_Code == null ? ' ' : apBranchDtls.Pin_Code) + ', ' + (country.Country_Name == null ? ' ' : country.Country_Name)).toUpperCase()
        } else {
            a = '';
        }

        // console.log('apBranchDtls', apBranchDtls)
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
                    text: '\nAgreement between Member and Authorised Person\n\n\n',
                    style: 'header'
                },
                {
                    text: [
                        { text: 'This agreement (“', bold: true },
                        { text: 'Agreement' },
                        { text: `”) is made and executed at _____________ this _____ day of ___________, 20__  `, bold: true },
                        { text: `\nBetween:`, bold: true },
                        { text: `\n\n${entity_Name}`, bold: true, decoration: 'underline' },
                        {
                            text: `, an individual/ a proprietary concern/ a partnership firm/ a body corporate, registered/ incorporated under the provisions of Partnership Act, 1932/ Companies Act, 1956, having his/her/its office/registered office at `
                        },
                        { text: `${entity_RegAdd}`, bold: true },
                        { text: ` & Corporate Office at ` },
                        { text: `${entity_CorpAdd}, `, bold: 'true' }, `(hereinafter referred to as “`,
                        { text: 'Member', bold: true },
                        {
                            text: `” which expression shall, unless repugnant to the context or meaning thereof, be deemed to mean and include his/her heirs, legal representatives, the partners for the time being of the said firm, the survivor or survivors of them and the heirs, executors and administrators of such last survivor /its successors and assigns, as the case may be ) of the`
                        },
                        { text: ' One Part; ', bold: true },
                        { text: '\n\nAND\n\n', alignment: 'center', bold: true },
                        { text: 'Mr./Ms./M/s. ', bold: true, alignment: 'justify' },
                        {
                            text: [
                                { text: `${apData.Account_Name == null ? ' ' : apData.Account_Name.toUpperCase()}`, alignment: 'justify', decoration: 'underline', bold: 'true' },
                                { text: ` an individual/a partnership firm / a limited liability partnership/a body corporate/a company,registered/incorporated under the Partnership Act, 1932/Limited Liability Partnership Act, 2008/ Companies Act, 1956/……………. (**Please specify the legal provisions under which the entity is formed/incorporated **), having its registered office at ` }
                            ]
                        },
                        { text: `${a}`, bold: 'true' },
                        { text: ` (hereinafter called “` },
                        { text: 'AP', bold: true },
                        {
                            text: `” which expression shall, unless repugnant to the context or meaning thereof, be deemed to mean and include his/her heirs, legal representatives, executors and administrators/ the partners for the time being of the said firm, the survivor or survivors of them and the heirs, executors and administrators of such last survivor /its successors and assigns, as the case may be) of the `
                        },
                        { text: 'Other Part;\n\nMember ', bold: true },
                        { text: `and ` },
                        { text: 'AP', bold: true },
                        { text: ` shall hereinafter be also jointly referred to as the “` },
                        { text: 'Parties', bold: true },
                        { text: `” and severally as the “` },
                        { text: 'Party', bold: true },
                        { text: `”.` },
                        { text: '\nWHEREAS', bold: true },
                        { text: `\n\ni) The Securities and Exchange Board of India (“` },
                        { text: 'SEBI', bold: true },
                        { text: `”) vide its circular No. MRD/DR- 1/Cir-16/2009 dated November 06, 2009 (“` },
                        { text: 'said Circular', bold: true },
                        {
                            text: `”) addressed to all the recognised Stock Exchanges has issued the framework governing the market access through authorised persons.`
                        },
                        {
                            text: `\n\nii) SEBI vide said circular has inter alia directed that the stock broker and authorised person shall enter into a written agreement in the form specified by the stock exchange.`
                        }
                    ]
                },
                // { text: `\n`, pageBreak: 'before' },
                {
                    text: [
                        {
                            text: `\niii) Member is(a) Trading Member with the cash Segment, (b) Trading cum clearing Member with`
                        },
                        { text: `\nthe Derivatives Segment, (c) Trading cum Clearing Member with the Currency Derivatives Segment of the` },
                        { text: `\nBombay Stock Exchange Ltd. (“BSE”). (###1 `, bold: true },
                        { text: `\nout of options(a), (b) and(c), please delete which ever is not applicable ***)` },
                        { text: `\n1 ### - Please delete whichever is not applicable` },
                        {
                            text: `\n\niv) AP approached Member and Member has agreed to appoint AP as the authorised person on the terms and conditions specified in this Agreement.`
                        },
                        { text: '\nNOW, THEREFORE, THIS AGREEMENT WITNESSETH AND IT IS HEREBY AGREED BY AND BETWEEN THE PARTIES HERETO AS UNDER:', decoration: 'underline', bold: true },
                        { text: '\n\n1. ', bold: true },
                        { text: 'LEGAL FRAMEWORK\n', decoration: 'underline', bold: true },
                        {
                            text: `\n1.1 The provisions of the SEBI circular No.MRD / DR - 1 / Cir - 16 / 2009 dated November 06, 2009 and other circulars issued by SEBI from time to time, the Rules, Bye - laws and Regulations and / or relevant notices of BSE shall be deemed to be an integral part of this Agreement.In the event of any conflict or contradiction between the provisions of the circulars, notices, directions and orders of SEBI, Rules, Bye - laws and Regulations, notices of the BSE, and this Agreement, the provisions of the statute, rules, bye - laws or regulations occurring sequentially earlier in the above list shall prevail over the one occurring sequentially subsequent thereto over this Agreement.The provisions of this Agreement are in addition thereto and not in derogation thereof.`
                        },
                        { text: '\n\n2. ', bold: true },
                        { text: 'CONDITIONS OF APPOINTMENT', decoration: 'underline', bold: true },
                        { text: '\n\n2.1 AP shall not receive or pay any money or securities in its own name or account. All receipts and payments of securities and funds shall be in the name or account of Member.' },
                        { text: '\n\n2.2 AP shall receive his remuneration-fees, charges, commission, salary, etc.- for his services only from Member and he shall not charge any amount to the clients.' },
                        { text: '\n\n2.3 AP shall not be appointed as authorized person by more than one stock broker on BSE (including all the segments).' },
                        { text: '\n\n3. ', bold: true },
                        { text: 'OBLIGATIONS OF MEMBER', decoration: 'underline', bold: true },
                        { text: '\n\n3.1 If any trading terminal is provided by Member to AP, the place where such trading terminal is located shall be treated as branch office of Member.' },
                        { text: '\n\n3.2 Member shall display at each branch office, additional information such as particulars of authorised person in charge of that branch, time lines for dealing through authorised person, etc., as may be specified by BSE.' },
                        { text: '\n\n3.3 Member shall notify changes, if any, in the authorised person to all registered clients of that branch at least thirty days before the change.' },
                        { text: '\n\n3.4 Member shall conduct periodic inspection of branches assigned to authorised persons and records of the operations carried out by them.' },
                        { text: ' Further, the Member shall mandatorily examine all demat accounts and bank accounts of AP on such periodical basis as he/it may deem fit.', bold: true },
                        { text: '\n\n3.5 The clients introduced by AP shall be registered with Member only. The funds and securities of the clients shall be settled directly between Member and client and all documents like contract note, statement of funds and securities shall be issued to client by Member. AP may provide administrative assistance in procurement of documents and settlement, but shall not issue any document to client in its own name. No fund/securities of clients shall go to account of AP.' },
                        { text: '\n\n3.6 On noticing irregularities, if any, in the operations of AP, Member shall seek withdrawal of approval from BSE, withhold all moneys due to AP till resolution of investor problems, alert investors in the location where AP operates, file a complaint with the police, and take all measures required to protect the interest of investors and market.' }
                    ]
                },
                // { text: `\n`, pageBreak: 'before' },
                {
                    text: [
                        { text: '\n4. ', bold: true },
                        { text: 'OBLIGATIONS OF AP', decoration: 'underline', bold: true },
                        { text: '\n\n4.1 Abide by Law & Acquaintance to Law', bold: true },
                        { text: '\n\nAP agrees to abide by and comply with and adhere to the circulars, notices, directions, order etc. that may be promulgated or issued from time to time either by SEBI, BSE, Reserve Bank of India or any other regulatory authority.' },
                        { text: '\n\n4.2 Insolvency.\n ', bold: true },
                        { text: '\nAP agrees to immediately furnish information to Member in writing, if any winding up petition or insolvency petition has been filed or any winding up or insolvency order or decree or award is passed against him/it or if any litigation which may have material adverse bearing on him, has been filed against him.' },
                        { text: '\n\n5. ', bold: true },
                        { text: 'CONFIDENTIALITY', decoration: 'underline', bold: true },
                        { text: '\n\nMember and AP shall not disclose the Confidential Information (marked as such at the time of providing the information) of each other to any third party, without the written consent of the other Party. The provisions of this Clause 5 shall not prohibit disclosure of Confidential Information, if and to the extent:' },
                        { text: '\n\na) required by law or for the purpose of any judicial proceedings arising out of this Agreement;' },
                        { text: '\n\nb) required by the SEBI or any other regulatory authority;' },
                        { text: '\n\nc) it becomes publicly available (other than as a result of a breach of an obligation of confidentiality);' },
                        { text: '\n\nd) the information is obtained free of any restrictions on use or obligations of confidentiality from a third party which is itself free of any restrictions on use or obligations of confidentiality with respect to that information;' },
                        { text: '\n\ne) the information is already in the possession of that Party and is not subject to an obligation of confidentiality or a restriction on use; or' },
                        { text: '\n\nf) the information is independently developed,' },
                        { text: '\n\n6. ', bold: true },
                        { text: 'CONSEQUENCES OF CESSATION OF MEMBERSHIP ON A SEGMENT', decoration: 'underline', bold: true },
                        {
                            text: `\n\nIn the event of membership of the Member on any segment of BSE coming to an end far any reason whatsoever, the relevant part of this Agreement pertaining to such segment shall come to an end.`
                        },
                        { text: '\n\n7. ', bold: true },
                        { text: 'DISPUTE RESOLUTION AND ARBITRATION:\n', decoration: 'underline', bold: true },
                        {
                            text: `\nThe dispute between a client and AP shall be treated as dispute between such client and Member.All disputes and differences between AP and Member pertaining to subject matter of this Agreement, shall be redressed as per the Rules and Bye - laws of BSE pertaining to Arbitration other than between Members and in the absence of any provision in the Rules, Bye - laws of BSE to this effect, such disputes and differences shall be referred to arbitration as per the provisions of Arbitration & Conciliation Act, 1996. `
                        },
                        { text: '\n\n8. ', bold: true },
                        { text: 'GOVERNING LAW AND JURISDICTION\n\n', decoration: 'underline', bold: true },
                        {
                            text: `8.1 This Agreement shall be governed by and construed in all respects in accordance with the laws of India.The Agreement shall be subject to exclusive jurisdiction of Courts of Mumbai. `
                        }
                    ]
                },
                // { text: `\n`, pageBreak: 'before' },
                {
                    text: [
                        { text: '\n9. ', bold: true },
                        { text: 'TERMINATION', decoration: 'underline', bold: true },
                        {
                            text: `\n\n9.1 This Agreement shall forthwith terminate if Member ceases to be a trading / clearing member of BSE for any reason(including cessation of membership by reason of the Member’s default, death, resignation or expulsion) or if the SEBI Registration of Member is cancelled.`
                        },
                        {
                            text: `\n\n9.2 Member and AP shall each be entitled to terminate this Agreement without giving any reasons to the other Party, after giving notice in writing of not less than 30 days to the other Party.`
                        },
                        {
                            text: `\n\n9.3 This Agreement will be terminated forthwith on withdrawal of approval given to AP by BSE and on receipt of request of Member to do so subject to compliance with the requirement prescribed by BSE. `
                        },
                        { text: '\n\nIN WITNESS WHEREOF ', bold: true },
                        {
                            text: `the Parties to this Agreement have caused these presents to be executed as of the day and year first above written.`
                        }
                    ]
                },
                '\n',
                {
                    style: 'tableExample',
                    layout: 'noBorders',
                    table: {
                        widths: [250, '*'],
                        body: [
                            [{ text: `AP’s Signature:` }, { text: `The Member’s`, alignment: 'left' }],
                            [{ text: `Authorised Signatory:` }, { text: `Signature/Authorised Signatory:`, alignment: 'left' }],
                            [{ text: `Signed By:` }, { text: `Signed By:`, alignment: 'left' }],
                            [{ text: `Title:` }, { text: `Title:`, alignment: 'left' }],
                            [{ text: `` }, { text: ``, alignment: 'left' }],
                            [{ text: `` }, { text: ``, alignment: 'left' }],
                            [{ text: `Witness:` }, { text: `Witness:`, alignment: 'left' }]
                        ]
                    }
                }
            ],
            styles: {
                header: {
                    fontSize: 11.5,
                    alignment: 'center'
                },
                header1: {
                    fontSize: 10,
                    alignment: 'center',
                    color: '#FF0000',
                    background: '#FFFF00'
                }
            }
        }
        return (dd)
    }
}