var connect = require('./Connect');

var sequelize = connect.sequelize;
var Sequelize = connect.Sequelize;
const Model = connect.Sequelize.Model;

//Model declaration starts

class UserMst extends Model { }

class RoleMst extends Model { }
class UserRoleMap extends Model { }
class UIMst extends Model { }
class UIRoleMap extends Model { }
class ErrorLog extends Model{}
class User extends Model{}
class kyc_details extends Model {}
class Withdraw extends Model{}
class Deposit extends Model{}
class ClientMasterDetails extends Model{}
class ClientUploadDetails extends Model{}
class FolioDetails extends Model{}
class EmployeeDetails extends Model {}
class BakerCSODetails extends Model {}
class ClientMasterDetailsHistory extends Model{}
class ClientUploadHistoryDetails extends Model{}
class FolioHistoryetails extends Model{}
class EmployeeHistoryDetails extends Model {}
class BakerCSOHistoryDetails extends Model {}
class Masterschedulerdetails extends Model { }
class ApiResponseDetail extends Model { }
//Master Tables Start





module.exports.UserMst = function () {
    UserMst.init({
        Id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        ADUser: { type: Sequelize.BOOLEAN, allowNull: true },
        LoginId: { type: Sequelize.STRING(100), allowNull: true },
        EmpCode: { type: Sequelize.STRING(100), allowNull: true },
        EmpName: { type: Sequelize.STRING(200), allowNull: true },
        EmailId: { type: Sequelize.STRING(100), allowNull: true },
        Mobile_No:{type: Sequelize.STRING(10), allowNull: true },
        Branch:{ type: Sequelize.STRING(100), allowNull: true },
        DefaultRoleId: { type: Sequelize.INTEGER, allowNull: true },
        Password: { type: Sequelize.STRING(100), allowNull: true },
        ClientId: { type: Sequelize.INTEGER,allowNull: true},
        IsActive: { type: Sequelize.BOOLEAN, allowNull: true },
        CreatedBy: { type: Sequelize.BIGINT, allowNull: true },
        CreatedDate: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW },
        ModifiedBy: { type: Sequelize.BIGINT, allowNull: true },
        ModifiedDate: { type: Sequelize.DATE, allowNull: true },
    },
        {
            sequelize,
            modelName: 'User',
            tableName: 'UserMst'
        });

    exports.UserRoleMap();
    UserMst.hasMany(UserRoleMap);
    UserMst.belongsTo(UserRoleMap, { foreignKey: 'Id', constraints: false, });
  
    return UserMst;
}

module.exports.UserRoleMap = function () {
    UserRoleMap.init({
        Id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        UserId: { type: Sequelize.INTEGER, allowNull: true },
        RoleId: { type: Sequelize.INTEGER, allowNull: true }
    },
        {
            sequelize,
            modelName: 'UserRole',
            tableName: 'UserRoleMap'
        });

    exports.RoleMst();
    UserRoleMap.belongsTo(RoleMst, { foreignKey: 'RoleId' });

    return UserRoleMap;
}

module.exports.RoleMst = function () {
    RoleMst.init({
        Id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        Code: { type: Sequelize.STRING(100), allowNull: true },
        Desc: { type: Sequelize.STRING(2000), allowNull: true },
        IsCentralAccess: { type: Sequelize.STRING(2000), allowNull: true },
        IsActive: { type: Sequelize.BOOLEAN, allowNull: true },
        CreatedBy: { type: Sequelize.BIGINT, allowNull: true },
        CreatedDate: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW },
        ModifiedBy: { type: Sequelize.BIGINT, allowNull: true },
        ModifiedDate: { type: Sequelize.DATE, allowNull: true },
    },
        {
            sequelize,
            modelName: 'Role',
            tableName: 'RoleMst'
        });

    return RoleMst;
}


module.exports.UIMst = function () {
    UIMst.init({
        Id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        ParentId: { type: Sequelize.INTEGER, allowNull: true },
        Title: { type: Sequelize.STRING(100), allowNull: true },
        Path: { type: Sequelize.STRING(2000), allowNull: true },
        Icon: { type: Sequelize.STRING(2000), allowNull: true },
        CssClass: { type: Sequelize.STRING(2000), allowNull: true },
        Sequence: { type: Sequelize.INTEGER, allowNull: true },
        IsActive: { type: Sequelize.BOOLEAN, allowNull: true },
        IsChild: { type: Sequelize.BOOLEAN, allowNull: true },
        CreatedBy: { type: Sequelize.BIGINT, allowNull: true },
        CreatedDate: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW },
        ModifiedBy: { type: Sequelize.BIGINT, allowNull: true },
        ModifiedDate: { type: Sequelize.DATE, allowNull: true },
    },
        {
            sequelize,
            modelName: 'UI',
            tableName: 'UIMst'
        });

    exports.UIRoleMap();
    UIMst.hasMany(UIRoleMap);
    UIMst.belongsTo(UIRoleMap, { foreignKey: 'Id', constraints: false, });

    return UIMst;
}

module.exports.UIRoleMap = function () {
    UIRoleMap.init({
        Id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
        UIId: { type: Sequelize.INTEGER, allowNull: true },
        RoleId: { type: Sequelize.INTEGER, allowNull: true },
        Viewer: { type: Sequelize.BOOLEAN, allowNull: true },
        Maker: { type: Sequelize.BOOLEAN, allowNull: true },
        Checker: { type: Sequelize.BOOLEAN, allowNull: true },
        Edit: { type: Sequelize.BOOLEAN, allowNull: true },
        Export: { type: Sequelize.BOOLEAN, allowNull: true },
        Upload: { type: Sequelize.BOOLEAN, allowNull: true },
        IsActive: { type: Sequelize.BOOLEAN, allowNull: true },
        CreatedBy: { type: Sequelize.BIGINT, allowNull: true },
        CreatedDate: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW },
        ModifiedBy: { type: Sequelize.BIGINT, allowNull: true },
        ModifiedDate: { type: Sequelize.DATE, allowNull: true },
    },
        {
            sequelize,
            modelName: 'UIRole',
            tableName: 'UIRoleMap'
        });

    exports.RoleMst();
    UIRoleMap.belongsTo(RoleMst, { foreignKey: 'RoleId', });

    return UIRoleMap;
}



//Common
module.exports.ErrorLog = function () {
    ErrorLog.init({
        Id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
        ServiceName: { type: Sequelize.STRING(100), allowNull: true },
        FunctionName: { type: Sequelize.STRING(100), allowNull: true },
        ErrorObject: { type: Sequelize.TEXT, allowNull: true },
        CreatedDate: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW },
    },
        {
            sequelize,
            modelName: 'ErrorLog',
            tableName: 'ErrorLog'
        });

    return ErrorLog;
    };


