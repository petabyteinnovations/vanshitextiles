const { client } = require("../../config/redisconnection");
const checkEmail = require("../../utils/checkEmail");
const bcryptgenerate = require("../../utils/generatebcrypt");
const generateJsonToken = require("../../utils/generateJsonToken");
const generateotp = require("../../utils/generateOtp");
const isbooleanvalue = require("../../utils/isBoolean");
const sendJson = require("../../utils/sendJson");
const verifybcrypt = require("../../utils/verifybcrypt");
const sendEmail = require("../../config/mailsender");
const csrf = require("../../utils/csrf");
require("dotenv").config();

async function sendmessagecontent(otp) {
  try {
    await sendEmail(
      process.env.ADMINEMAIL,
      "Verify Your Email – Vanshi Textiles",
      "This OTP is valid for 10 minutes. Please do not share it with anyone for security reasons.",
      `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Vanshi Textile - OTP Verification</title>
</head>

<body style="margin:0;padding:40px 15px;background:#f5f7fa;font-family:Arial,Helvetica,sans-serif;">

    <table width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
            <td align="center">

                <table width="640" cellpadding="0" cellspacing="0" border="0"
                    style="background:#ffffff;border:1px solid #ececec;border-radius:18px;overflow:hidden;">

                    <!-- ================= HEADER ================= -->

                    <tr>
                        <td align="center" style="padding:55px 50px 40px;background:#ffffff;">

                            <img src="cid:logo" alt="Vanshi Textile" width="220"
                                style="display:block;margin:0 auto;border:0;">

                            <div style="
                            width:70px;
                            height:3px;
                            background:#C7A45A;
                            margin:30px auto;
                            border-radius:20px;">
                            </div>

                            <h1 style="
                            margin:0;
                            color:#163E78;
                            font-size:34px;
                            font-weight:700;">
                                OTP Verification
                            </h1>

                            <p style="
                            margin-top:12px;
                            color:#6b7280;
                            font-size:15px;
                            line-height:24px;">
                                Secure verification for your Vanshi Textile account.
                            </p>

                        </td>
                    </tr>

                    <!-- ================= BODY ================= -->

                    <tr>
                        <td style="padding:0 55px 50px;">

                            <h2 style="
                            margin:0;
                            color:#163E78;
                            font-size:28px;
                            font-weight:700;">
                                Hello,
                            </h2>

                            <p style="
                            margin-top:22px;
                            color:#5B6472;
                            font-size:16px;
                            line-height:30px;">

                                Thank you for choosing
                                <strong style="color:#163E78;">Vanshi Textile</strong>.

                                <br><br>

                                We received a request to verify your account.
                                Please use the verification code below to continue securely.

                            </p>

                            <!-- OTP SECTION -->

                            <table width="100%" cellpadding="0" cellspacing="0"
                                style="margin:45px 0 40px;">

                                <tr>
                                    <td align="center">

                                        <p style="
                                        margin:0 0 18px;
                                        font-size:13px;
                                        font-weight:bold;
                                        letter-spacing:2px;
                                        color:#8A6A2B;
                                        text-transform:uppercase;">
                                            Your Verification Code
                                        </p>

                                        <table cellpadding="0" cellspacing="0" border="0"
                                            style="background:#163E78;border:3px solid #C7A45A;border-radius:16px;">
                                            <tr>
                                                <td style="padding:24px 55px;">

                                                    <span style="
                                                    color:#ffffff;
                                                    font-size:48px;
                                                    font-weight:bold;
                                                    letter-spacing:14px;
                                                    font-family:Arial,Helvetica,sans-serif;">
                                                        ${otp}
                                                    </span>

                                                </td>
                                            </tr>
                                        </table>

                                        <p style="
                                        margin-top:18px;
                                        font-size:14px;
                                        color:#6B7280;">
                                            This verification code is valid for
                                            <strong>10 minutes.</strong>
                                        </p>

                                    </td>
                                </tr>

                            </table>

                            <!-- SECURITY BOX -->

                            <table width="100%" cellpadding="0" cellspacing="0"
                                style="border:1px solid #ECECEC;border-radius:12px;">

                                <tr>
                                    <td style="padding:28px;">

                                        <h3 style="
                                        margin:0;
                                        color:#163E78;
                                        font-size:18px;">
                                            Security Reminder
                                        </h3>

                                        <p style="
                                        margin-top:18px;
                                        color:#5B6472;
                                        font-size:15px;
                                        line-height:30px;">

                                            • Never share your OTP with anyone.

                                            <br>

                                            • This OTP will expire in
                                            <strong>10 minutes</strong>.

                                            <br>

                                            • Vanshi Textile will never ask for your OTP via phone, email, or message.

                                            <br>

                                            • If you didn't request this verification, simply ignore this email.

                                        </p>

                                    </td>
                                </tr>

                            </table>

                            <p style="
                            margin-top:35px;
                            color:#6B7280;
                            font-size:15px;
                            line-height:28px;">

                                If you have any questions or need assistance, feel free to contact our support team.

                            </p>

                            <p style="
                            margin-top:30px;
                            color:#163E78;
                            font-size:16px;
                            font-weight:600;">

                                Regards,<br>
                                Team Vanshi Textile

                            </p>

                        </td>
                    </tr>

                    <!-- ================= FOOTER ================= -->

                    <tr>
                        <td align="center"
                            style="padding:35px;background:#ffffff;border-top:1px solid #ececec;">

                            <p style="
                            margin-top:20px;
                            color:#163E78;
                            font-size:15px;
                            font-weight:600;">
                                Wholesale Textile Partner
                            </p>

                            <p style="
                            margin-top:12px;
                            color:#7B8794;
                            font-size:13px;
                            line-height:24px;">

                                This is an automated email. Please do not reply.

                            </p>

                            <div style="
                            width:55px;
                            height:2px;
                            background:#C7A45A;
                            margin:22px auto;">
                            </div>

                            <p style="
                            margin:0;
                            color:#9CA3AF;
                            font-size:12px;">

                                © 2026 Vanshi Textile. All Rights Reserved.

                            </p>

                        </td>
                    </tr>

                </table>

            </td>
        </tr>
    </table>

</body>

</html>`,
    );
  } catch (err) {
    console.error("Error occurred while sending message content:", err);
  }
}

