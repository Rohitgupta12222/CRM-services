var express = require('express');
var router = express.Router();
let pool = require('../../Config')

let comman = require('../../Common/CommonFunctions');
const moment = require('moment/moment');
const nodemailer = require('nodemailer');
var routes = function () {


    router.route('/sendmail')
        .post(async function (req, res) {
    console.log("hi")
            try {
    
         await   Sendmailforvarification();
       await    Sendmailforvarifiedemail() 
            }
            catch (error) {
                console.log('Error', error);
                res.status(400).json({ Success: false, Message: 'Error Occured While Approving Fund And Security', Data: null });
            }
        });

// CREATE TABLE login_logs (
//   id SERIAL PRIMARY KEY,
//   user_id INTEGER NOT NULL,
//   user_name TEXT NOT NULL,
//   email TEXT,
//   ip_address TEXT,
//   device TEXT,
//   browser TEXT,
//   os TEXT,
//   login_status TEXT CHECK (login_status IN ('Success', 'Failed')) DEFAULT 'Success',
//   created_at TIMESTAMP DEFAULT NOW()
// );


        router.get('/login-logs', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search || '';

  const offset = (page - 1) * limit;

  try {
    // Example for SQL DB

      let logs =   await pool.query(`
      SELECT * FROM login_logs 
      WHERE user_name ILIKE $1 
      ORDER BY created_at DESC 
      LIMIT $2 OFFSET $3
    `, [`%${search}%`, limit, offset]);

    const total =  await pool.query(`
      SELECT COUNT(*) FROM login_logs 
      WHERE user_name ILIKE $1
    `, [`%${search}%`]);

    res.json({
      data: logs.rows,
      total: parseInt(total.rows[0].count),
      page,
      limit
    });
  } catch (err) {
    console.error('Error fetching login logs:', err);
    res.status(500).json({ error: 'Server Error' });
  }
});

 // routes/userRoutes.js (or inside your existing route)
router.route('/users')
  .get(async (req, res) => {
    try {
      const totalUsers = await pool.query(`SELECT COUNT(*) FROM users`);
      const activeUsers = await pool.query(`SELECT COUNT(*) FROM users WHERE is_active = true`);
      const kycVerified = await pool.query(`SELECT COUNT(*) FROM users WHERE kyc_status = 'verified'`);
      const kycUnverified = await pool.query(`SELECT COUNT(*) FROM users WHERE kyc_status != 'verified' OR kyc_status IS NULL`);
      const emailVerified = await pool.query(`SELECT COUNT(*) FROM users WHERE is_email_verified = true`);
      const emailUnverified = await pool.query(`SELECT COUNT(*) FROM users WHERE is_email_verified = false OR is_email_verified IS NULL`);
      const todayUsers = await pool.query(`SELECT COUNT(*) FROM users WHERE DATE(created_at) = CURRENT_DATE`);
      const lastWeekUsers = await pool.query(`SELECT COUNT(*) FROM users WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'`);
      const totalIBUsers = await pool.query(`SELECT COUNT(*) FROM users WHERE role = 'IB'`);
      const referralUsers = await pool.query(`SELECT COUNT(*) FROM users WHERE referral_code_used IS NOT NULL`);

      res.status(200).json({
        success: true,
        message: 'Dashboard data fetched successfully',
        data: {
          totalUsers: parseInt(totalUsers.rows[0].count),
          activeUsers: parseInt(activeUsers.rows[0].count),
          kycVerified: parseInt(kycVerified.rows[0].count),
          kycUnverified: parseInt(kycUnverified.rows[0].count),
          emailVerified: parseInt(emailVerified.rows[0].count),
          emailUnverified: parseInt(emailUnverified.rows[0].count),
          todayUsers: parseInt(todayUsers.rows[0].count),
          lastWeekUsers: parseInt(lastWeekUsers.rows[0].count),
          totalIBUsers: parseInt(totalIBUsers.rows[0].count),
          referralUsers: parseInt(referralUsers.rows[0].count),
        }
      });
    } catch (error) {
      console.error("Dashboard API Error:", error);
      res.status(500).json({ success: false, message: "Server error", data: null });
    }
  });