module.exports.User = function () {
    User.init({
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name: {
            type: Sequelize.STRING(100),
            allowNull: true,
        },
        last_name: {
            type: Sequelize.STRING(100),
            allowNull: true,
        },
        email: {
            type: Sequelize.STRING(255),
            allowNull: false,
            unique: true,
        },
        phone: {
            type: Sequelize.STRING(20),
            allowNull: true,
        },
        password: {
            type: Sequelize.STRING(255),
            allowNull: true,
        },
        email_verified: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        kyc_verified: {
            type: Sequelize.BOOLEAN,
            defaultValue: false,
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        updated_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
    }, {
        sequelize,
        modelName: 'users',
        tableName: 'users',
        timestamps: false, // If you want Sequelize to manage timestamps, set this to true
    });

    return User;
};

module.exports.kyc_details = function () {
    kyc_details.init({
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            unique: true,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        document_type: {
            type: Sequelize.STRING(100),
            allowNull: true,
        },
        country_of_issue: {
            type: Sequelize.STRING(100),
            allowNull: true,
        },
        purpose: {
            type: Sequelize.STRING(100),
            allowNull: true,
        },
        occupation: {
            type: Sequelize.STRING(100),
            allowNull: true,
        },
        status: {
            type: Sequelize.STRING(50),
            allowNull: true,
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        updated_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
    }, {
        sequelize,
        modelName: 'kyc_details',
        tableName: 'kyc_details',
        timestamps: false, // Set to true if you want Sequelize to handle createdAt/updatedAt
    });

    return kyc_details;
};

module.exports.Withdraw = function () {
    Withdraw.init({
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        email: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        account: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        plan: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        withdraw_amount: {
            type: Sequelize.DECIMAL(15, 2),
            allowNull: false,
        },
        method: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        requested_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
        status: {
            type: Sequelize.ENUM('pending', 'approved', 'rejected'),
            allowNull: false,
        },
        action: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
        updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
    }, {
        sequelize,
        modelName: 'Withdraw',
        tableName: 'withdraw',
        timestamps: false, // If using Sequelize timestamps, set to true and remove created_at/updated_at manually
    });

    return Withdraw;
};


module.exports.Deposit = function () {
    Deposit.init({
        id: {
            type: Sequelize.BIGINT,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: Sequelize.BIGINT,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        user_name: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING(255),
            allowNull: false,
        },
        account: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        plan: {
            type: Sequelize.STRING(100),
            allowNull: false,
        },
        deposit_amount: {
            type: Sequelize.DECIMAL(15, 2),
            allowNull: false,
        },
        ac_size: {
            type: Sequelize.STRING(50),
            allowNull: true,
        },
        requested_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
        proof: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        status: {
            type: Sequelize.ENUM('pending', 'approved', 'rejected'),
            allowNull: false,
        },
        action: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        created_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
        updated_at: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW,
        },
    }, {
        sequelize,
        modelName: 'Deposit',
        tableName: 'Deposit',
        timestamps: false, // set to true if using Sequelize's built-in timestamps
    });

    return Deposit;
};


module.exports.ClientMasterDetails = function () {
    ClientMasterDetails.init({
           id: {
      type:Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  "Second Holder Bank Acc.Type" : { type: Sequelize.STRING, allowNull: true },
  "Second Holder FATCA": { type: Sequelize.STRING, allowNull: true },
  "Third Holder DOB": { type: Sequelize.STRING, allowNull: true },
    OWNERID: { type: Sequelize.INTEGER }, // assuming primary key
    FEEPAYMENTMODE: { type: Sequelize.STRING, allowNull: true },
    RELMGRID: { type: Sequelize.INTEGER, allowNull: true },
    RMNAME: { type: Sequelize.STRING, allowNull: true },
    FIRSTNAME: { type: Sequelize.STRING, allowNull: true },
    GUARDIANNAME: { type: Sequelize.STRING, allowNull: true },
    INTERMEDIARYNAME: { type: Sequelize.STRING, allowNull: true },
  "Client Bank Account": { type: Sequelize.STRING, allowNull: true },
    PINCODE: { type: Sequelize.STRING, allowNull: true },
    TrxnTakenAs: { type: Sequelize.STRING, allowNull: true },
  "Second Holder DOB":  { type: Sequelize.STRING, allowNull: true },
  "Third Holder RTGS Code":  { type: Sequelize.STRING, allowNull: true },
  "Second Holder NEFT Code": { type: Sequelize.STRING, allowNull: true },
  "First Holder UBO": { type: Sequelize.STRING, allowNull: true },
  "Third Holder Depository": { type: Sequelize.STRING, allowNull: true },
    USERNAME: { type: Sequelize.STRING, allowNull: true },
    MAIL_PINCODE: { type: Sequelize.STRING, allowNull: true },
  "Client Custody AccountId": { type: Sequelize.STRING, allowNull: true },
    BRANCHID: { type: Sequelize.INTEGER, allowNull: true },
    REFCODE6: { type: Sequelize.STRING, allowNull: true },
    REFCODE7: { type: Sequelize.STRING, allowNull: true },
    REFCODE4: { type: Sequelize.STRING, allowNull: true },
  "Second Holder Name": { type: Sequelize.STRING, allowNull: true },
  "Second Holder Depository": { type: Sequelize.STRING, allowNull: true },
  "Third Holder Relation": { type: Sequelize.STRING, allowNull: true },
  "Second Holder Relation": { type: Sequelize.STRING, allowNull: true },
    REFCODE5: { type: Sequelize.STRING, allowNull: true },
    REFCODE2: { type: Sequelize.STRING, allowNull: true },
  "Second Holder DP Client Id": { type: Sequelize.STRING, allowNull: true },
    REFCODE3: { type: Sequelize.STRING, allowNull: true },
    MANDATEMICR: { type: Sequelize.STRING, allowNull: true },
    REFCODE1: { type: Sequelize.STRING, allowNull: true },
    TradingBankAccount: { type: Sequelize.STRING, allowNull: true },
    CLIENTTYPE: { type: Sequelize.STRING, allowNull: true },
  "Third Holder DP Id": { type: Sequelize.STRING, allowNull: true },
    REFCODE8: { type: Sequelize.STRING, allowNull: true },
    REFCODE9: { type: Sequelize.STRING, allowNull: true },

    MAIL_STATE: { type: Sequelize.STRING, allowNull: true },
    MAIL_MOBILE: { type: Sequelize.STRING, allowNull: true },
  "Second Holder Father_Husband": { type: Sequelize.STRING, allowNull: true },
  "DIR2NAME": { type: Sequelize.STRING, allowNull: true },
  "Second Holder RTGS Code": { type: Sequelize.STRING, allowNull: true },
  "DIR3MAPIN": { type: Sequelize.STRING, allowNull: true },
  "JOINT2_PAN": { type: Sequelize.STRING, allowNull: true },
    NATIONALITY: { type: Sequelize.STRING, allowNull: true },
    FIRMNAME: { type: Sequelize.STRING, allowNull: true },
  "JOINT2_NAME": { type: Sequelize.STRING, allowNull: true },
  "Third Holder Micr Number ": { type: Sequelize.STRING, allowNull: true },
    ARNName: { type: Sequelize.STRING, allowNull: true },
    CONTACTNAME: { type: Sequelize.STRING, allowNull: true },
    MANDATEBANKNAME: { type: Sequelize.STRING, allowNull: true },
  "Accountt Closure Date": { type: Sequelize.STRING, allowNull: true },
  "MANDATEBANKNAME": { type: Sequelize.STRING, allowNull: true },
    ModeOfHolding: { type: Sequelize.STRING, allowNull: true },
    FIRMID: { type: Sequelize.INTEGER, allowNull: true },
  "Third Holder Status": { type: Sequelize.STRING, allowNull: true },
    BILLGROUP: { type: Sequelize.STRING, allowNull: true },
  "Third Holder Bank Acc.Type": { type: Sequelize.STRING, allowNull: true },
  "MAIL_PHONEWORK": { type: Sequelize.STRING, allowNull: true },
  "MANDATERTGS":  { type: Sequelize.STRING, allowNull: true },
  "Third Holder Name":  { type: Sequelize.STRING, allowNull: true },
  "Third Holder Occupation":  { type: Sequelize.STRING, allowNull: true },
    MANDATEBANKACCOUNTNO: { type: Sequelize.STRING, allowNull: true },
  "WARD": { type: Sequelize.STRING, allowNull: true },
  "STTTaken As": { type: Sequelize.STRING, allowNull: true },
  "First Holder KYC": { type: Sequelize.STRING, allowNull: true },
  "ACCREDITEDINVESTOR": { type: Sequelize.STRING, allowNull: true },
  "Second Holder Bank Name": { type: Sequelize.STRING, allowNull: true },
  "Client Custody Scheme Code":  { type: Sequelize.STRING, allowNull: true },
  "BROKERACCOUNTID": { type: Sequelize.STRING, allowNull: true },
  "Second Holder Micr Number": { type: Sequelize.STRING, allowNull: true },
  "Third Holder AADHAR": { type: Sequelize.STRING, allowNull: true },
  "Third Holder Bank Account No":  { type: Sequelize.STRING, allowNull: true },
  "MANDATEDPNAME": { type: Sequelize.STRING, allowNull: true },
  "DIR1MAPIN": { type: Sequelize.STRING, allowNull: true },
  "FUNDMGRID": { type: Sequelize.INTEGER, allowNull: true },
  "MAIL_FAX": { type: Sequelize.STRING, allowNull: true },
  "ADVISORID":  { type: Sequelize.INTEGER, allowNull: true },
  "First Holder AADHAR": { type: Sequelize.STRING, allowNull: true },
  "Second Holder Branch Name":  { type: Sequelize.STRING, allowNull: true },
  "JOINT2_FATHER_HUSBAND": { type: Sequelize.STRING, allowNull: true },
  "Second Holder Status": { type: Sequelize.STRING, allowNull: true },
  "MANDATEBANKACCOUNTNO":  { type: Sequelize.STRING, allowNull: true },
  "FATHER_HUSBAND":  { type: Sequelize.STRING, allowNull: true },
    CLIENTCATEGORY: { type: Sequelize.STRING, allowNull: true },
  "Incentive Rate":  { type: Sequelize.STRING, allowNull: true },
    INTERMEDIARYID: { type: Sequelize.INTEGER, allowNull: true },
    AccountingTxn: { type: Sequelize.STRING, allowNull: true },
    CITY: { type: Sequelize.STRING, allowNull: true },
    MAIL_EMAILID: { type: Sequelize.STRING, allowNull: true },
  "CHARGEUPTO":  { type: Sequelize.STRING, allowNull: true },
  "Trading Custody DP": { type: Sequelize.STRING, allowNull: true },
    OCCUPATION: { type: Sequelize.STRING, allowNull: true },
    MANDATENEFT: { type: Sequelize.STRING, allowNull: true },
    CLIENTNAME: { type: Sequelize.STRING, allowNull: true },
  "Third Holder Pan No":  { type: Sequelize.STRING, allowNull: true },
    MOBILE: { type: Sequelize.STRING, allowNull: true },
    MAIL_CITY: { type: Sequelize.STRING, allowNull: true },
  "Third Holder Father_Husband":  { type: Sequelize.STRING, allowNull: true },
  "Client Custody Code": { type: Sequelize.STRING, allowNull: true },
  "Third Holder KYC":  { type: Sequelize.STRING, allowNull: true },
    MAIL_ADDRESS2: { type: Sequelize.STRING, allowNull: true },
    MAIL_ADDRESS1: { type: Sequelize.STRING, allowNull: true },
  "Second Holder AADHAR":  { type: Sequelize.STRING, allowNull: true },
  "Client Custody DP":  { type: Sequelize.STRING, allowNull: true },
    TDSONFEES: { type: Sequelize.STRING, allowNull: true },
    EMAIL: { type: Sequelize.STRING, allowNull: true },
  "Third Holder Branch Name":  { type: Sequelize.STRING, allowNull: true },
  "PHONEWORK":  { type: Sequelize.STRING, allowNull: true },
    SCHEMEID: { type: Sequelize.INTEGER, allowNull: true },
  "Second Holder KYC":  { type: Sequelize.STRING, allowNull: true },
    STATUS: { type: Sequelize.STRING, allowNull: true },
  "MIDDLENAME": { type: Sequelize.STRING, allowNull: true },
    COUNTRY: { type: Sequelize.STRING, allowNull: true },
    SALUTATION: { type: Sequelize.STRING, allowNull: true },
    LASTNAME: { type: Sequelize.STRING, allowNull: true },
    WealthAdvisorName: { type: Sequelize.STRING, allowNull: true },
  "Second Holder Occupation": { type: Sequelize.STRING, allowNull: true },
    CLIENTCODE: { type: Sequelize.STRING, allowNull: true },
    REFCODE10: { type: Sequelize.STRING, allowNull: true },
    ARNID: { type: Sequelize.INTEGER, allowNull: true },
  "Third Holder Gender": { type: Sequelize.STRING, allowNull: true },
    PANNUMBER: { type: Sequelize.STRING, allowNull: true },
  "DIR3NAME":  { type: Sequelize.STRING, allowNull: true },
  "Account Closing Reason":  { type: Sequelize.STRING, allowNull: true },
    OWNERNAME: { type: Sequelize.STRING, allowNull: true },
  "CIRCLE": { type: Sequelize.STRING, allowNull: true },
  "JOINT1_NAME": { type: Sequelize.STRING, allowNull: true },
  "JOINT1_PAN":  { type: Sequelize.STRING, allowNull: true },
    BRANCHNAME: { type: Sequelize.STRING, allowNull: true },
  "Third Holder Bank Name": { type: Sequelize.STRING, allowNull: true },
  "Second Holder Bank Account No":  { type: Sequelize.STRING, allowNull: true },
    SHAREREPORTSFLAG: { type: Sequelize.STRING, allowNull: true },
  "Client Bank Code":  { type: Sequelize.STRING, allowNull: true },
    MANDATEBANKACCOUNTTYPE: { type: Sequelize.STRING, allowNull: true },
  "TANNUMBER": { type: Sequelize.STRING, allowNull: true },
  "Third Holder UBO": { type: Sequelize.STRING, allowNull: true },
    FUNDMGRNAME: { type: Sequelize.STRING, allowNull: true },
  "Third Holder DP Name":  { type: Sequelize.STRING, allowNull: true },
    DAILYEXPENSEACCRUAL: { type: Sequelize.STRING, allowNull: true },
  "Second Holder DP Id": { type: Sequelize.STRING, allowNull: true },
    SCHEMENAME: { type: Sequelize.STRING, allowNull: true },
  "Head of Family":{ type: Sequelize.STRING, allowNull: true },
  "MANDATEDEPOSITORY":  { type: Sequelize.STRING, allowNull: true },
    NOMINEENAME: { type: Sequelize.STRING, allowNull: true },
    WealthAdvisorid: { type: Sequelize.INTEGER, allowNull: true },
    ACCOUNTTYPE: { type: Sequelize.STRING, allowNull: true },
  "Second Holder UBO":  { type: Sequelize.STRING, allowNull: true },
  "MATURITYDATE":  { type: Sequelize.STRING, allowNull: true },
    STATE: { type: Sequelize.STRING, allowNull: true },
    ADVISORNAME: { type: Sequelize.STRING, allowNull: true },
  "Third Holder FATCA": { type: Sequelize.STRING, allowNull: true },
  "Second Holder Gender":  { type: Sequelize.STRING, allowNull: true },
    BIRTHDATE: { type: Sequelize.STRING, allowNull: true },
  "DIR2MAPIN": { type: Sequelize.STRING, allowNull: true },
  "Skip from MF corporate action": { type: Sequelize.STRING, allowNull: true },
  "DIR1NAME": { type: Sequelize.STRING, allowNull: true },
    AccountOpenDate: { type: Sequelize.STRING, allowNull: true },
    GROUPNAME: { type: Sequelize.STRING, allowNull: true },
  "Third Holder NEFT Code":  { type: Sequelize.STRING, allowNull: true },
  "MANDATEDP":  { type: Sequelize.STRING, allowNull: true },
    INCENTIVE: { type: Sequelize.STRING, allowNull: true },
    ADDRESS1: { type: Sequelize.STRING, allowNull: true },
    ADDRESS2: { type: Sequelize.STRING, allowNull: true },
  "Third Holder DP Client Id": { type: Sequelize.STRING, allowNull: true },
    CAPITAL_COMMITTED: { type: Sequelize.DOUBLE, allowNull: true },
    INCEPTIONDATE: { type: Sequelize.STRING, allowNull: true },
    FirstHolderGender: { type: Sequelize.STRING, allowNull: true },
  "Trading Custody AccountId": { type: Sequelize.STRING, allowNull: true },
    PHONEHOME: { type: Sequelize.STRING, allowNull: true },
    TradingBankCode: { type: Sequelize.STRING, allowNull: true },
  "Trading Bank Code":  { type: Sequelize.STRING, allowNull: true },
  "Second Holder Pan":  { type: Sequelize.STRING, allowNull: true },
  "Second Holder DP Name":  { type: Sequelize.STRING, allowNull: true },
    CLIENTID: { type: Sequelize.INTEGER, allowNull: true },
  "First Holder FATCA": { type: Sequelize.STRING, allowNull: true },
    PERFORMANCEREPORTINGDATE: { type: Sequelize.STRING, allowNull: true },
    GROUPID: { type: Sequelize.INTEGER, allowNull: true },
    FAX: { type: Sequelize.STRING, allowNull: true },
   JOINT1_FATHER_HUSBAND : { type: Sequelize.STRING, allowNull: true },
  ISACTIVE: { type: Sequelize.BOOLEAN, allowNull: true },
        CreatedDate: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW },
        ModifiedDate: { type: Sequelize.DATE, allowNull: true }
    }, {
        sequelize,
        modelName: 'ClientMasterDetails',
        tableName: 'ClientMasterDetails'
    });

    return ClientMasterDetails;
};

module.exports.ClientMasterDetailsHistory = function () {
    ClientMasterDetailsHistory.init({
           id: {
      type:Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  "Second Holder Bank Acc.Type" : { type: Sequelize.STRING, allowNull: true },
  "Second Holder FATCA": { type: Sequelize.STRING, allowNull: true },
  "Third Holder DOB": { type: Sequelize.STRING, allowNull: true },
    OWNERID: { type: Sequelize.INTEGER }, // assuming primary key
    FEEPAYMENTMODE: { type: Sequelize.STRING, allowNull: true },
    RELMGRID: { type: Sequelize.INTEGER, allowNull: true },
    RMNAME: { type: Sequelize.STRING, allowNull: true },
    FIRSTNAME: { type: Sequelize.STRING, allowNull: true },
    GUARDIANNAME: { type: Sequelize.STRING, allowNull: true },
    INTERMEDIARYNAME: { type: Sequelize.STRING, allowNull: true },
  "Client Bank Account": { type: Sequelize.STRING, allowNull: true },
    PINCODE: { type: Sequelize.STRING, allowNull: true },
    TrxnTakenAs: { type: Sequelize.STRING, allowNull: true },
  "Second Holder DOB":  { type: Sequelize.STRING, allowNull: true },
  "Third Holder RTGS Code":  { type: Sequelize.STRING, allowNull: true },
  "Second Holder NEFT Code": { type: Sequelize.STRING, allowNull: true },
  "First Holder UBO": { type: Sequelize.STRING, allowNull: true },
  "Third Holder Depository": { type: Sequelize.STRING, allowNull: true },
    USERNAME: { type: Sequelize.STRING, allowNull: true },
    MAIL_PINCODE: { type: Sequelize.STRING, allowNull: true },
  "Client Custody AccountId": { type: Sequelize.STRING, allowNull: true },
    BRANCHID: { type: Sequelize.INTEGER, allowNull: true },
    REFCODE6: { type: Sequelize.STRING, allowNull: true },
    REFCODE7: { type: Sequelize.STRING, allowNull: true },
    REFCODE4: { type: Sequelize.STRING, allowNull: true },
  "Second Holder Name": { type: Sequelize.STRING, allowNull: true },
  "Second Holder Depository": { type: Sequelize.STRING, allowNull: true },
  "Third Holder Relation": { type: Sequelize.STRING, allowNull: true },
  "Second Holder Relation": { type: Sequelize.STRING, allowNull: true },
    REFCODE5: { type: Sequelize.STRING, allowNull: true },
    REFCODE2: { type: Sequelize.STRING, allowNull: true },
  "Second Holder DP Client Id": { type: Sequelize.STRING, allowNull: true },
    REFCODE3: { type: Sequelize.STRING, allowNull: true },
    MANDATEMICR: { type: Sequelize.STRING, allowNull: true },
    REFCODE1: { type: Sequelize.STRING, allowNull: true },
    TradingBankAccount: { type: Sequelize.STRING, allowNull: true },
    CLIENTTYPE: { type: Sequelize.STRING, allowNull: true },
  "Third Holder DP Id": { type: Sequelize.STRING, allowNull: true },
    REFCODE8: { type: Sequelize.STRING, allowNull: true },
    REFCODE9: { type: Sequelize.STRING, allowNull: true },

    MAIL_STATE: { type: Sequelize.STRING, allowNull: true },
    MAIL_MOBILE: { type: Sequelize.STRING, allowNull: true },
  "Second Holder Father_Husband": { type: Sequelize.STRING, allowNull: true },
  "DIR2NAME": { type: Sequelize.STRING, allowNull: true },
  "Second Holder RTGS Code": { type: Sequelize.STRING, allowNull: true },
  "DIR3MAPIN": { type: Sequelize.STRING, allowNull: true },
  "JOINT2_PAN": { type: Sequelize.STRING, allowNull: true },
    NATIONALITY: { type: Sequelize.STRING, allowNull: true },
    FIRMNAME: { type: Sequelize.STRING, allowNull: true },
  "JOINT2_NAME": { type: Sequelize.STRING, allowNull: true },
  "Third Holder Micr Number ": { type: Sequelize.STRING, allowNull: true },
    ARNName: { type: Sequelize.STRING, allowNull: true },
    CONTACTNAME: { type: Sequelize.STRING, allowNull: true },
    MANDATEBANKNAME: { type: Sequelize.STRING, allowNull: true },
  "Accountt Closure Date": { type: Sequelize.STRING, allowNull: true },
  "MANDATEBANKNAME": { type: Sequelize.STRING, allowNull: true },
    ModeOfHolding: { type: Sequelize.STRING, allowNull: true },
    FIRMID: { type: Sequelize.INTEGER, allowNull: true },
  "Third Holder Status": { type: Sequelize.STRING, allowNull: true },
    BILLGROUP: { type: Sequelize.STRING, allowNull: true },
  "Third Holder Bank Acc.Type": { type: Sequelize.STRING, allowNull: true },
  "MAIL_PHONEWORK": { type: Sequelize.STRING, allowNull: true },
  "MANDATERTGS":  { type: Sequelize.STRING, allowNull: true },
  "Third Holder Name":  { type: Sequelize.STRING, allowNull: true },
  "Third Holder Occupation":  { type: Sequelize.STRING, allowNull: true },
    MANDATEBANKACCOUNTNO: { type: Sequelize.STRING, allowNull: true },
  "WARD": { type: Sequelize.STRING, allowNull: true },
  "STTTaken As": { type: Sequelize.STRING, allowNull: true },
  "First Holder KYC": { type: Sequelize.STRING, allowNull: true },
  "ACCREDITEDINVESTOR": { type: Sequelize.STRING, allowNull: true },
  "Second Holder Bank Name": { type: Sequelize.STRING, allowNull: true },
  "Client Custody Scheme Code":  { type: Sequelize.STRING, allowNull: true },
  "BROKERACCOUNTID": { type: Sequelize.STRING, allowNull: true },
  "Second Holder Micr Number": { type: Sequelize.STRING, allowNull: true },
  "Third Holder AADHAR": { type: Sequelize.STRING, allowNull: true },
  "Third Holder Bank Account No":  { type: Sequelize.STRING, allowNull: true },
  "MANDATEDPNAME": { type: Sequelize.STRING, allowNull: true },
  "DIR1MAPIN": { type: Sequelize.STRING, allowNull: true },
  "FUNDMGRID": { type: Sequelize.INTEGER, allowNull: true },
  "MAIL_FAX": { type: Sequelize.STRING, allowNull: true },
  "ADVISORID":  { type: Sequelize.INTEGER, allowNull: true },
  "First Holder AADHAR": { type: Sequelize.STRING, allowNull: true },
  "Second Holder Branch Name":  { type: Sequelize.STRING, allowNull: true },
  "JOINT2_FATHER_HUSBAND": { type: Sequelize.STRING, allowNull: true },
  "Second Holder Status": { type: Sequelize.STRING, allowNull: true },
  "MANDATEBANKACCOUNTNO":  { type: Sequelize.STRING, allowNull: true },
  "FATHER_HUSBAND":  { type: Sequelize.STRING, allowNull: true },
    CLIENTCATEGORY: { type: Sequelize.STRING, allowNull: true },
  "Incentive Rate":  { type: Sequelize.STRING, allowNull: true },
    INTERMEDIARYID: { type: Sequelize.INTEGER, allowNull: true },
    AccountingTxn: { type: Sequelize.STRING, allowNull: true },
    CITY: { type: Sequelize.STRING, allowNull: true },
    MAIL_EMAILID: { type: Sequelize.STRING, allowNull: true },
  "CHARGEUPTO":  { type: Sequelize.STRING, allowNull: true },
  "Trading Custody DP": { type: Sequelize.STRING, allowNull: true },
    OCCUPATION: { type: Sequelize.STRING, allowNull: true },
    MANDATENEFT: { type: Sequelize.STRING, allowNull: true },
    CLIENTNAME: { type: Sequelize.STRING, allowNull: true },
  "Third Holder Pan No":  { type: Sequelize.STRING, allowNull: true },
    MOBILE: { type: Sequelize.STRING, allowNull: true },
    MAIL_CITY: { type: Sequelize.STRING, allowNull: true },
  "Third Holder Father_Husband":  { type: Sequelize.STRING, allowNull: true },
  "Client Custody Code": { type: Sequelize.STRING, allowNull: true },
  "Third Holder KYC":  { type: Sequelize.STRING, allowNull: true },
    MAIL_ADDRESS2: { type: Sequelize.STRING, allowNull: true },
    MAIL_ADDRESS1: { type: Sequelize.STRING, allowNull: true },
  "Second Holder AADHAR":  { type: Sequelize.STRING, allowNull: true },
  "Client Custody DP":  { type: Sequelize.STRING, allowNull: true },
    TDSONFEES: { type: Sequelize.STRING, allowNull: true },
    EMAIL: { type: Sequelize.STRING, allowNull: true },
  "Third Holder Branch Name":  { type: Sequelize.STRING, allowNull: true },
  "PHONEWORK":  { type: Sequelize.STRING, allowNull: true },
    SCHEMEID: { type: Sequelize.INTEGER, allowNull: true },
  "Second Holder KYC":  { type: Sequelize.STRING, allowNull: true },
    STATUS: { type: Sequelize.STRING, allowNull: true },
  "MIDDLENAME": { type: Sequelize.STRING, allowNull: true },
    COUNTRY: { type: Sequelize.STRING, allowNull: true },
    SALUTATION: { type: Sequelize.STRING, allowNull: true },
    LASTNAME: { type: Sequelize.STRING, allowNull: true },
    WealthAdvisorName: { type: Sequelize.STRING, allowNull: true },
  "Second Holder Occupation": { type: Sequelize.STRING, allowNull: true },
    CLIENTCODE: { type: Sequelize.STRING, allowNull: true },
    REFCODE10: { type: Sequelize.STRING, allowNull: true },
    ARNID: { type: Sequelize.INTEGER, allowNull: true },
  "Third Holder Gender": { type: Sequelize.STRING, allowNull: true },
    PANNUMBER: { type: Sequelize.STRING, allowNull: true },
  "DIR3NAME":  { type: Sequelize.STRING, allowNull: true },
  "Account Closing Reason":  { type: Sequelize.STRING, allowNull: true },
    OWNERNAME: { type: Sequelize.STRING, allowNull: true },
  "CIRCLE": { type: Sequelize.STRING, allowNull: true },
  "JOINT1_NAME": { type: Sequelize.STRING, allowNull: true },
  "JOINT1_PAN":  { type: Sequelize.STRING, allowNull: true },
    BRANCHNAME: { type: Sequelize.STRING, allowNull: true },
  "Third Holder Bank Name": { type: Sequelize.STRING, allowNull: true },
  "Second Holder Bank Account No":  { type: Sequelize.STRING, allowNull: true },
    SHAREREPORTSFLAG: { type: Sequelize.STRING, allowNull: true },
  "Client Bank Code":  { type: Sequelize.STRING, allowNull: true },
    MANDATEBANKACCOUNTTYPE: { type: Sequelize.STRING, allowNull: true },
  "TANNUMBER": { type: Sequelize.STRING, allowNull: true },
  "Third Holder UBO": { type: Sequelize.STRING, allowNull: true },
    FUNDMGRNAME: { type: Sequelize.STRING, allowNull: true },
  "Third Holder DP Name":  { type: Sequelize.STRING, allowNull: true },
    DAILYEXPENSEACCRUAL: { type: Sequelize.STRING, allowNull: true },
  "Second Holder DP Id": { type: Sequelize.STRING, allowNull: true },
    SCHEMENAME: { type: Sequelize.STRING, allowNull: true },
  "Head of Family":{ type: Sequelize.STRING, allowNull: true },
  "MANDATEDEPOSITORY":  { type: Sequelize.STRING, allowNull: true },
    NOMINEENAME: { type: Sequelize.STRING, allowNull: true },
    WealthAdvisorid: { type: Sequelize.INTEGER, allowNull: true },
    ACCOUNTTYPE: { type: Sequelize.STRING, allowNull: true },
  "Second Holder UBO":  { type: Sequelize.STRING, allowNull: true },
  "MATURITYDATE":  { type: Sequelize.STRING, allowNull: true },
    STATE: { type: Sequelize.STRING, allowNull: true },
    ADVISORNAME: { type: Sequelize.STRING, allowNull: true },
  "Third Holder FATCA": { type: Sequelize.STRING, allowNull: true },
  "Second Holder Gender":  { type: Sequelize.STRING, allowNull: true },
    BIRTHDATE: { type: Sequelize.STRING, allowNull: true },
  "DIR2MAPIN": { type: Sequelize.STRING, allowNull: true },
  "Skip from MF corporate action": { type: Sequelize.STRING, allowNull: true },
  "DIR1NAME": { type: Sequelize.STRING, allowNull: true },
    AccountOpenDate: { type: Sequelize.STRING, allowNull: true },
    GROUPNAME: { type: Sequelize.STRING, allowNull: true },
  "Third Holder NEFT Code":  { type: Sequelize.STRING, allowNull: true },
  "MANDATEDP":  { type: Sequelize.STRING, allowNull: true },
    INCENTIVE: { type: Sequelize.STRING, allowNull: true },
    ADDRESS1: { type: Sequelize.STRING, allowNull: true },
    ADDRESS2: { type: Sequelize.STRING, allowNull: true },
  "Third Holder DP Client Id": { type: Sequelize.STRING, allowNull: true },
    CAPITAL_COMMITTED: { type: Sequelize.DOUBLE, allowNull: true },
    INCEPTIONDATE: { type: Sequelize.STRING, allowNull: true },
    FirstHolderGender: { type: Sequelize.STRING, allowNull: true },
  "Trading Custody AccountId": { type: Sequelize.STRING, allowNull: true },
    PHONEHOME: { type: Sequelize.STRING, allowNull: true },
    TradingBankCode: { type: Sequelize.STRING, allowNull: true },
  "Trading Bank Code":  { type: Sequelize.STRING, allowNull: true },
  "Second Holder Pan":  { type: Sequelize.STRING, allowNull: true },
  "Second Holder DP Name":  { type: Sequelize.STRING, allowNull: true },
    CLIENTID: { type: Sequelize.INTEGER, allowNull: true },
  "First Holder FATCA": { type: Sequelize.STRING, allowNull: true },
    PERFORMANCEREPORTINGDATE: { type: Sequelize.STRING, allowNull: true },
    GROUPID: { type: Sequelize.INTEGER, allowNull: true },
    FAX: { type: Sequelize.STRING, allowNull: true },
    JOINT1_FATHER_HUSBAND : { type: Sequelize.STRING, allowNull: true },
         ISACTIVE: { type: Sequelize.BOOLEAN, allowNull: true },
        CreatedDate: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW },
        ModifiedDate: { type: Sequelize.DATE, allowNull: true }
    }, {
        sequelize,
        modelName: 'ClientMasterDetailsHistory',
        tableName: 'ClientMasterDetailsHistory'
    });

    return ClientMasterDetailsHistory;
};


module.exports.ClientUploadDetails = function () {
    ClientUploadDetails.init({
     id: { type:Sequelize.INTEGER,  primaryKey: true, autoIncrement: true, },
   MAILH1ADD1: { type: Sequelize.STRING(2000), allowNull: true },
  MAILH1ADD2: { type: Sequelize.STRING(2000), allowNull: true },
  GROUPCONTACT: { type: Sequelize.STRING(200), allowNull: true },
  TAXABLE: { type: Sequelize.STRING(100), allowNull: true },
  GUARDIANNAME: { type: Sequelize.STRING(200), allowNull: true },
  PINCODE: { type: Sequelize.STRING(20), allowNull: true },
  BANKNAME3: { type: Sequelize.STRING(200), allowNull: true },
  TXNFEETAKENAS: { type: Sequelize.STRING(100), allowNull: true },
  RELATION3: { type: Sequelize.STRING(200), allowNull: true },
  RELATION2: { type: Sequelize.STRING(200), allowNull: true },
  BASEFUNDID: { type: Sequelize.INTEGER, allowNull: true, defaultValue: 0 },
  GUARDIANSTATE: { type: Sequelize.STRING(100), allowNull: true },
  BANKNAME1: { type: Sequelize.STRING(200), allowNull: true },
  CIRCLE1: { type: Sequelize.STRING(200), allowNull: true },
  BANKNAME2: { type: Sequelize.STRING(200), allowNull: true },
  REFCODE6: { type: Sequelize.STRING(50), allowNull: true },
  EQUITY_DEB: { type: Sequelize.STRING(200), allowNull: true },
  REFCODE7: { type: Sequelize.STRING(50), allowNull: true },
  REFCODE4: { type: Sequelize.STRING(100), allowNull: true },
  REFCODE5: { type: Sequelize.STRING(50), allowNull: true },
  REFCODE2: { type: Sequelize.STRING(50), allowNull: true },
  REFCODE3: { type: Sequelize.STRING(200), allowNull: true },
  REFCODE1: { type: Sequelize.STRING(200), allowNull: true },
  OPTIONS: { type: Sequelize.STRING(200), allowNull: true },
  REFCODE8: { type: Sequelize.STRING(50), allowNull: true },
  INTERMEDIARY: { type: Sequelize.STRING(100), allowNull: true },
  REFCODE9: { type: Sequelize.STRING(200), allowNull: true },
  POOLMAPIN: { type: Sequelize.STRING(100), allowNull: true },
  PARENTFUNDID: { type: Sequelize.INTEGER, allowNull: true, defaultValue: 0 },
  ONLYLOWESTCLASSIFY: { type: Sequelize.STRING(100), allowNull: true },
  H2UBO: { type: Sequelize.STRING(100), allowNull: true },
  SHAREREPORTS: { type: Sequelize.STRING(10), allowNull: true },
  FUTURES: { type: Sequelize.STRING(100), allowNull: true },
  MAILH1FAX: { type: Sequelize.STRING(100), allowNull: true },
  NATIONALITY: { type: Sequelize.STRING(100), allowNull: true },
  NOMINEEPIN: { type: Sequelize.STRING(20), allowNull: true },
  CAPITALCOMMITED: { type: Sequelize.INTEGER, allowNull: true, defaultValue: 0 },
  FIRMID: { type: Sequelize.INTEGER, allowNull: true, defaultValue: 0 },
  NGPAN: { type: Sequelize.STRING(20), allowNull: true },
  OPERATIONTYPE: { type: Sequelize.STRING(100), allowNull: true },
  BILLGROUP: { type: Sequelize.STRING(100), allowNull: true },
  H2FATCA: { type: Sequelize.STRING(100), allowNull: true },
  CLIENTRIGHTS: { type: Sequelize.STRING(200), allowNull: true },
  NEFT3: { type: Sequelize.STRING(100), allowNull: true },
  NEFT2: { type: Sequelize.STRING(100), allowNull: true },
  RISKPROFILENAME: { type: Sequelize.STRING(200), allowNull: true },
  CATEGORYCODE: { type: Sequelize.STRING(50), allowNull: true },
  NEFT1: { type: Sequelize.STRING(100), allowNull: true },
  BASENAV: { type: Sequelize.STRING(100), allowNull: true },
  USER_NAME: { type: Sequelize.STRING(100), allowNull: true },
  H1CKYC: { type: Sequelize.STRING(50), allowNull: true },
  OCCUPATION: { type: Sequelize.STRING(100), allowNull: true },
  BOND_DEB: { type: Sequelize.STRING(200), allowNull: true },
  PAN: { type: Sequelize.STRING(20), allowNull: true },
  ACCOUNTCODE: { type: Sequelize.STRING(100), allowNull: true },
  GUARDIANPIN: { type: Sequelize.STRING(20), allowNull: true },
  MAILH1MOBILE: { type: Sequelize.STRING(20), allowNull: true },
  MAPINID: { type: Sequelize.STRING(100), allowNull: true },
  EMAIL: { type: Sequelize.STRING(200), allowNull: true },
  NOMINEESTATE: { type: Sequelize.STRING(100), allowNull: true },
  DEPID: { type: Sequelize.STRING(100), allowNull: true },
  COUNTRY: { type: Sequelize.STRING(100), allowNull: true },
  PERFREPORTDATE: { type: Sequelize.STRING(20), allowNull: true }, // date as string (change if needed)
  H3UBO: { type: Sequelize.STRING(100), allowNull: true },
  OTHER_ASSETS: { type: Sequelize.STRING(200), allowNull: true },
  BANKACTYPE1: { type: Sequelize.STRING(100), allowNull: true },
  BANKACTYPE2: { type: Sequelize.STRING(100), allowNull: true },
  BANKACTYPE3: { type: Sequelize.STRING(100), allowNull: true },
  INCCATG: { type: Sequelize.STRING(100), allowNull: true },
  RMRIGHTS: { type: Sequelize.STRING(100), allowNull: true },
  MAXCHARGE: { type: Sequelize.INTEGER, allowNull: true, defaultValue: 0 },
  MAILH1PIN: { type: Sequelize.STRING(20), allowNull: true },
  ACCOUNTINGTXN: { type: Sequelize.STRING(100), allowNull: true },
  BANKACTYPE: { type: Sequelize.STRING(100), allowNull: true },
  NOMINEENAME: { type: Sequelize.STRING(200), allowNull: true },
  ACCOUNTTYPE: { type: Sequelize.STRING(100), allowNull: true },
  STATE: { type: Sequelize.STRING(100), allowNull: true },
  NOMINEEFAX: { type: Sequelize.STRING(100), allowNull: true },
  H3FATCA: { type: Sequelize.STRING(100), allowNull: true },
  NOMINEERELATION: { type: Sequelize.STRING(200), allowNull: true },
  SCHEME: { type: Sequelize.STRING(200), allowNull: true },
  NGDOB: { type: Sequelize.STRING(20), allowNull: true }, // Date string format
  MAILPHONEWORK: { type: Sequelize.STRING(20), allowNull: true },
  GROUPNAME: { type: Sequelize.STRING(200), allowNull: true },
  MICR3: { type: Sequelize.STRING(100), allowNull: true },
  MICR2: { type: Sequelize.STRING(100), allowNull: true },
  MICR1: { type: Sequelize.STRING(100), allowNull: true },
  MAILH1PHONE: { type: Sequelize.STRING(20), allowNull: true },
  BRANCH: { type: Sequelize.STRING(100), allowNull: true },
  H2CKYC: { type: Sequelize.STRING(100), allowNull: true },
  GUARDIAN: { type: Sequelize.STRING(200), allowNull: true },
  CLIENTID: { type: Sequelize.STRING(100), allowNull: true },
  BANKCODE2: { type: Sequelize.STRING(100), allowNull: true },
  TAN1: { type: Sequelize.STRING(50), allowNull: true },
  FAX: { type: Sequelize.STRING(50), allowNull: true },
  ADVISOR: { type: Sequelize.STRING(100), allowNull: true },
  MAILH1CITY: { type: Sequelize.STRING(100), allowNull: true },
  PERFCLASSIFYDAILY: { type: Sequelize.STRING(100), allowNull: true },
  RELMGR: { type: Sequelize.STRING(100), allowNull: true },
  ARNNO: { type: Sequelize.STRING(100), allowNull: true },
  FIRSTNAME: { type: Sequelize.STRING(100), allowNull: true },
  GUARDIANFAX: { type: Sequelize.STRING(100), allowNull: true },
  H3CKYC: { type: Sequelize.STRING(100), allowNull: true },
  DPCLIENTID: { type: Sequelize.STRING(100), allowNull: true },
  H1MODEOFHOLDING: { type: Sequelize.STRING(100), allowNull: true },
  DP1: { type: Sequelize.STRING(100), allowNull: true },
  BANKACID: { type: Sequelize.STRING(100), allowNull: true },
  DP3: { type: Sequelize.STRING(100), allowNull: true },
  BANKNAME: { type: Sequelize.STRING(100), allowNull: true },
 RELMAPPING1: { type: Sequelize.STRING(100), allowNull: true },
DP2: { type: Sequelize.STRING(100), allowNull: true },
WEALTHADVISORNAME: { type: Sequelize.STRING(100), allowNull: true },
DEPCODE: { type: Sequelize.STRING(100), allowNull: true },
GUARDIANPHONE: { type: Sequelize.STRING(100), allowNull: true },
FUNDLEVEL: { type: Sequelize.STRING(100), allowNull: true },
H3AADHAR: { type: Sequelize.STRING(100), allowNull: true },
ACCREDITEDINVESTOR: { type: Sequelize.STRING(100), allowNull: true },
BANKBRANCHNAME: { type: Sequelize.STRING(100), allowNull: true },
NAME3: { type: Sequelize.STRING(100), allowNull: true },
NGUBO: { type: Sequelize.STRING(100), allowNull: true },
NAME2: { type: Sequelize.STRING(100), allowNull: true },
PAN2: { type: Sequelize.STRING(100), allowNull: true },
NOMINEEADD2: { type: Sequelize.STRING(100), allowNull: true },
GUARDIANADD1: { type: Sequelize.STRING(100), allowNull: true },
HOFRESTRICTED: { type: Sequelize.STRING(100), allowNull: true },
  MAILH1STATE: { type: Sequelize.STRING(100), allowNull: true },
 PAN3: { type: Sequelize.STRING(100), allowNull: true },
  NOMINEEADD1: { type: Sequelize.STRING(100), allowNull: true },
 GUARDIANADD2: { type: Sequelize.STRING(100), allowNull: true },
 CITY: { type: Sequelize.STRING(100), allowNull: true },
GROUPCODE: { type: Sequelize.STRING(100), allowNull: true },
 STTTAKENAS: { type: Sequelize.STRING(100), allowNull: true },
  BANKBRANCH2: { type: Sequelize.STRING(100), allowNull: true },
  BANKBRANCH3: { type: Sequelize.STRING(100), allowNull: true },
  NOMDOB: { type: Sequelize.STRING(100), allowNull: true },
  BANKBRANCH1: { type: Sequelize.STRING(100), allowNull: true },
  "MOBILE": { type: Sequelize.STRING(100), allowNull: true },
  HOFFLAG: { type: Sequelize.STRING(100), allowNull: true },
  NOMINEEPHONE: { type: Sequelize.STRING(100), allowNull: true },
  MODELPORTFOLIO: { type: Sequelize.STRING(100), allowNull: true },
  PLANALLOWED: { type: Sequelize.STRING(100), allowNull: true },
  DPID2: { type: Sequelize.STRING(100), allowNull: true },
  DPID1: { type: Sequelize.STRING(100), allowNull: true },
 NGCKYC: { type: Sequelize.STRING(100), allowNull: true },
  DPCLIENTID2: { type: Sequelize.STRING(100), allowNull: true },
  PHONEWORK: { type: Sequelize.STRING(100), allowNull: true },
DPCLIENTID3: { type: Sequelize.STRING(100), allowNull: true },
  DPID3: { type: Sequelize.STRING(100), allowNull: true },
 GENDER3: { type: Sequelize.STRING(100), allowNull: true },
  STATUS: { type: Sequelize.STRING(100), allowNull: true },
  GENDER2: { type: Sequelize.STRING(100), allowNull: true },
 MIDDLENAME: { type: Sequelize.STRING(100), allowNull: true },
  AUTOMAIL: { type: Sequelize.STRING(100), allowNull: true },
  SALUTATION: { type: Sequelize.STRING(100), allowNull: true },
  LASTNAME: { type: Sequelize.STRING(100), allowNull: true },
  H1FATCA: { type: Sequelize.STRING(100), allowNull: true },
  MF: { type: Sequelize.STRING(100), allowNull: true },
  REFCODE10: { type: Sequelize.STRING(100), allowNull: true },
  FH1: { type: Sequelize.STRING(100), allowNull: true },
  FH3: { type: Sequelize.STRING(100), allowNull: true },
FH2: { type: Sequelize.STRING(100), allowNull: true },
 NGFATCA: { type: Sequelize.STRING(100), allowNull: true },
  FMRIGHTS: { type: Sequelize.STRING(100), allowNull: true },
  MAILH1EMAILID: { type: Sequelize.STRING(100), allowNull: true },
 SHARES: { type: Sequelize.STRING(100), allowNull: true },
 NOMPAN: { type: Sequelize.STRING(100), allowNull: true },
  PHONE: { type: Sequelize.STRING(100), allowNull: true },
 MATURITYDATE: { type: Sequelize.STRING(100), allowNull: true },
  ADD1: { type: Sequelize.STRING(200), allowNull: true },
  ADVISORRIGHTS: { type: Sequelize.STRING(100), allowNull: true },
  ADD2: { type: Sequelize.STRING(20), allowNull: true },
  H2AADHAR: { type: Sequelize.STRING(100), allowNull: true },
  H1UBO: { type: Sequelize.STRING(100), allowNull: true },
  GENDER: { type: Sequelize.STRING(100), allowNull: true },
  NGAADHAR: { type: Sequelize.STRING(50), allowNull: true },
  RECOPRODUCT: { type: Sequelize.STRING(200), allowNull: true },
  BIRTHDATE1: { type: Sequelize.STRING(20), allowNull: true },
  WARD1: { type: Sequelize.STRING(20), allowNull: true },
  BIRTHDATE2: { type: Sequelize.STRING(100), allowNull: true },
  BIRTHDATE3: { type: Sequelize.STRING(100), allowNull: true },
  INCEPTIONDATE: { type: Sequelize.STRING(200), allowNull: true },
 RTGS1: { type: Sequelize.STRING(200), allowNull: true },
  DPNAME3: { type: Sequelize.STRING(200), allowNull: true },
  RTGS2: { type: Sequelize.STRING(200), allowNull: true },
  DPNAME2: { type: Sequelize.STRING(200), allowNull: true },
  GUARDIANCITY: { type: Sequelize.STRING(200), allowNull: true },
  RTGS3: { type: Sequelize.STRING(200), allowNull: true },
  NOMINEECITY: { type: Sequelize.STRING(200), allowNull: true },
 DPCLIENTID1: { type: Sequelize.STRING(200), allowNull: true },
  BANKCODE: { type: Sequelize.STRING(200), allowNull: true },
  H1AADHAR: { type: Sequelize.STRING(200), allowNull: true },
 BANKACID3: { type: Sequelize.STRING(200), allowNull: true },
  BANKACID1: { type: Sequelize.STRING(200), allowNull: true },
  BANKACID2: { type: Sequelize.STRING(200), allowNull: true },
 ISACTIVE: { type: Sequelize.BOOLEAN, allowNull: true },
    CreatedDate: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW },
    ModifiedDate: { type: Sequelize.DATE, allowNull: true }
  }, {
  
      sequelize,
        modelName: 'ClientUploadDetails',
        tableName: 'ClientUploadDetails',
        timestamps: false, // Set to true if you want Sequelize to handle createdAt/updatedAt
  });

  return ClientUploadDetails;
};


