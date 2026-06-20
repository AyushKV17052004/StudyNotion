const bcrypt = require("bcrypt");
const User = require("../models/User")
const maileSender = require("../utils/sendOtp")
const crypto = require("crypto");


const LINKStyling = `

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Reset Your Password</title>
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
              max-width: 520px;
              background: #020617;
              border-radius: 14px;
              box-shadow: 0 12px 35px rgba(0, 0, 0, 0.45);
              overflow: hidden;
            "
          >
            <!-- Header -->
            <tr>
              <td
                style="
                  background: linear-gradient(90deg, #2563eb, #9333ea);
                  padding: 22px;
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
              <td style="padding: 32px; color: #e5e7eb">
                <h2 style="margin-top: 0; color: #ffffff">
                  Reset Your Password
                </h2>

                <p style="font-size: 15px; line-height: 1.7">
                  We received a request to reset the password for your
                  <strong>Studynotion</strong> account.
                </p>

                <p style="font-size: 15px; line-height: 1.7">
                  Click the button below to set a new password. This link is
                  valid for
                  <strong style="color: #facc15">5 minutes</strong>.
                </p>

                <!-- Button -->
                <div style="text-align: center; margin: 35px 0">
                  <a
                    href="{{RESET_LINK}}"
                    style="
                      display: inline-block;
                      padding: 14px 30px;
                      background: linear-gradient(90deg, #22c55e, #16a34a);
                      color: #020617;
                      text-decoration: none;
                      font-size: 16px;
                      font-weight: bold;
                      border-radius: 8px;
                      box-shadow: 0 6px 18px rgba(34, 197, 94, 0.35);
                    "
                  >
                    Reset Password
                  </a>
                </div>

                <!-- Fallback -->
                <p style="font-size: 14px; color: #9ca3af">
                  If the button doesn’t work, copy and paste this link into your
                  browser:
                </p>

                <p
                  style="
                    word-break: break-all;
                    font-size: 13px;
                    color: #60a5fa;
                  "
                >
                  {{RESET_LINK}}
                </p>

                <p style="font-size: 14px; color: #d1d5db">
                  If you didn’t request a password reset, please ignore this
                  email. Your account remains secure.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td
                style="
                  background-color: #020617;
                  padding: 16px;
                  text-align: center;
                  font-size: 12px;
                  color: #6b7280;
                "
              >
                © 2026 Studynotion • Secure Learning Platform
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>


`


exports.resetController = async (req , res )=>{
    try{
        const {email} = req.body;
        if(!email){
            return res.status(401).json({
                success:false,
                message:"Enter the email"
            })
        }

        const user  = await User.findOne({email});
        if(!user){
             return res.status(403).json({
                success:false,
                message:"User is not Registered or Link has been Expired"
            })
        }

        const token  = crypto.randomUUID();
        const URL = `http://localhost:5173/reset-Password/${token}`

        // ✅ Save token to DB FIRST so it persists even if email fails
        user.token = token;
        user.tokenExpiry = Date.now()+(5*60*1000);
        await user.save();

        // Attempt to send email; fall back to console log if SMTP fails
        try {
            await maileSender(email , "STUDYNOTION: Link for resetting Password" , LINKStyling.replaceAll("{{RESET_LINK}}" , URL))
            console.log("[RESET] Password reset email sent to:", email);
        } catch (mailError) {
            console.warn("[RESET][DEV FALLBACK] SMTP failed – use this link to reset password:", URL);
            console.error("[RESET] Mail error:", mailError.message);
        }

        res.status(200).json({
            success:true,
            message:"Link Successfully Sent to email",
        })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Error while Resetting Password , Please try again later"
        })

    }
}
exports.changePassword = async (req,res)=>{
    try{
        const{newPassword , confirmPassword , token} = req.body;

        if(!newPassword || !confirmPassword){
            return res.status(401).json({
                success:false,
                message:"Enter all fields"
            })
        }
        if(newPassword !== confirmPassword){
              return res.status(400).json({
                success:false,
                message:"Passwords do not match!"
            })
        }
        
        const hashedPass = await bcrypt.hash(newPassword ,10);

        const user = await User.findOne({token:token});
        if(!user){
            return res.status(403).json({
                success:false,
                message:"User is not Registered"
            })
        }
        if(Date.now()> user.tokenExpiry){
             return res.status(403).json({
                success:false,
                message:"LINK is expired , Please try again"
            })
        }
        user.Password = hashedPass;
        user.token = undefined;
       user.tokenExpiry = undefined;

        await user.save()
 
        res.status(200).json({
            success:true,
            message:"Password is successfully reset"
        })       
    }
    catch(error){
   console.log(error);
   return res.status(500).json({
    success:false,
    message:"Something went wrong while resetting password"
   })
    }
}