router.route('/dashboard')
  .get(async (req, res) => {
    try {
      // --- User Counts ---
      const totalUsers = await pool.query(`SELECT COUNT(*) FROM users`);
      const activeUsers = await pool.query(`SELECT COUNT(*) FROM users WHERE is_active = true`);
      const kycVerified = await pool.query(`SELECT COUNT(*) FROM users WHERE kyc_status = 'verified'`);
      const kycUnverified = await pool.query(`SELECT COUNT(*) FROM users WHERE kyc_status != 'verified' OR kyc_status IS NULL`);
      const emailVerified = await pool.query(`SELECT COUNT(*) FROM users WHERE is_email_verified = true`);
      const emailUnverified = await pool.query(`SELECT COUNT(*) FROM users WHERE is_email_verified = false OR is_email_verified IS NULL`);
      const todayUsers = await pool.query(`SELECT COUNT(*) FROM users WHERE DATE(created_at) = CURRENT_DATE`);
      const lastWeekUsers = await pool.query(`SELECT COUNT(*) FROM users WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'`);
      const totalIBUsers = await pool.query(`SELECT COUNT(*) FROM users WHERE role = 'IB'`);
      const referralUsers = await pool.query(`SELECT COUNT(*) FROM users WHERE referral_code_used IS NOT NULL`);

      // --- Deposit Counts ---
      const totalDeposit = await pool.query(`SELECT COUNT(*) FROM deposit`);
      const pendingDeposit = await pool.query(`SELECT COUNT(*) FROM deposit WHERE status = 'Pending'`);
      const approvedDeposit = await pool.query(`SELECT COUNT(*) FROM deposit WHERE status = 'Approved'`);
      const rejectedDeposit = await pool.query(`SELECT COUNT(*) FROM deposit WHERE status = 'Rejected'`);
      const todayApprovedDeposit = await pool.query(`
        SELECT COUNT(*) FROM deposit 
        WHERE status = 'Approved' AND DATE(created_at) = CURRENT_DATE
      `);

      // --- Withdraw Counts ---
      const totalWithdraw = await pool.query(`SELECT COUNT(*) FROM withdraw`);
      const pendingWithdraw = await pool.query(`SELECT COUNT(*) FROM withdraw WHERE status = 'Pending'`);
      const approvedWithdraw = await pool.query(`SELECT COUNT(*) FROM withdraw WHERE status = 'Approved'`);
      const rejectedWithdraw = await pool.query(`SELECT COUNT(*) FROM withdraw WHERE status = 'Rejected'`);
      const todayWithdraw = await pool.query(`
        SELECT COUNT(*) FROM withdraw 
        WHERE DATE(created_at) = CURRENT_DATE
      `);
      const lastWeekWithdraw = await pool.query(`
        SELECT COUNT(*) FROM withdraw 
        WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
      `);

      // --- Challenge Passed Counts ---
      const challengePassedToday = await pool.query(`
        SELECT COUNT(*) FROM challenge 
        WHERE passed = true AND DATE(created_at) = CURRENT_DATE
      `);
      const challengePassedLastWeek = await pool.query(`
        SELECT COUNT(*) FROM challenge 
        WHERE passed = true AND created_at >= CURRENT_DATE - INTERVAL '7 days'
      `);

      // --- Account Breaches ---
      const breachedToday = await pool.query(`
        SELECT COUNT(*) FROM account_breach 
        WHERE DATE(breach_date) = CURRENT_DATE
      `);
      const breachedLastWeek = await pool.query(`
        SELECT COUNT(*) FROM account_breach 
        WHERE breach_date >= CURRENT_DATE - INTERVAL '7 days'
      `);

      const totalIBWithdraw = await pool.query(`
  SELECT COUNT(*) FROM withdraw w 
  JOIN users u ON w.created_by = u.id
  WHERE u.role = 'IB'
`);
const pendingIBWithdraw = await pool.query(`
  SELECT COUNT(*) FROM withdraw w 
  JOIN users u ON w.created_by = u.id
  WHERE u.role = 'IB' AND w.status = 'Pending'
`);
const approvedIBWithdraw = await pool.query(`
  SELECT COUNT(*) FROM withdraw w 
  JOIN users u ON w.created_by = u.id
  WHERE u.role = 'IB' AND w.status = 'Approved'
`);
const rejectedIBWithdraw = await pool.query(`
  SELECT COUNT(*) FROM withdraw w 
  JOIN users u ON w.created_by = u.id
  WHERE u.role = 'IB' AND w.status = 'Rejected'
`);
const todayIBWithdraw = await pool.query(`
  SELECT COUNT(*) FROM withdraw w 
  JOIN users u ON w.created_by = u.id
  WHERE u.role = 'IB' AND DATE(w.created_at) = CURRENT_DATE
`);
const lastWeekIBWithdraw = await pool.query(`
  SELECT COUNT(*) FROM withdraw w 
  JOIN users u ON w.created_by = u.id
  WHERE u.role = 'IB' AND w.created_at >= CURRENT_DATE - INTERVAL '7 days'
`);

      // --- Final JSON Response ---
      res.status(200).json({
        success: true,
        message: 'Dashboard data fetched successfully',
        data: {
          users: {
            total: parseInt(totalUsers.rows[0].count),
            active: parseInt(activeUsers.rows[0].count),
            kycVerified: parseInt(kycVerified.rows[0].count),
            kycUnverified: parseInt(kycUnverified.rows[0].count),
            emailVerified: parseInt(emailVerified.rows[0].count),
            emailUnverified: parseInt(emailUnverified.rows[0].count),
            today: parseInt(todayUsers.rows[0].count),
            lastWeek: parseInt(lastWeekUsers.rows[0].count),
            totalIB: parseInt(totalIBUsers.rows[0].count),
            referralUsers: parseInt(referralUsers.rows[0].count)
          },
          deposit: {
            total: parseInt(totalDeposit.rows[0].count),
            pending: parseInt(pendingDeposit.rows[0].count),
            approved: parseInt(approvedDeposit.rows[0].count),
            rejected: parseInt(rejectedDeposit.rows[0].count),
            todayApproved: parseInt(todayApprovedDeposit.rows[0].count),
          },
          withdraw: {
            total: parseInt(totalWithdraw.rows[0].count),
            pending: parseInt(pendingWithdraw.rows[0].count),
            approved: parseInt(approvedWithdraw.rows[0].count),
            rejected: parseInt(rejectedWithdraw.rows[0].count),
            today: parseInt(todayWithdraw.rows[0].count),
            lastWeek: parseInt(lastWeekWithdraw.rows[0].count),
          },

          ibWithdraw: {
  total: parseInt(totalIBWithdraw.rows[0].count),
  pending: parseInt(pendingIBWithdraw.rows[0].count),
  approved: parseInt(approvedIBWithdraw.rows[0].count),
  rejected: parseInt(rejectedIBWithdraw.rows[0].count),
  today: parseInt(todayIBWithdraw.rows[0].count),
  lastWeek: parseInt(lastWeekIBWithdraw.rows[0].count),
},
          challenges: {
            todayPassed: parseInt(challengePassedToday.rows[0].count),
            lastWeekPassed: parseInt(challengePassedLastWeek.rows[0].count),
          },
          breaches: {
            today: parseInt(breachedToday.rows[0].count),
            lastWeek: parseInt(breachedLastWeek.rows[0].count),
          }

          
        }
      });

    } catch (error) {
      console.error("Dashboard API Error:", error);
      res.status(500).json({ success: false, message: "Server error", data: null });
    }
  });


  // Get all user details