module.exports.ClientUploadHistoryDetails = function () {
    ClientUploadHistoryDetails.init({
     id: { type:Sequelize.INTEGER,  primaryKey: true, autoIncrement: true, },
   MAILH1ADD1: { type: Sequelize.STRING(2000), allowNull: true },
  MAILH1ADD2: { type: Sequelize.STRING(2000), allowNull: true },
  GROUPCONTACT: { type: Sequelize.STRING(200), allowNull: true },
  TAXABLE: { type: Sequelize.STRING(100), allowNull: true },
  GUARDIANNAME: { type: Sequelize.STRING(200), allowNull: true },
  PINCODE: { type: Sequelize.STRING(20), allowNull: true },
  BANKNAME3: { type: Sequelize.STRING(200), allowNull: true },
  TXNFEETAKENAS: { type: Sequelize.STRING(10), allowNull: true },
  RELATION3: { type: Sequelize.STRING(200), allowNull: true },
  RELATION2: { type: Sequelize.STRING(200), allowNull: true },
  BASEFUNDID: { type: Sequelize.INTEGER, allowNull: true, defaultValue: 0 },
  GUARDIANSTATE: { type: Sequelize.STRING(100), allowNull: true },
  BANKNAME1: { type: Sequelize.STRING(200), allowNull: true },
  CIRCLE1: { type: Sequelize.STRING(200), allowNull: true },
  BANKNAME2: { type: Sequelize.STRING(200), allowNull: true },
  REFCODE6: { type: Sequelize.STRING(50), allowNull: true },
  EQUITY_DEB: { type: Sequelize.STRING(200), allowNull: true },
  REFCODE7: { type: Sequelize.STRING(50), allowNull: true },
  REFCODE4: { type: Sequelize.STRING(100), allowNull: true },
  REFCODE5: { type: Sequelize.STRING(50), allowNull: true },
  REFCODE2: { type: Sequelize.STRING(50), allowNull: true },
  REFCODE3: { type: Sequelize.STRING(200), allowNull: true },
  REFCODE1: { type: Sequelize.STRING(200), allowNull: true },
  OPTIONS: { type: Sequelize.STRING(200), allowNull: true },
  REFCODE8: { type: Sequelize.STRING(50), allowNull: true },
  INTERMEDIARY: { type: Sequelize.STRING(100), allowNull: true },
  REFCODE9: { type: Sequelize.STRING(200), allowNull: true },
  POOLMAPIN: { type: Sequelize.STRING(100), allowNull: true },
  PARENTFUNDID: { type: Sequelize.INTEGER, allowNull: true, defaultValue: 0 },
  ONLYLOWESTCLASSIFY: { type: Sequelize.STRING(100), allowNull: true },
  H2UBO: { type: Sequelize.STRING(10), allowNull: true },
  SHAREREPORTS: { type: Sequelize.STRING(10), allowNull: true },
  FUTURES: { type: Sequelize.STRING(100), allowNull: true },
  MAILH1FAX: { type: Sequelize.STRING(100), allowNull: true },
  NATIONALITY: { type: Sequelize.STRING(100), allowNull: true },
  NOMINEEPIN: { type: Sequelize.STRING(20), allowNull: true },
  CAPITALCOMMITED: { type: Sequelize.INTEGER, allowNull: true, defaultValue: 0 },
  FIRMID: { type: Sequelize.INTEGER, allowNull: true, defaultValue: 0 },
  NGPAN: { type: Sequelize.STRING(20), allowNull: true },
  OPERATIONTYPE: { type: Sequelize.STRING(10), allowNull: true },
  BILLGROUP: { type: Sequelize.STRING(100), allowNull: true },
  H2FATCA: { type: Sequelize.STRING(10), allowNull: true },
  CLIENTRIGHTS: { type: Sequelize.STRING(200), allowNull: true },
  NEFT3: { type: Sequelize.STRING(100), allowNull: true },
  NEFT2: { type: Sequelize.STRING(100), allowNull: true },
  RISKPROFILENAME: { type: Sequelize.STRING(200), allowNull: true },
  CATEGORYCODE: { type: Sequelize.STRING(50), allowNull: true },
  NEFT1: { type: Sequelize.STRING(100), allowNull: true },
  BASENAV: { type: Sequelize.STRING(100), allowNull: true },
  USER_NAME: { type: Sequelize.STRING(100), allowNull: true },
  H1CKYC: { type: Sequelize.STRING(50), allowNull: true },
  OCCUPATION: { type: Sequelize.STRING(100), allowNull: true },
  BOND_DEB: { type: Sequelize.STRING(200), allowNull: true },
  PAN: { type: Sequelize.STRING(20), allowNull: true },
  ACCOUNTCODE: { type: Sequelize.STRING(100), allowNull: true },
  GUARDIANPIN: { type: Sequelize.STRING(20), allowNull: true },
  MAILH1MOBILE: { type: Sequelize.STRING(20), allowNull: true },
  MAPINID: { type: Sequelize.STRING(100), allowNull: true },
  EMAIL: { type: Sequelize.STRING(200), allowNull: true },
  NOMINEESTATE: { type: Sequelize.STRING(100), allowNull: true },
  DEPID: { type: Sequelize.STRING(100), allowNull: true },
  COUNTRY: { type: Sequelize.STRING(100), allowNull: true },
  PERFREPORTDATE: { type: Sequelize.STRING(20), allowNull: true }, // date as string (change if needed)
  H3UBO: { type: Sequelize.STRING(10), allowNull: true },
  OTHER_ASSETS: { type: Sequelize.STRING(200), allowNull: true },
  BANKACTYPE1: { type: Sequelize.STRING(100), allowNull: true },
  BANKACTYPE2: { type: Sequelize.STRING(100), allowNull: true },
  BANKACTYPE3: { type: Sequelize.STRING(100), allowNull: true },
  INCCATG: { type: Sequelize.STRING(100), allowNull: true },
  RMRIGHTS: { type: Sequelize.STRING(100), allowNull: true },
  MAXCHARGE: { type: Sequelize.INTEGER, allowNull: true, defaultValue: 0 },
  MAILH1PIN: { type: Sequelize.STRING(20), allowNull: true },
  ACCOUNTINGTXN: { type: Sequelize.STRING(10), allowNull: true },
  BANKACTYPE: { type: Sequelize.STRING(10), allowNull: true },
  NOMINEENAME: { type: Sequelize.STRING(200), allowNull: true },
  ACCOUNTTYPE: { type: Sequelize.STRING(10), allowNull: true },
  STATE: { type: Sequelize.STRING(100), allowNull: true },
  NOMINEEFAX: { type: Sequelize.STRING(100), allowNull: true },
  H3FATCA: { type: Sequelize.STRING(10), allowNull: true },
  NOMINEERELATION: { type: Sequelize.STRING(200), allowNull: true },
  SCHEME: { type: Sequelize.STRING(200), allowNull: true },
  NGDOB: { type: Sequelize.STRING(20), allowNull: true }, // Date string format
  MAILPHONEWORK: { type: Sequelize.STRING(20), allowNull: true },
  GROUPNAME: { type: Sequelize.STRING(200), allowNull: true },
  MICR3: { type: Sequelize.STRING(100), allowNull: true },
  MICR2: { type: Sequelize.STRING(100), allowNull: true },
  MICR1: { type: Sequelize.STRING(100), allowNull: true },
  MAILH1PHONE: { type: Sequelize.STRING(20), allowNull: true },
  BRANCH: { type: Sequelize.STRING(100), allowNull: true },
  H2CKYC: { type: Sequelize.STRING(10), allowNull: true },
  GUARDIAN: { type: Sequelize.STRING(200), allowNull: true },
  CLIENTID: { type: Sequelize.STRING(100), allowNull: true },
  BANKCODE2: { type: Sequelize.STRING(100), allowNull: true },
  TAN1: { type: Sequelize.STRING(50), allowNull: true },
  FAX: { type: Sequelize.STRING(50), allowNull: true },
  ADVISOR: { type: Sequelize.STRING(100), allowNull: true },
  MAILH1CITY: { type: Sequelize.STRING(100), allowNull: true },
  PERFCLASSIFYDAILY: { type: Sequelize.STRING(100), allowNull: true },
  RELMGR: { type: Sequelize.STRING(100), allowNull: true },
  ARNNO: { type: Sequelize.STRING(100), allowNull: true },
  FIRSTNAME: { type: Sequelize.STRING(100), allowNull: true },
  GUARDIANFAX: { type: Sequelize.STRING(100), allowNull: true },
  H3CKYC: { type: Sequelize.STRING(10), allowNull: true },
  DPCLIENTID: { type: Sequelize.STRING(100), allowNull: true },
  H1MODEOFHOLDING: { type: Sequelize.STRING(10), allowNull: true },
  DP1: { type: Sequelize.STRING(100), allowNull: true },
  BANKACID: { type: Sequelize.STRING(100), allowNull: true },
  DP3: { type: Sequelize.STRING(100), allowNull: true },
  BANKNAME: { type: Sequelize.STRING(100), allowNull: true },
 RELMAPPING1: { type: Sequelize.STRING(100), allowNull: true },
DP2: { type: Sequelize.STRING(100), allowNull: true },
WEALTHADVISORNAME: { type: Sequelize.STRING(100), allowNull: true },
DEPCODE: { type: Sequelize.STRING(100), allowNull: true },
GUARDIANPHONE: { type: Sequelize.STRING(100), allowNull: true },
FUNDLEVEL: { type: Sequelize.STRING(100), allowNull: true },
H3AADHAR: { type: Sequelize.STRING(100), allowNull: true },
ACCREDITEDINVESTOR: { type: Sequelize.STRING(100), allowNull: true },
BANKBRANCHNAME: { type: Sequelize.STRING(100), allowNull: true },
NAME3: { type: Sequelize.STRING(100), allowNull: true },
NGUBO: { type: Sequelize.STRING(100), allowNull: true },
NAME2: { type: Sequelize.STRING(100), allowNull: true },
PAN2: { type: Sequelize.STRING(100), allowNull: true },
NOMINEEADD2: { type: Sequelize.STRING(100), allowNull: true },
GUARDIANADD1: { type: Sequelize.STRING(100), allowNull: true },
HOFRESTRICTED: { type: Sequelize.STRING(100), allowNull: true },
  MAILH1STATE: { type: Sequelize.STRING(100), allowNull: true },
 PAN3: { type: Sequelize.STRING(100), allowNull: true },
  NOMINEEADD1: { type: Sequelize.STRING(100), allowNull: true },
 GUARDIANADD2: { type: Sequelize.STRING(100), allowNull: true },
 CITY: { type: Sequelize.STRING(100), allowNull: true },
GROUPCODE: { type: Sequelize.STRING(100), allowNull: true },
 STTTAKENAS: { type: Sequelize.STRING(100), allowNull: true },
  BANKBRANCH2: { type: Sequelize.STRING(100), allowNull: true },
  BANKBRANCH3: { type: Sequelize.STRING(100), allowNull: true },
  NOMDOB: { type: Sequelize.STRING(100), allowNull: true },
  BANKBRANCH1: { type: Sequelize.STRING(100), allowNull: true },
  "MOBILE": { type: Sequelize.STRING(100), allowNull: true },
  HOFFLAG: { type: Sequelize.STRING(100), allowNull: true },
  NOMINEEPHONE: { type: Sequelize.STRING(100), allowNull: true },
  MODELPORTFOLIO: { type: Sequelize.STRING(100), allowNull: true },
  PLANALLOWED: { type: Sequelize.STRING(100), allowNull: true },
  DPID2: { type: Sequelize.STRING(100), allowNull: true },
  DPID1: { type: Sequelize.STRING(100), allowNull: true },
 NGCKYC: { type: Sequelize.STRING(100), allowNull: true },
  DPCLIENTID2: { type: Sequelize.STRING(100), allowNull: true },
  PHONEWORK: { type: Sequelize.STRING(100), allowNull: true },
DPCLIENTID3: { type: Sequelize.STRING(100), allowNull: true },
  DPID3: { type: Sequelize.STRING(100), allowNull: true },
 GENDER3: { type: Sequelize.STRING(100), allowNull: true },
  STATUS: { type: Sequelize.STRING(100), allowNull: true },
  GENDER2: { type: Sequelize.STRING(100), allowNull: true },
 MIDDLENAME: { type: Sequelize.STRING(100), allowNull: true },
  AUTOMAIL: { type: Sequelize.STRING(100), allowNull: true },
  SALUTATION: { type: Sequelize.STRING(100), allowNull: true },
  LASTNAME: { type: Sequelize.STRING(100), allowNull: true },
  H1FATCA: { type: Sequelize.STRING(10), allowNull: true },
  MF: { type: Sequelize.STRING(10), allowNull: true },
  REFCODE10: { type: Sequelize.STRING(10), allowNull: true },
  FH1: { type: Sequelize.STRING(10), allowNull: true },
  FH3: { type: Sequelize.STRING(10), allowNull: true },
FH2: { type: Sequelize.STRING(10), allowNull: true },
 NGFATCA: { type: Sequelize.STRING(10), allowNull: true },
  FMRIGHTS: { type: Sequelize.STRING(10), allowNull: true },
  MAILH1EMAILID: { type: Sequelize.STRING(10), allowNull: true },
 SHARES: { type: Sequelize.STRING(10), allowNull: true },
 NOMPAN: { type: Sequelize.STRING(10), allowNull: true },
  PHONE: { type: Sequelize.STRING(10), allowNull: true },
 MATURITYDATE: { type: Sequelize.STRING(10), allowNull: true },
  ADD1: { type: Sequelize.STRING(200), allowNull: true },
  ADVISORRIGHTS: { type: Sequelize.STRING(100), allowNull: true },
  ADD2: { type: Sequelize.STRING(20), allowNull: true },
  H2AADHAR: { type: Sequelize.STRING(10), allowNull: true },
  H1UBO: { type: Sequelize.STRING(100), allowNull: true },
  GENDER: { type: Sequelize.STRING(100), allowNull: true },
  NGAADHAR: { type: Sequelize.STRING(50), allowNull: true },
  RECOPRODUCT: { type: Sequelize.STRING(200), allowNull: true },
  BIRTHDATE1: { type: Sequelize.STRING(20), allowNull: true },
  WARD1: { type: Sequelize.STRING(20), allowNull: true },
  BIRTHDATE2: { type: Sequelize.STRING(10), allowNull: true },
  BIRTHDATE3: { type: Sequelize.STRING(10), allowNull: true },
  INCEPTIONDATE: { type: Sequelize.STRING(200), allowNull: true },
 RTGS1: { type: Sequelize.STRING(200), allowNull: true },
  DPNAME3: { type: Sequelize.STRING(200), allowNull: true },
  RTGS2: { type: Sequelize.STRING(200), allowNull: true },
  DPNAME2: { type: Sequelize.STRING(200), allowNull: true },
  GUARDIANCITY: { type: Sequelize.STRING(200), allowNull: true },
  RTGS3: { type: Sequelize.STRING(200), allowNull: true },
  NOMINEECITY: { type: Sequelize.STRING(200), allowNull: true },
 DPCLIENTID1: { type: Sequelize.STRING(200), allowNull: true },
  BANKCODE: { type: Sequelize.STRING(200), allowNull: true },
  H1AADHAR: { type: Sequelize.STRING(200), allowNull: true },
 BANKACID3: { type: Sequelize.STRING(200), allowNull: true },
  BANKACID1: { type: Sequelize.STRING(200), allowNull: true },
  BANKACID2: { type: Sequelize.STRING(200), allowNull: true },
 ISACTIVE: { type: Sequelize.BOOLEAN, allowNull: true },
    CreatedDate: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW },
    ModifiedDate: { type: Sequelize.DATE, allowNull: true }
  }, {
  
      sequelize,
        modelName: 'ClientUploadHistoryDetails',
        tableName: 'ClientUploadHistoryDetails',
        timestamps: false, // Set to true if you want Sequelize to handle createdAt/updatedAt
  });

  return ClientUploadHistoryDetails;
};


