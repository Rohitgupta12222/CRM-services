// playground requires you to assign document definition to a variable called dd
var connect = require('../Data/Connect');
var datamodel = require('../Data/DataModel');
var dataaccess = require('../Data/DataAccess');
var dataconn = require('../Data/DataConnection');
var commonFunction = require('../Common/CommonFunctions');
let path = require('path');

module.exports = {
    createDocDefinition: async (fileParams) => {
var dd = {
    pageMargins: [ 15, 20, 15,20 ],
   content: [
   {text:`\n\nBACKGROUND VERIFICATION FORM`, fontSize:22, bold:'true', alignment:'center'},
{	text:`\n\n\n\n\n\n\n                                Client name                                `,fontSize:28, background: '#ffffba', alignment:'center', bold:'true'},

{text:`\n\nClient Logo`, alignment:'center',color:'red'},

{text:`\nINSTRUCTIONS:`,pageBreak:'before', alignment:'center', bold:'true', fontSize:18},
{text:`It is mandatory for you to complete the form in all respects.  The information you provide must be`, alignment:'center', fontSize:11},
{text:`complete and correct and the same shall  be treated in strict confidence`,alignment:'center', fontSize:11},
{text:`The details on this form will be used for all official requirements should you join the organization`, alignment:'center', fontSize:11},

{text:`\nBackground Verification Form`, alignment:'center', fontSize:22},
{text:`Client name`, alignment:'center', fontSize:14},


   {
           style: 'tableExample',
           table: {
               widths:[150,150,'*'],
               body: [
                   [{text:`Applicant No / Employee ID`, color:'white',bold:'true',  fillColor: '#000000'},{text:`Location`, color:'white',bold:'true',  fillColor: '#000000', alignment:'center'},{text:`Date of Joining / Interview`, color:'white',bold:'true', alignment:'center', fillColor: '#000000'}],
                  [`
                  `,`   `,`  `] 
                   
                   ]
               
           }
       
   },
   `\n`,
   
   {
           style: 'tableExample',
           table: {
              widths:[90,90,90,90,'*'],
               body: [
                   [{text:`Personal Information`, color:'white',bold:'true',  fillColor: '#000000', colSpan: 5 },{},{},{},{}],
                  [{text:`Full Name (First, Middle, Last)`,margin: [0, 0,0, 30], colSpan: 2},{},{text:`Former Name / Maiden Name\n(if Applicable)`,margin: [0, 0,0, 30], colSpan: 2},{},{rowSpan: 3, text: 'Photograph (Please attach 3 passport size photographs)'}],
                   
                  [{text:`Father's Name`,margin: [0, 0,0, 20], colSpan: 2},``,{text:`Date of Birth (dd/mm/yy)`,margin: [0, 0,0, 30], colSpan: 2},``,``],
                                     [{text:`Gender\n    Male\n    Female`},{text:`Social Security Number (if applicable)`, colSpan: 2},{},{text:`Nationality`,margin: [0, 0,0, 20]},``],
           [{text:`Married Status`,margin: [0, 5,0, 5], colSpan: 2},{},{text:`Spouse Name `,margin: [0, 5,0, 5], colSpan: 2},{},{rowSpan: 2, text: `Residence Number
                       
                       Mobile number`,margin: [0, 30,0, 5],}],	    
                       [{text:`Current Address
                       
                       
                       Prominent Landmark`,margin: [0, 0,0, 5], colSpan: 2},{},{text:`Period of From (mm/yy) To  (mm/yy) stay`,margin: [0, 0,0, 5], colSpan: 2},{},{}],	    
                   
                       [{text:`Current Address
                       
                       
                       Prominent Landmark`,margin: [0, 0,0, 5], colSpan: 2},{},{text:`Period of From (mm/yy) To  (mm/yy) stay`,margin: [0, 0,0, 5], colSpan: 2},{},{text:`Residence Number
                       
                       Mobile number`}],	    
                   
                   
                   
                   ]
           
           }
       
   },
   `\n`,
   
   {
           style: 'tableExample',
           table: {
              widths:[90,90,45, 45,90,90,'*'],
               body: [
                   [{text:`Education Qualification Highest Qualification - Please attach copy of Degree and Final year mark sheet`, color:'white',bold:'true',  fillColor: '#000000', colSpan: 7 },{},{},{},{},{},{}],
                 [{rowSpan:2,text:`College Name & Address`,color:'white',bold:'true',fillColor: '#848884', alignment:'center'},{rowSpan:2,text:`University Name & Address`,color:'white',bold:'true',fillColor: '#848884', alignment:'center'},{colSpan: 2,text:`Dates attended`,color:'white',bold:'true',fillColor: '#848884', alignment:'center'},{},{rowSpan:2,text:`Subjects Studied`,color:'white',bold:'true',fillColor: '#848884', alignmeent:'center'},{rowSpan: 2, text: 'Qualification Gained',color:'white',bold:'true',fillColor: '#848884', alignment:'center'},{rowSpan:2,text:`ID /Roll No `,color:'white',bold:'true',fillColor: '#848884', alignment:'center'}],
                   
               [{},{},{text:`From`,color:'white',bold:'true',fillColor: '#848884', alignment:'center'},{text:`To`,color:'white',bold:'true',fillColor: '#848884', alignment:'center'},{},{},{}],
                   
                [``,``,``,``,``,`
                
                
                
                Full Time \nPart Time`,``]   
                   ]
           
           }
       
   },
       {text:`\n`,pageBreak:'before'},
   
   {
           style: 'tableExample',
           table: {
              widths:[60,25,50,95,35,90,35,'*'],
               body: [
                   [{text:`Employment History - Current Employer`, color:'white',bold:'true',  fillColor: '#000000', colSpan: 8 },{},{},{},{},{},{},{}],
                 [{colSpan:4,text:`Name of Current Employer`,margin: [0, 0,0, 25]},{},{},{},{colSpan:4,text:`Address of Current Employer`,margin: [0, 0,0, 25]},{},{},{}],
                    [{colSpan:2,text:`Telephone No`,margin: [0, 0,0, 25]},{},{colSpan:2,text:`Employee Code/No`,margin: [0, 0,0, 25]},{},{colSpan:2,text:`Designation`,margin: [0, 0,0, 25]},{},{colSpan:2,text:`Department`,margin: [0, 0,0, 25]},{}],
            [{colSpan:3,text:`Employment Period`, alignment:'center'},{},{},{colSpan:2,rowSpan:3,text:`Manager's Name`},{},{colSpan:2,rowSpan:2,text:`Manager's Contact No`},{},{rowSpan:3,text:`Can a reference taken now?\nYes \n No`}],
   [{rowSpan:2,text:`From`},{colSpan:2,rowSpan:2,text:`To`},{},{},{},{},{},{}],		
       
   [{},{},{},{},{},{colSpan:2,text:`Manager's Email ID`},{},{}],
   [{colSpan:5, text:`Duties & Responsibilities`,margin: [0, 0,0, 15]},{},{},{},{},{colSpan:3, text:`Reasons for leaving`,margin: [0, 0,0, 15]},{},{}],
   [{colSpan:3, text:`First Salary drawn
       `},{},{},{rowSpan:2,text:`Was this Position\n Permanent \nTemporary \nContractual`},{colSpan:4,rowSpan:2, text:`Agency Details (if temporary or contractual), provide details`},{},{},{}],	
   [{colSpan:3, text:`Last Salary drawn
   `},{},{},{},{},{},{},{}]	
       
                   
           ]
           
           }
       
   },
   `\n`,
       
       
   {
           style: 'tableExample',
           table: {
              widths:[90,50,50,50,50,50,50,'*'],
               body: [
                   [{text:`Previous Employment History - Please attach a copy of your relieving letter/service certificate for this`, color:'white',bold:'true',  fillColor: '#000000', colSpan: 8 },{},{},{},{},{},{},{}],
                 [{colSpan:4,text:`Name of Employer (1)`,margin: [0, 0,0, 25]},{},{},{},{colSpan:4,text:`Address of Employer`,margin: [0, 0,0, 25]},{},{},{}],
                    [{text:`Telephone No`,margin: [0, 0,0, 25]},{colSpan:3,text:`Employee Code/No`,margin: [0, 0,0, 25]},{},{},{colSpan:3,text:`Designation`,margin: [0, 0,0, 25]},{},{},{text:`Department`,margin: [0, 0,0, 25]}],
            [{colSpan:3,text:`Employment Period`, alignment:'center'},{},{},{colSpan:3,rowSpan:3,text:`Manager's Name`},{},{},{colSpan:2,rowSpan:2,text:`Manager's Contact No`},{}],
   [{rowSpan:2,text:`From`},{colSpan:2,rowSpan:2,text:`To`},{},{},{},{},{},{}],		
       
   [{},{},{},{},{},{},{colSpan:2,text:`Manager's Email ID`},{}],
   [{colSpan:5, text:`Duties & Responsibilities`,margin: [0, 0,0, 15]},{},{},{},{},{colSpan:3, text:`Reasons for leaving`,margin: [0, 0,0, 15]},{},{}],
   [{colSpan:2, text:`First Salary drawn
       `},{},{colSpan:2,rowSpan:2,text:`Was this Position\n Permanent \nTemporary \nContractual`},{},{colSpan:4,rowSpan:2, text:`Agency Details (if temporary or contractual), provide details`},{},{},{}],	
   [{colSpan:2, text:`Last Salary drawn
   `},{},{},{},{},{},{},{}]	
       
                   
           ]
           
           }
       
   },
       {text:`\n`,pageBreak:'before'},
       
       
   {
           style: 'tableExample',
           table: {
              widths:[90,50,50,50,50,50,50,'*'],
               body: [
                   [{text:`Previous Employment History - Please attach a copy of your relieving letter/service certificate for this`, color:'white',bold:'true',  fillColor: '#000000', colSpan: 8 },{},{},{},{},{},{},{}],
                 [{colSpan:4,text:`Name of Employer (2)`,margin: [0, 0,0, 25]},{},{},{},{colSpan:4,text:`Address of Employer`,margin: [0, 0,0, 25]},{},{},{}],
                    [{text:`Telephone No`,margin: [0, 0,0, 25]},{colSpan:3,text:`Employee Code/No`,margin: [0, 0,0, 25]},{},{},{colSpan:3,text:`Designation`,margin: [0, 0,0, 25]},{},{},{text:`Department`,margin: [0, 0,0, 25]}],
            [{colSpan:3,text:`Employment Period`, alignment:'center'},{},{},{colSpan:3,rowSpan:3,text:`Manager's Name`},{},{},{colSpan:2,rowSpan:2,text:`Manager's Contact No`},{}],
   [{rowSpan:2,text:`From`},{colSpan:2,rowSpan:2,text:`To`},{},{},{},{},{},{}],		
       
   [{},{},{},{},{},{},{colSpan:2,text:`Manager's Email ID`},{}],
   [{colSpan:5, text:`Duties & Responsibilities`,margin: [0, 0,0, 15]},{},{},{},{},{colSpan:3, text:`Reasons for leaving`,margin: [0, 0,0, 15]},{},{}],
   [{colSpan:2, text:`First Salary drawn
       `},{},{colSpan:2,rowSpan:2,text:`Was this Position\n Permanent \nTemporary \nContractual`},{},{colSpan:4,rowSpan:2, text:`Agency Details (if temporary or contractual), provide details`},{},{},{}],	
   [{colSpan:2, text:`Last Salary drawn
   `},{},{},{},{},{},{},{}]	
       
                   
           ]
           
           }
       
   },
   `\n`,
   
   {
           style: 'tableExample',
           table: {
              widths:[45, 45,90,45,45, 45,90,90],
               body: [
                   [{text:`Address History for Criminal Verification  (List most recent first)`, color:'white',bold:'true',  fillColor: '#000000', colSpan: 8 },{},{},{},{},{},{},{}],
                 [{colSpan:2,text:`Period of  Stay`,color:'white',bold:'true',fillColor: '#848884', alignment:'center'},{},{rowSpan:2,text:`Address`,color:'white',bold:'true',fillColor: '#848884', alignment:'center'},{rowSpan: 2,text:`State`,color:'white',bold:'true',fillColor: '#848884', alignment:'center'},{rowSpan:2,text:`Zip Code`,color:'white',bold:'true',fillColor: '#848884', alignment:'center'},{rowSpan:2,text:`Country`,color:'white',bold:'true',fillColor: '#848884', alignmeent:'center'},{rowSpan: 2, text: 'Prominent Landmark',color:'white',bold:'true',fillColor: '#848884', alignment:'center'},{rowSpan:2,text:`Contact Number`,color:'white',bold:'true',fillColor: '#848884', alignment:'center'}],
                   
               [{text:`From`,color:'white',bold:'true',fillColor: '#848884', alignment:'center'},{text:`To`,color:'white',bold:'true',fillColor: '#848884', alignment:'center'},{},{},{},{},{}],
                   
               [{text:` `,margin: [0, 0,0,35]},`  `,``,``,``,``,``,``],
                   [{text:` `,margin: [0, 0,0,35]},``,``,``,``,``,``,``],
                       [{text:` `,margin: [0, 0,0,35]},``,``,``,``,``,``,``],
                           [{text:` `,margin: [0, 0,0,35]},``,``,``,``,``,``,``],
                               [{text:` `,margin: [0, 0,0,35]},``,``,``,``,``,``,``],
                                   [{text:` `,margin: [0, 0,0,35]},``,``,``,``,``,``,``],
                                   ]
           
           }
       
   },
{text:`Note: Please add more boxes if required to cover addresses for a period of last 7 years`},
   
   {	text:`Documents Required                                                                                                                                                        `,background: '#000000', alignment:'left', bold:'true', color:'white',pageBreak:'before'},
{text:`Education:`,decoration:'underline'},

   {
           style: 'tableExample',
           layout:'noBorders',
           table: {
              widths:[30,'*'],
               body: [
                   [{text:``,alignment:'center'},`Photocopy of degree certificate and final mark sheet`],
           
                                   ]
           
           },
           
       
   },
   
{text:`For Bangalore University`,decoration:'underline'},
   {
           style: 'tableExample',
           layout:'noBorders',
           table: {
              widths:[30,'*'],
               body: [
                   [{text:``,alignment:'center'},` A photo copy of both sides of Degree Certificate`],
            [{text:``,alignment:'center'},` Copies of Marks sheet/Grade card for all years of attendance`],
             [{text:``,alignment:'center'},` Name of college through which candidate has graduated`],
                                   ]
           
           },
           
       
   },
   
   {text:`\nEmployment`,decoration:'underline'},
   {
           style: 'tableExample',
           layout:'noBorders',
           table: {
              widths:[30,'*'],
               body: [
                   [{text:``,alignment:'center'},`Photocopy of relieving / experience letter`]
                                   ]
           
           },
           
       
   },
       {text:`\nCriminal Verification:(Rest of India except Tamil Nadu, Andhra Pradesh and Karnataka )`,decoration:'underline'},
{
           style: 'tableExample',
           layout:'noBorders',
           table: {
              widths:[30,'*'],
               body: [
                   [{text:``,alignment:'center'},` Three (3) passport size photographs`],
                   [{text:``,alignment:'center'},` The Passport Copy or the Ration Card Copy is mandatory, irrespective of the address `],
                   [{text:``,alignment:'center'},` If the current address corresponds to the one in these documents, then no other documents are required. `],
                   [{text:``,alignment:'center'},` If not corresponding to the current address then the following will have to be provided, in order of priority 
                    a.  Utility bills - MTNL or BSES Bills stating current address
                     b. A copy of the Lease Agreement.
                      c. If staying at Company accommodation then Letter from Company is required stating the same.
                       d. If living with relative/ friend, then the agreement copy of the residence and letter stating relationship with the
                       concerned relative/friend.
                         e. Completed CID Form`],
                                   ]
           
           },
           
       
   },
   
   {text:`\n\nAs is the procedure followed by most police departments across India for criminal background verification, it is possible that police authorities may contact you or visit your stated residence and at times even ask you to present yourself at the concerned police station. It is part of the standard verification procedure. Please do not give in to any  attempts at coercion by the authorities and in the event of an occurrence, please get in touch with us or First Advantage India at +91 -22-4069 7000 or email at info@questresearch.com\n\n\n`,fontSize:8.5},

{	text:`Declaration and Authorization                                                                                                                                        `,background: '#000000', alignment:'left', bold:'true', color:'white'},
{text:`\n\nI hereby authorize XXXXX to contact any former employers as indicated above and carry out all Background Checks not restricted to education and employment deemed appropriate through this selection procedure. I authorize former employers, agencies, educational institutes etc. to release any information pertaining to my employment/education and I release them from any liability in doing so.
\n\nI confirm that the above information is correct to the best of my knowledge and I understand that any organization or misrepresentation of information on this application form may, in the event of my obtaining employment, result in action based on company policy. 
\n\nSignature: _______________________________________________________`, fontSize:10},
{text:[
   
 {text:`Name:       _______________________________________________________`, fontSize:10,alignment:'left'},
 {text:`           Date: ________________________________________`, fontSize:10,alignment:'right'},
 
   
   ]}

   ]   
   
}
return dd}
}