router.route('/users/all')
  .get(async (req, res) => {
    try {
      const allUsers = await pool.query(`SELECT * FROM users ORDER BY created_at DESC`);

      res.status(200).json({
        success: true,
        message: 'All users fetched successfully',
        data: allUsers.rows,
      });
    } catch (error) {
      console.error("Fetch All Users Error:", error);
      res.status(500).json({ success: false, message: "Server error", data: null });
    }
  });

  // Get all email verified users
router.route('/users/email-verified')
  .get(async (req, res) => {
    try {
      const emailVerifiedUsers = await pool.query(`
        SELECT * FROM users WHERE is_email_verified = true ORDER BY created_at DESC
      `);

      res.status(200).json({
        success: true,
        message: 'Email verified users fetched successfully',
        data: emailVerifiedUsers.rows,
      });
    } catch (error) {
      console.error("Email Verified Users Error:", error);
      res.status(500).json({ success: false, message: "Server error", data: null });
    }
  });

// Get all users where email is NOT verified
router.route('/users/email-unverified')
  .get(async (req, res) => {
    try {
      const unverifiedUsers = await pool.query(`
        SELECT * FROM users 
        WHERE is_email_verified = false OR is_email_verified IS NULL
        ORDER BY created_at DESC
      `);

      res.status(200).json({
        success: true,
        message: 'Email unverified users fetched successfully',
        data: unverifiedUsers.rows,
      });
    } catch (error) {
      console.error("Email Unverified Users API Error:", error);
      res.status(500).json({ success: false, message: "Server error", data: null });
    }
  });

// Get all KYC verified users
router.route('/users/kyc-verified')
  .get(async (req, res) => {
    try {
      const kycVerifiedUsers = await pool.query(`
        SELECT * FROM users 
        WHERE kyc_status = 'verified'
        ORDER BY created_at DESC
      `);

      res.status(200).json({
        success: true,
        message: 'KYC verified users fetched successfully',
        data: kycVerifiedUsers.rows,
      });
    } catch (error) {
      console.error("KYC Verified Users API Error:", error);
      res.status(500).json({ success: false, message: "Server error", data: null });
    }
  });

  // Get all KYC not verified users