module.exports.FolioDetails = function () {
    FolioDetails.init({
      id: { type:Sequelize.INTEGER,  primaryKey: true, autoIncrement: true, },
    DPNAME: { type: Sequelize.STRING(200), allowNull: true },
    REGISTRARNAME: { type: Sequelize.STRING(200), allowNull: true },
    BANKNAME: { type: Sequelize.STRING(100), allowNull: true, defaultValue: 'NONE' },
    DPID: { type: Sequelize.STRING(100), allowNull: true },
    FOLIOACTIVE: { type: Sequelize.STRING(50), allowNull: true },
    DEFAULTAMC: { type: Sequelize.STRING(100), allowNull: true },
    CASHSYMBOL: { type: Sequelize.STRING(50), allowNull: true, defaultValue: 'CASH' },
    REGISTRAR: { type: Sequelize.STRING(200), allowNull: true },
    AMCNAME: { type: Sequelize.STRING(200), allowNull: true },
    CLIENTID: { type: Sequelize.INTEGER, allowNull: false },
    DESPOSITORYNAME: { type: Sequelize.STRING(200), allowNull: true },
    BANKACCOUNTDTL: { type: Sequelize.STRING(500), allowNull: true },
    BANKCODE: { type: Sequelize.STRING(50), allowNull: true, defaultValue: 'NONE' },
    DEPOSITORY: { type: Sequelize.STRING(100), allowNull: true },
    FOLIO: { type: Sequelize.STRING(100), allowNull: true },
    AMC: { type: Sequelize.STRING(100), allowNull: true },
    BANKACTYPE: { type: Sequelize.STRING(10), allowNull: true, defaultValue: 'C' },
    CUSTODYSCHEMECODE: { type: Sequelize.STRING(100), allowNull: true },
    BANK_BRANCH: { type: Sequelize.STRING(200), allowNull: true },
    SUBFOLIO: { type: Sequelize.STRING(100), allowNull: true },
    CLIENTNAME: { type: Sequelize.STRING(200), allowNull: true },
    TYPE: { type: Sequelize.STRING(100), allowNull: true },
    BANKACCOUNT: { type: Sequelize.STRING(100), allowNull: true, defaultValue: 'NONE' },
    DPCLIENTID: { type: Sequelize.STRING(100), allowNull: true },
     ISACTIVE: { type: Sequelize.BOOLEAN, allowNull: true },
       CreatedDate: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW },
    ModifiedDate: { type: Sequelize.DATE, allowNull: true }
  }, {
         sequelize,
        modelName: 'FolioDetails',
        tableName: 'FolioDetails',
        timestamps: false, // Set to true if you want Sequelize to handle createdAt/updatedAt
  });

  return FolioDetails;
};

