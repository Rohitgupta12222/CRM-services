var express = require('express');
var router = express.Router();
let pool = require('../../Config')

const moment = require('moment/moment');
var routes = function () {

   const users = [
  {
    firstName: "rohan",
    lastName: "roy",
    email: "fsmmarkets@gmail.com",
    phone: "+919163561437",
    mt5Account: "8210339",
    accountType: "Test Gold",
    accountSize: "10000",
    kycDetails: { status: "submitted" }
  },
  {
    firstName: "sjds",
    lastName: "jsdj",
    email: "harish007fx@gmail.com",
    phone: "+911234567890",
    mt5Account: "1911863",
    accountType: "Test Gold",
    accountSize: "5000",
    kycDetails: { status: "submitted" }
  }
];


//CREATE TABLE "users" (
//     "id" SERIAL PRIMARY KEY,
//     "first_name" VARCHAR(100),
//     "last_name" VARCHAR(100),
//     "email" VARCHAR(255) UNIQUE NOT NULL,
//     "phone" VARCHAR(20),
//     "password" VARCHAR(255),
//     "email_verified" BOOLEAN DEFAULT FALSE,
//     "kyc_verified" BOOLEAN DEFAULT FALSE,
//     "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

// CREATE TABLE "kyc_details" (
//     "id" SERIAL PRIMARY KEY,
//     "user_id" INTEGER NOT NULL UNIQUE REFERENCES "users"("id") ON DELETE CASCADE,
//     "document_type" VARCHAR(100),
//     "country_of_issue" VARCHAR(100),
//     "purpose" VARCHAR(100),
//     "occupation" VARCHAR(100),
//     "status" VARCHAR(50),
//     "created_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//     "updated_at" TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );



    router.route('/kyc-submitted-users')
  .get(async (req, res) => {
const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    // Total user count
    const totalResult = await pool.query(`
      SELECT COUNT(*) AS total 
      FROM "users" u 
      JOIN "kyc_details" k ON u."id" = k."user_id" 
      WHERE k."status" = 'submitted'
    `);
    const totalUsers = parseInt(totalResult.rows[0].total);
    const totalPages = Math.ceil(totalUsers / limit);

    // Paginated query
    const usersResult = await pool.query(`
      SELECT 
        u.*, 
        k."document_type", 
        k."country_of_issue", 
        k."purpose", 
        k."occupation", 
        k."status" AS "kyc_status", 
        k."created_at" AS "kyc_created_at"
      FROM "users" u
      JOIN "kyc_details" k ON u."id" = k."user_id"
      WHERE k."status" = 'submitted'
      ORDER BY u."created_at" DESC
      LIMIT $1 OFFSET $2
    `, [limit, offset]);

    res.json({
      msg: "KYC submitted users retrieved",
      pagination: {
        totalUsers,
        totalPages,
        currentPage: page
      },
      data: usersResult.rows
    });

  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ msg: 'Internal server error' });
  }
});

// INSERT INTO "users" (
//     "first_name", "last_name", "email", "phone", "password", "email_verified", "kyc_verified"
// ) VALUES (
//     'Rohan', 'Roy', 'fsmmarkets@gmail.com', '+919163561437', 'Fsm@1234', TRUE, TRUE
// );

// -- Assuming inserted user ID is 1
// INSERT INTO "kyc_details" (
//     "user_id", "document_type", "country_of_issue", "purpose", "occupation", "status"
// ) VALUES (
//     1, 'Passport', 'Armenia', 'Personal', 'Self-Employed', 'submitted'
// );


        

    return router;

};

module.exports = routes;