router.route('/users/kyc-unverified')
  .get(async (req, res) => {
    try {
      const kycUnverifiedUsers = await pool.query(`
        SELECT * FROM users 
        WHERE kyc_status IS NULL OR kyc_status != 'verified'
        ORDER BY created_at DESC
      `);

      res.status(200).json({
        success: true,
        message: 'KYC not verified users fetched successfully',
        data: kycUnverifiedUsers.rows,
      });
    } catch (error) {
      console.error("KYC Not Verified Users API Error:", error);
      res.status(500).json({ success: false, message: "Server error", data: null });
    }
  });

router.route('/users/ib')
  .get(async (req, res) => {
    try {
      const ibUsers = await pool.query(`
        SELECT * FROM users 
        WHERE role = 'IB'
        ORDER BY created_at DESC
      `);

      res.status(200).json({
        success: true,
        message: 'IB users fetched successfully',
        data: ibUsers.rows,
      });
    } catch (error) {
      console.error("IB Users API Error:", error);
      res.status(500).json({ success: false, message: "Server error", data: null });
    }
  });

  router.route('/users/referral')
  .get(async (req, res) => {
    try {
      const referralUsers = await pool.query(`
        SELECT * FROM users 
        WHERE referral_code_used IS NOT NULL
        ORDER BY created_at DESC
      `);

      res.status(200).json({
        success: true,
        message: 'Referral users fetched successfully',
        data: referralUsers.rows,
      });
    } catch (error) {
      console.error("Referral Users API Error:", error);
      res.status(500).json({ success: false, message: "Server error", data: null });
    }
  });


  router.route('/users/active')
  .get(async (req, res) => {
    try {
      const activeUsers = await pool.query(`
        SELECT * FROM users 
        WHERE is_active = true
        ORDER BY created_at DESC
      `);

      res.status(200).json({
        success: true,
        message: 'Active users fetched successfully',
        data: activeUsers.rows,
      });
    } catch (error) {
      console.error("Active Users API Error:", error);
      res.status(500).json({ success: false, message: "Server error", data: null });
    }
  });

  router.route('/deposits/totaldeposit')
  .get(async (req, res) => {
    try {
      // Fetch all deposit records
      const allDeposits = await pool.query(`
        SELECT * FROM deposit
        ORDER BY created_at DESC
      `);

      // Get total count of deposits
      const totalDepositCountResult = await pool.query(`
        SELECT COUNT(*) FROM deposit
      `);

      res.status(200).json({
        success: true,
        message: 'Deposit data fetched successfully',
        data: {
          totalDepositCount: parseInt(totalDepositCountResult.rows[0].count),
          deposits: allDeposits.rows,
        }
      });
    } catch (error) {
      console.error("Deposit API Error:", error);
      res.status(500).json({ success: false, message: "Server error", data: null });
    }
  });

  router.route('/deposits/pending')
  .get(async (req, res) => {
    try {
      const pendingDeposits = await pool.query(`
        SELECT * FROM deposit WHERE status = 'pending' ORDER BY created_at DESC
      `);

      res.status(200).json({
        success: true,
        message: 'Pending deposits fetched successfully',
        data: {
          count: pendingDeposits.rows.length,
          deposits: pendingDeposits.rows,
        }
      });
    } catch (error) {
      console.error("Pending deposits API Error:", error);
      res.status(500).json({ success: false, message: "Server error", data: null });
    }
  });

  router.route('/deposits/approved')
  .get(async (req, res) => {
    try {
      const approvedDeposits = await pool.query(`
        SELECT * FROM deposit WHERE status = 'approved' ORDER BY created_at DESC
      `);

      res.status(200).json({
        success: true,
        message: 'Approved deposits fetched successfully',
        data: {
          count: approvedDeposits.rows.length,
          deposits: approvedDeposits.rows,
        }
      });
    } catch (error) {
      console.error("Approved deposits API Error:", error);
      res.status(500).json({ success: false, message: "Server error", data: null });
    }
  });

  router.route('/deposits/rejected')
  .get(async (req, res) => {
    try {
      const rejectedDeposits = await pool.query(`
        SELECT * FROM deposit WHERE status = 'rejected' ORDER BY created_at DESC
      `);

      res.status(200).json({
        success: true,
        message: 'Rejected deposits fetched successfully',
        data: {
          count: rejectedDeposits.rows.length,
          deposits: rejectedDeposits.rows,
        }
      });
    } catch (error) {
      console.error("Rejected deposits API Error:", error);
      res.status(500).json({ success: false, message: "Server error", data: null });
    }
  });

  router.route('/deposits/today-approved')
  .get(async (req, res) => {
    try {
      const todayApprovedDeposits = await pool.query(`
        SELECT * FROM deposit WHERE status = 'approved' AND DATE(created_at) = CURRENT_DATE ORDER BY created_at DESC
      `);

      res.status(200).json({
        success: true,
        message: 'Today approved deposits fetched successfully',
        data: {
          count: todayApprovedDeposits.rows.length,
          deposits: todayApprovedDeposits.rows,
        }
      });
    } catch (error) {
      console.error("Today approved deposits API Error:", error);
      res.status(500).json({ success: false, message: "Server error", data: null });
    }
  });

  router.route('/withdraws/details')
  .get(async (req, res) => {
    try {
      const withdrawDetails = await pool.query(`
        SELECT 
          "user_name" AS "User",
          email AS "Email",
          account AS "Account",
          plan AS "Plan",
          withdraw_amount AS "Withdraw",
          method AS "Method",
          requested_at AS "Requested At",
          action AS "Action"
        FROM "withdraw"
        ORDER BY requested_at DESC
      `);

      res.status(200).json({
        success: true,
        message: 'Withdraw details fetched successfully',
        data: withdrawDetails.rows,
      });
    } catch (error) {
      console.error("Withdraw Details API Error:", error);
      res.status(500).json({ success: false, message: "Server error", data: null });
    }
  });

  router.route('/withdraws/pending')
  .get(async (req, res) => {
    try {
      const pendingWithdraws = await pool.query(`
        SELECT 
          "user_name" AS "User",
          email AS "Email",
          account AS "Account",
          plan AS "Plan",
          withdraw_amount AS "Withdraw",
          method AS "Method",
          requested_at AS "Requested At",
          action AS "Action"
        FROM "withdraw"
        WHERE status = 'pending'
        ORDER BY requested_at DESC
      `);

      res.status(200).json({
        success: true,
        message: 'Pending withdraws fetched successfully',
        data: pendingWithdraws.rows,
      });
    } catch (error) {
      console.error("Pending Withdraw API Error:", error);
      res.status(500).json({ success: false, message: "Server error", data: null });
    }
  });

  // approved withdraw