module.exports.FolioHistoryetails = function () {
    FolioHistoryetails.init({
      id: { type:Sequelize.INTEGER,  primaryKey: true, autoIncrement: true, },
    DPNAME: { type: Sequelize.STRING(200), allowNull: true },
    REGISTRARNAME: { type: Sequelize.STRING(200), allowNull: true },
    BANKNAME: { type: Sequelize.STRING(100), allowNull: true, defaultValue: 'NONE' },
    DPID: { type: Sequelize.STRING(100), allowNull: true },
    FOLIOACTIVE: { type: Sequelize.STRING(50), allowNull: true },
    DEFAULTAMC: { type: Sequelize.STRING(100), allowNull: true },
    CASHSYMBOL: { type: Sequelize.STRING(50), allowNull: true, defaultValue: 'CASH' },
    REGISTRAR: { type: Sequelize.STRING(200), allowNull: true },
    AMCNAME: { type: Sequelize.STRING(200), allowNull: true },
    CLIENTID: { type: Sequelize.INTEGER, allowNull: false },
    DESPOSITORYNAME: { type: Sequelize.STRING(200), allowNull: true },
    BANKACCOUNTDTL: { type: Sequelize.STRING(500), allowNull: true },
    BANKCODE: { type: Sequelize.STRING(50), allowNull: true, defaultValue: 'NONE' },
    DEPOSITORY: { type: Sequelize.STRING(100), allowNull: true },
    FOLIO: { type: Sequelize.STRING(100), allowNull: true },
    AMC: { type: Sequelize.STRING(100), allowNull: true },
    BANKACTYPE: { type: Sequelize.STRING(10), allowNull: true, defaultValue: 'C' },
    CUSTODYSCHEMECODE: { type: Sequelize.STRING(100), allowNull: true },
    BANK_BRANCH: { type: Sequelize.STRING(200), allowNull: true },
    SUBFOLIO: { type: Sequelize.STRING(100), allowNull: true },
    CLIENTNAME: { type: Sequelize.STRING(200), allowNull: true },
    TYPE: { type: Sequelize.STRING(100), allowNull: true },
    BANKACCOUNT: { type: Sequelize.STRING(100), allowNull: true, defaultValue: 'NONE' },
    DPCLIENTID: { type: Sequelize.STRING(100), allowNull: true },
     ISACTIVE: { type: Sequelize.BOOLEAN, allowNull: true },
       CreatedDate: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW },
    ModifiedDate: { type: Sequelize.DATE, allowNull: true }
  }, {
         sequelize,
        modelName: 'FolioHistoryetails',
        tableName: 'FolioHistoryetails',
        timestamps: false, // Set to true if you want Sequelize to handle createdAt/updatedAt
  });

  return FolioHistoryetails;
};