exports.adminlogincontroller = async (req, res) => {
  try {
    let { Email, Password } = req.body;
    if (Email === "" || Password === "")
      return sendJson(res, 0, "All fields are required", null, null);
    if (await !checkEmail(Email))
      return sendJson(res, 0, "Invalid Email Address", null, null);
    if ((await isbooleanvalue(Email)) || (await isbooleanvalue(Password)))
      return sendJson(res, 0, "Invalid Email Or Password", null, null);
    let verifypassword = await verifybcrypt(
      Password,
      process.env.ADMINPASSWORD,
    );

    console.log(verifypassword)
    if (Email !== process.env.ADMINEMAIL || !verifypassword) {
      return sendJson(res, 0, "Invalid Email Or Password", null, null);
    }

    let admindata = {
      Otp: await generateotp(5),
      Attempts: 0,
      MaxAttempts: 3,
      IsVerified: false,
    };

    await client.set(
      `Otp:${process.env.ADMINEMAIL}`,
      JSON.stringify(admindata),
      {
        EX: 600,
      },
    );

    await sendmessagecontent(admindata.Otp);

    return sendJson(
      res,
      1,
      "Otp Sended Successfully",
      null,
      "/pages/admin/auth/otp-verification",
    );
  } catch (err) {
    return sendJson(res, 0, "Something went wrong", null, null);
  }
};

exports.verifyadminotpcontroller = async (req, res) => {
  try {
    // here i am taking Email and otp from input
    let { Email, Otp } = req.body;
    // here i am checking the email and otp is valid or not if not then return the error message
    if (
      (await !checkEmail(Email)) ||
      (await isbooleanvalue(Email)) ||
      Email !== process.env.ADMINEMAIL
    ) {
      return sendJson(res, 0, "Invalid Email Address", null, null);
    }
    // here i am checking the otp is valid or not if not then return the error message
    if ((await isbooleanvalue(Otp)) || Otp.length !== 5) {
      return sendJson(res, 0, "Invalid Otp", null, null);
    }
    // here i am getting the otp from redis and checking the otp is valid or not if not then return the error message
    let redisdata = JSON.parse(await client.get(`Otp:${Email}`));

    if (!redisdata) {
      return sendJson(res, 0, "Otp Expired", null, null);
    }
    if (redisdata.IsVerified || redisdata.Attempts >= redisdata.MaxAttempts) {
      return sendJson(res, 0, "Max Attempts Exceeded", null, null);
    }

    if (Otp !== redisdata.Otp) {
      redisdata.Attempts += 1;
      await client.set(`Otp:${Email}`, JSON.stringify(redisdata), {
        KEEPTTL: true,
      });
      return sendJson(res, 0, "Invalid Otp", null, null);
    }

    let secret = await csrf.secretSync();
    const csrftoken = await csrf.create(secret);

    await client.del(`Otp:${Email}`);
    req.session.user = secret;

    return sendJson(
      res,
      1,
      "Otp Verified Successfully",
      {
        Token: generateJsonToken(
          Email,
          process.env.ADMINJSONWEBTOKEN,
        ),
        Csrftoken: csrftoken,
      },
      "/pages/admin/dashboard",
    );
  } catch (error) {
    return sendJson(res, 0, "Something went wrong", null, null);
  }
};