router.route('/withdraws/approved').get(async (req, res) => { 
  
      try {
      const pendingWithdraws = await pool.query(`
        SELECT 
          "user_name" AS "User",
          email AS "Email",
          account AS "Account",
          plan AS "Plan",
          withdraw_amount AS "Withdraw",
          method AS "Method",
          requested_at AS "Requested At",
          action AS "Action"
        FROM "withdraw"
        WHERE status = 'approved'
        ORDER BY requested_at DESC
      `);

      res.status(200).json({
        success: true,
        message: 'Pending withdraws fetched successfully',
        data: pendingWithdraws.rows,
      });
    } catch (error) {
      console.error("approve Withdraw API Error:", error);
      res.status(500).json({ success: false, message: "Server error", data: null });
    }
});

// rejected withdraw
router.route('/withdraws/rejected').get(async (req, res) => { 
  // WHERE status = 'rejected' 
        try {
      const pendingWithdraws = await pool.query(`
        SELECT 
          "user_name" AS "User",
          email AS "Email",
          account AS "Account",
          plan AS "Plan",
          withdraw_amount AS "Withdraw",
          method AS "Method",
          requested_at AS "Requested At",
          action AS "Action"
        FROM "withdraw"
        WHERE status = 'rejected'
        ORDER BY requested_at DESC
      `);

      res.status(200).json({
        success: true,
        message: 'Pending withdraws fetched successfully',
        data: pendingWithdraws.rows,
      });
    } catch (error) {
      console.error("rejected Withdraw API Error:", error);
      res.status(500).json({ success: false, message: "Server error", data: null });
    }
});

// today withdraw
router.route('/withdraws/today').get(async (req, res) => { 
            try {
      const pendingWithdraws = await pool.query(`
        SELECT 
          "user_name" AS "User",
          email AS "Email",
          account AS "Account",
          plan AS "Plan",
          withdraw_amount AS "Withdraw",
          method AS "Method",
          requested_at AS "Requested At",
          action AS "Action"
        FROM "withdraw"
        WHERE DATE(requested_at) = CURRENT_DATE 
        ORDER BY requested_at DESC
      `);

      res.status(200).json({
        success: true,
        message: 'Pending withdraws fetched successfully',
        data: pendingWithdraws.rows,
      });
    } catch (error) {
      console.error("today Withdraw API Error:", error);
      res.status(500).json({ success: false, message: "Server error", data: null });
    }

});