module.exports.EmployeeDetails = function () {
    EmployeeDetails.init({
 id: { type:Sequelize.INTEGER,  primaryKey: true, autoIncrement: true, },
    code: { type: Sequelize.STRING(50), allowNull: false },
    email: { type: Sequelize.STRING(200), allowNull: true },
    mobile: { type: Sequelize.STRING(20), allowNull: true },
    name: { type: Sequelize.STRING(200), allowNull: true },
    lob: { type: Sequelize.STRING(200), allowNull: true }, // Line of Business
    designation: { type: Sequelize.STRING(200), allowNull: true },
    department: { type: Sequelize.STRING(100), allowNull: true },
    euin: { type: Sequelize.STRING(100), allowNull: true },
    reporting_manager_code: { type: Sequelize.STRING(50), allowNull: true },
    company_code: { type: Sequelize.STRING(50), allowNull: true },
    pan: { type: Sequelize.STRING(20), allowNull: true },
    is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
       CreatedDate: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW },
    ModifiedDate: { type: Sequelize.DATE, allowNull: true }
  }, {
  sequelize,
        modelName: 'EmployeeDetails',
        tableName: 'EmployeeDetails',
        timestamps: false, // Set to true if you want Sequelize to handle createdAt/updatedAt
  });

  return EmployeeDetails;
};

