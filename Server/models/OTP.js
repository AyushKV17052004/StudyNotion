const mongoose = require("mongoose");
 const maileSender = require("../utils/sendOtp")

const OTPSchema = new mongoose.Schema(
    {
      email:{
        type:String,
        required:true
      },
      Otp:{
        type:String
      },
      createdAT:{
        type:Date,
        default:Date.now,   // no () – evaluated fresh per document
        expires:300         // 300 seconds = 5 minutes (NOT 300000)
      }

    }
)


const OTPStyling = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Email Verification</title>
  </head>

  <body
    style="
      margin: 0;
      padding: 0;
      background-color: #0f172a;
      font-family: Arial, Helvetica, sans-serif;
    "
  >
    <table width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center" style="padding: 40px 0">
          <table
            width="100%"
            cellpadding="0"
            cellspacing="0"
            style="
              max-width: 500px;
              background: linear-gradient(135deg, #020617, #020617);
              border-radius: 12px;
              box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
              overflow: hidden;
            "
          >
            <!-- Header -->
            <tr>
              <td
                style="
                  background: linear-gradient(90deg, #2563eb, #22c55e);
                  padding: 20px;
                  text-align: center;
                "
              >
                <h1
                  style="
                    margin: 0;
                    color: #ffffff;
                    font-size: 26px;
                    letter-spacing: 1px;
                  "
                >
                  STUDYNOTION
                </h1>
              </td>
            </tr>

            <!-- Body -->
            <tr>
              <td style="padding: 30px; color: #e5e7eb">
                <h2 style="margin-top: 0; color: #ffffff">
                  Verify Your Email Address
                </h2>

                <p style="font-size: 15px; line-height: 1.6">
                  Welcome to <strong>Studynotion</strong> 🎓 <br /><br />
                  To complete your sign-up, please use the One-Time Password
                  (OTP) below to verify your email address.
                </p>

                <!-- OTP Box -->
                <div
                  style="
                    margin: 30px 0;
                    padding: 20px;
                    background: #020617;
                    border-radius: 10px;
                    text-align: center;
                    border: 2px dashed #22c55e;
                  "
                >
                  <p
                    style="
                      margin: 0;
                      font-size: 14px;
                      color: #9ca3af;
                      letter-spacing: 1px;
                    "
                  >
                    YOUR OTP CODE
                  </p>
                  <h1
                    style="
                      margin: 10px 0 0;
                      font-size: 36px;
                      letter-spacing: 8px;
                      color: #22c55e;
                    "
                  >
                    {{OTP}}
                  </h1>
                </div>

                <p style="font-size: 14px; color: #d1d5db">
                  This OTP is valid for
                  <strong style="color: #facc15">5 minutes</strong>. Please do
                  not share this code with anyone.
                </p>

                <p style="font-size: 14px; color: #9ca3af">
                  If you did not request this, you can safely ignore this email.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                style="
                  background-color: #020617;
                  padding: 15px;
                  text-align: center;
                  font-size: 12px;
                  color: #6b7280;
                "
              >
                © 2026 Studynotion • Learn Today, Lead Tomorrow
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>


`

async function sendVerificationEmail(email , Otp){
    try{
        const mailResponse = await maileSender(email ,"STUDYNOTION || OTP for VERIFICATION"  , OTPStyling.replace("{{OTP}}", Otp) );
        console.log("Mail sent Successfully" , mailResponse);
    }
    catch(error){
        console.log("Error while Sending Verification Mail:", error.message );
        console.log(`\n======================================================`);
        console.log(`[DEV FALLBACK] Generated OTP for ${email}: ${Otp}`);
        console.log(`======================================================\n`);
    }
}
OTPSchema.pre("save" , async function(){
    if (this.isNew) {
        await sendVerificationEmail(this.email , this.Otp);
    }
})




module.exports = mongoose.model("OTP" , OTPSchema);