// last week withdraw
router.route('/withdraws/lastweek').get(async (req, res) => { 
              try {
      const pendingWithdraws = await pool.query(`
        SELECT 
          "user_name" AS "User",
          email AS "Email",
          account AS "Account",
          plan AS "Plan",
          withdraw_amount AS "Withdraw",
          method AS "Method",
          requested_at AS "Requested At",
          action AS "Action"
        FROM "withdraw"
        WHERE requested_at >= CURRENT_DATE - INTERVAL '7 days' 
        ORDER BY requested_at DESC
      `);

      res.status(200).json({
        success: true,
        message: 'Pending withdraws fetched successfully',
        data: pendingWithdraws.rows,
      });
    } catch (error) {
      console.error("lastweek Withdraw API Error:", error);
      res.status(500).json({ success: false, message: "Server error", data: null });
    }
  // WHERE requested_at >= CURRENT_DATE - INTERVAL '7 days' 
});

router.route('/challenge/passed/today').get(async (req, res) => {
       try {
  const result = await pool.query(`
    SELECT * FROM challenge_passed WHERE DATE(passed_at) = CURRENT_DATE ORDER BY passed_at DESC
  `);

    res.status(200).json({
        success: true,
        message: 'passed today withdraws fetched successfully',
        data: result.rows,
      });
  } catch (error) {
      console.error("Pending Withdraw API Error:", error);
      res.status(500).json({ success: false, message: "Server error", data: null });
    }
});

router.route('/challenge/passed/lastweek').get(async (req, res) => {
      try {
  const result = await pool.query(`
    SELECT * FROM challenge_passed WHERE passed_at >= CURRENT_DATE - INTERVAL '7 days' ORDER BY passed_at DESC
  `);
   res.status(200).json({
        success: true,
        message: 'passed today withdraws fetched successfully',
        data: result.rows,
      });
  } catch (error) {
      console.error("Pending Withdraw API Error:", error);
      res.status(500).json({ success: false, message: "Server error", data: null });
    }
});

router.route('/account/breached/today').get(async (req, res) => {
    try{

   
  const result = await pool.query(`
    SELECT * FROM account_breach WHERE DATE(breach_date) = CURRENT_DATE ORDER BY breach_date DESC
  `);
   res.status(200).json({
        success: true,
        message: 'breached today withdraws fetched successfully',
        data: result.rows,
      });
  } catch (error) {
      console.error("breached tody Withdraw API Error:", error);
      res.status(500).json({ success: false, message: "Server error", data: null });
    }
});

router.route('/account/breached/lastweek').get(async (req, res) => {
       try{

  const result = await pool.query(`
    SELECT * FROM account_breach WHERE breach_date >= CURRENT_DATE - INTERVAL '7 days' ORDER BY breach_date DESC
  `);
   res.status(200).json({
        success: true,
        message: 'breached lastweek withdraws fetched successfully',
        data: result.rows,
      });
  } catch (error) {
      console.error("breached lastweek Withdraw API Error:", error);
      res.status(500).json({ success: false, message: "Server error", data: null });
    }
});


// CREATE TABLE "withdraw" (
//     "id" SERIAL PRIMARY KEY,
//     "user_id" INTEGER NOT NULL,
//     "email" VARCHAR(255) NOT NULL,
//     "account" VARCHAR(100) NOT NULL,
//     "plan" VARCHAR(100) NOT NULL,
//     "withdraw_amount" NUMERIC(15, 2) NOT NULL,
//     "method" VARCHAR(50) NOT NULL,       -- e.g., 'Bank Transfer', 'UPI', etc.
//     "requested_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
//     "status" VARCHAR(20) NOT NULL CHECK ("status" IN ('pending', 'approved', 'rejected')),
//     "action" TEXT,                        -- You can store action notes here
//     "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
//     "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
//     CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "users" ("id")
// );