module.exports.EmployeeHistoryDetails = function () {
    EmployeeHistoryDetails.init({
 id: { type:Sequelize.INTEGER,  primaryKey: true, autoIncrement: true, },
    code: { type: Sequelize.STRING(50), allowNull: false },
    email: { type: Sequelize.STRING(200), allowNull: true },
    mobile: { type: Sequelize.STRING(20), allowNull: true },
    name: { type: Sequelize.STRING(200), allowNull: true },
    lob: { type: Sequelize.STRING(200), allowNull: true }, // Line of Business
    designation: { type: Sequelize.STRING(200), allowNull: true },
    department: { type: Sequelize.STRING(100), allowNull: true },
    euin: { type: Sequelize.STRING(100), allowNull: true },
    reporting_manager_code: { type: Sequelize.STRING(50), allowNull: true },
    company_code: { type: Sequelize.STRING(50), allowNull: true },
    pan: { type: Sequelize.STRING(20), allowNull: true },
    is_active: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
       CreatedDate: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW },
    ModifiedDate: { type: Sequelize.DATE, allowNull: true }
  }, {
  sequelize,
        modelName: 'EmployeeHistoryDetails',
        tableName: 'EmployeeHistoryDetails',
        timestamps: false, // Set to true if you want Sequelize to handle createdAt/updatedAt
  });

  return EmployeeHistoryDetails;
};

module.exports.BakerCSODetails = function () {
    BakerCSODetails.init({
             id: { type:Sequelize.INTEGER,  primaryKey: true, autoIncrement: true, },
    banker_code: { type: Sequelize.STRING(50), allowNull: false },
    cso_code: { type: Sequelize.STRING(50), allowNull: false },
       CreatedDate: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW },
    ModifiedDate: { type: Sequelize.DATE, allowNull: true }
  }, {
    sequelize,
        modelName: 'BakerCSODetails',
        tableName: 'BakerCSODetails',
        timestamps: false, // Set to true if you want Sequelize to handle createdAt/updatedAt
  });

  return BakerCSODetails;
};


module.exports.BakerCSOHistoryDetails = function () {
    BakerCSOHistoryDetails.init({
             id: { type:Sequelize.INTEGER,  primaryKey: true, autoIncrement: true, },
    banker_code: { type: Sequelize.STRING(50), allowNull: false },
    cso_code: { type: Sequelize.STRING(50), allowNull: false },
       CreatedDate: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW },
    ModifiedDate: { type: Sequelize.DATE, allowNull: true }
  }, {
    sequelize,
        modelName: 'BakerCSOHistoryDetails',
        tableName: 'BakerCSOHistoryDetails',
        timestamps: false, // Set to true if you want Sequelize to handle createdAt/updatedAt
  });

  return BakerCSOHistoryDetails;
};



module.exports.Masterschedulerdetails = function () {
    Masterschedulerdetails.init({
        Id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
        SchedulerName: { type: Sequelize.STRING(100), allowNull: true },
        RequestId: { type: Sequelize.STRING(100), allowNull: true },
        RequestStatus: { type: Sequelize.STRING(100), allowNull: true },
        APIObject: { type: Sequelize.TEXT, allowNull: true },
        StartDate:{type:Sequelize.DATE,allowNull:true},
        EndDate:{type:Sequelize.DATE,allowNull:true},
        CreatedDate: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: Sequelize.NOW,
        },
    }, {
        sequelize,
        modelName: "Masterschedulerdetails",
        tableName: "Masterschedulerdetails",
    });
    return Masterschedulerdetails;
};

module.exports.ApiResponseDetail = function () {

    ApiResponseDetail.init({
        Id: { type: Sequelize.BIGINT, primaryKey: true, autoIncrement: true },
        ApiName: { type: Sequelize.STRING(100), allowNull: true },
        AsssetId: { type: Sequelize.INTEGER, allowNull: true },
        AssetNumber: { type: Sequelize.INTEGER, allowNull: true },
        API_ResponseStatusCode: { type: Sequelize.INTEGER, allowNull: true },
        API_ResponseData: { type: Sequelize.STRING(2000), allowNull: true },
        CreatedBy: { type: Sequelize.BIGINT, allowNull: true },
        CreatedDate: { type: Sequelize.DATE, allowNull: true, defaultValue: Sequelize.NOW },
    }, {
        sequelize,
        modelName: "ApiResponseDetail",
        tableName: "ApiResponseDetail",
    });
    return ApiResponseDetail;
};