// CREATE TABLE "deposit" (
//     "id" SERIAL PRIMARY KEY,
//     "user_id" INTEGER NOT NULL,
//     "user_name" VARCHAR(100) NOT NULL,
//     "email" VARCHAR(255) NOT NULL,
//     "account" VARCHAR(100) NOT NULL,
//     "plan" VARCHAR(100) NOT NULL,
//     "deposit_amount" NUMERIC(15, 2) NOT NULL,
//     "ac_size" VARCHAR(50),               -- Account size as string, adjust datatype if needed
//     "requested_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
//     "proof" TEXT,                       -- URL or text path to deposit proof
//     "status" VARCHAR(20) NOT NULL CHECK ("status" IN ('pending', 'approved', 'rejected')),
//     "action" TEXT,                      -- Admin or system action notes
//     "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
//     "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
//     CONSTRAINT "fk_user" FOREIGN KEY ("user_id") REFERENCES "users" ("id")
// );



     function   Sendmailforvarification()
        {
  //           const transporter = nodemailer.createTransport({
//    host: '127.0.0.1', // instead of 'localhost' or '::1'
//   port: 1025,
//   secure: false,
// });

// // Inline HTML template
// const htmlContent = `
// <!DOCTYPE html>
// <html>
// <head>
//   <style>
//     .btn {
//       background-color: #2f5135;
//       color: white;
//       padding: 10px 20px;
//       text-decoration: none;
//       border-radius: 5px;
//       display: inline-block;
//       margin: 10px 0;
//     }
//     .container {
//       font-family: Arial, sans-serif;
//       padding: 20px;
//     }
//     .footer {
//       margin-top: 30px;
//       font-size: 12px;
//       color: gray;
//     }
//     .warning {
//       color: red;
//       font-size: 13px;
//     }
//   </style>
// </head>
// <body>
//   <div class="container">
//     <h2>Account verification</h2>
//     <p>Dear Trader,</p>
//     <p>Thank you for choosing <strong>Pro Funded</strong> as your premier trading platform. We're excited to have you on board!</p>
//     <p>To get started and unlock the full potential of your trading journey, please verify your email address:</p>
//     <a href="https://your-verification-link.com" class="btn">Verify Email Now</a>
//     <p>Thank you for choosing us.</p>
//     <p>Happy trading!</p>
//     <p>Best regards,<br>The Pro Funded Team</p>
//     <hr>
//     <p class="warning">
//       Risk Warning: Trading CFDs carries high risk and may result in losses beyond your initial investment.
//       Trade only with money you can afford to lose and understand the risks.
//     </p>
//     <p class="footer">
//       Our Trades services are not for U.S. citizens or in jurisdictions where they violate local laws.<br>
//       Website: www.testcrm.co.in | E-mail: admin@testcrm.co.in<br>
//       &copy; 2025 Pro Funded. All Rights Reserved.
//     </p>
//   </div>
// </body>
// </html>
// `;

// // Send email
// transporter.sendMail({
//   from: '"Pro Funded" <admin@testcrm.co.in>',
//   to: 'ramya.c236@gmail.com', // Replace with actual email
//   subject: 'Email Verification',
//   html: htmlContent
// }, (error, info) => {
//   if (error) {
//     return console.log('Error sending email:', error);
//   }
//   console.log('Email sent:', info.response);
// });

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 587,
  secure: false, // use TLS
  auth: {
    user: '6a87403aec3ac1',  // Your Brevo login
    pass: '3fa3f9981a1f02'   // Replace with actual SMTP password
  }
});
const mailOptions = {
  from: 'ramya.c236@gmail.com',
  to: 'ramya.c236@gmail.com',
  subject: 'Email Verification',
  html: `
  <div style="max-width:600px;margin:30px auto;background-color:#fff;padding:30px;border-radius:8px;font-family:Arial,sans-serif;border:1px solid #ddd;">
    <h2 style="background-color:#2f5135;color:white;padding:15px;text-align:center;border-radius:5px;margin-top:0;">
      Account verification
    </h2>

    <p style="font-size:15px;line-height:1.6;color:#333;">
      Dear Trader,
    </p>

    <p style="font-size:15px;line-height:1.6;color:#333;">
      Thank you for choosing <strong>Pro Funded</strong> as your premier trading platform. We're excited to have you on board!
    </p>

    <p style="font-size:15px;line-height:1.6;color:#333;">
      To get started and unlock the full potential of your trading journey, please verify your email address:
    </p>

    <div style="text-align:center;margin:20px 0;">
      <a href="https://your-verification-link.com" style="display:inline-block;padding:12px 25px;background-color:#2f5135;color:#fff;text-decoration:none;border-radius:5px;">
        Verify Email Now
      </a>
    </div>

    <p style="font-size:15px;line-height:1.6;color:#333;">Thank you for choosing us.</p>
    <p style="font-size:15px;line-height:1.6;color:#333;">Happy trading!</p>
    <p style="font-size:15px;line-height:1.6;color:#333;">Best regards,<br>The Pro Funded Team</p>

    <p style="color:#d00;font-size:13px;margin-top:30px;border-top:1px solid #ccc;padding-top:15px;">
      <strong>Risk Warning:</strong> Trading CFDs carries high risk and may result in losses beyond your initial investment. Trade only with money you can afford to lose and understand the risks.<br>
      Our Trade's services are not for U.S. citizens or in jurisdictions where they violate local laws.
    </p>

    <!-- Green Footer Section -->
    <div style="background-color:#2f5135;color:#fff;padding:20px;margin-top:30px;border-radius:10px;text-align:center;font-size:13px;line-height:1.6;">
      <p style="margin:0 0 10px;"><strong>United Kingdom</strong></p>
      <p style="margin:0 0 10px;">
        Website: <a href="http://www.testcrm.co.in" style="color:#fff;text-decoration:underline;">www.testcrm.co.in</a> |
        E-mail: <a href="mailto:admin@testcrm.co.in" style="color:#fff;text-decoration:underline;">admin@testcrm.co.in</a>
      </p>
      <p style="margin:0 0 10px;">
        We sent out this message to all existing Pro Funded traders.
        Please visit this page to know more about our <a href="#" style="color:#fff;text-decoration:underline;">Privacy Policy</a>.
      </p>
      <p style="margin:0;">&copy; 2025 Pro Funded. All Rights Reserved.</p>
    </div>
  </div>
  `
};




transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.error('Error sending email:', error);
  }
  console.log('✅ Email sent (to MailDev):', info.messageId);
});
        }


          function   Sendmailforvarifiedemail()
        {


const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 587,
  secure: false, // use TLS
  auth: {
    user: '6a87403aec3ac1',  // Your Brevo login
    pass: '3fa3f9981a1f02'   // Replace with actual SMTP password
  }
});
const mailOptions = {
  from: 'ramya.c236@gmail.com',
  to: 'ramya.c236@gmail.com',
  subject: 'Email Verification',
  html: `
  <div style="max-width:600px;margin:30px auto;background-color:#fff;padding:30px;border-radius:8px;font-family:Arial,sans-serif;border:1px solid #ddd;">
    <h2 style="background-color:#2f5135;color:white;padding:15px;text-align:center;border-radius:5px;margin-top:0;">
      Account verification
    </h2>

    <p style="font-size:15px;line-height:1.6;color:#333;">
      Dear Trader,
    </p>

    <p style="font-size:15px;line-height:1.6;color:#333;">
      Thank you for choosing <strong>Pro Funded</strong> as your premier trading platform. We're excited to have you on board!
    </p>
  <div style="max-width:600px;margin:30px auto;background-color:#fff;padding:30px;border-radius:8px;font-family:Arial,sans-serif;border:1px solid #ddd;">
    <h2 style="background-color:#2f5135;color:white;padding:15px;text-align:center;border-radius:5px;margin-top:0;">
      Account verification
    </h2>

    <p style="font-size:15px;line-height:1.6;color:#333;">
       Dear Ramya C,
    </p>

    <p style="font-size:15px;line-height:1.6;color:#333;">
      Your email has been successfully verified. You can now securely log in to your account and access all available features. If you experience any issues during login, please don't hesitate to reach out for assistance. Thank you for completing the verification process.
    </p>

  <div style="border-left: 4px solid #1890ff; background-color: #f9f9f9; padding: 15px; margin-top: 20px;">
    <p><strong>Name:</strong> Ramya C</p>
    <p><strong>Username:</strong> <a href="mailto:ramya.c236@gmail.com" style="color: #004085;">ramya.c236@gmail.com</a></p>
    <p><strong>Password:</strong> 123</p>
  </div>
</div>


    <p style="font-size:15px;line-height:1.6;color:#333;">Thank you for choosing us.</p>
    <p style="font-size:15px;line-height:1.6;color:#333;">Happy trading!</p>
    <p style="font-size:15px;line-height:1.6;color:#333;">Best regards,<br>The Pro Funded Team</p>

    <p style="color:#d00;font-size:13px;margin-top:30px;border-top:1px solid #ccc;padding-top:15px;">
      <strong>Risk Warning:</strong> Trading CFDs carries high risk and may result in losses beyond your initial investment. Trade only with money you can afford to lose and understand the risks.<br>
      Our Trade's services are not for U.S. citizens or in jurisdictions where they violate local laws.
    </p>

    
    <!-- Green Footer Section -->
    <div style="background-color:#2f5135;color:#fff;padding:20px;margin-top:30px;border-radius:10px;text-align:center;font-size:13px;line-height:1.6;">
      <p style="margin:0 0 10px;"><strong>United Kingdom</strong></p>
      <p style="margin:0 0 10px;">
        Website: <a href="http://www.testcrm.co.in" style="color:#fff;text-decoration:underline;">www.testcrm.co.in</a> |
        E-mail: <a href="mailto:admin@testcrm.co.in" style="color:#fff;text-decoration:underline;">admin@testcrm.co.in</a>
      </p>
      <p style="margin:0 0 10px;">
        We sent out this message to all existing Pro Funded traders.
        Please visit this page to know more about our <a href="#" style="color:#fff;text-decoration:underline;">Privacy Policy</a>.
      </p>
      <p style="margin:0;">&copy; 2025 Pro Funded. All Rights Reserved.</p>
    </div>
  </div>
 
  `
};




transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    return console.error('Error sending email:', error);
  }
  console.log('✅ Email sent (to MailDev):', info.messageId);
});
        }
    return router;

};

module.exports = routes;
