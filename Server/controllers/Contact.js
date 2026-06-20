const maileSender = require("../utils/sendOtp")

exports.contactMail = async(req,res) =>{
    try{
            const {firstName , lastName , email , phoneNumber , message} = req.body;
            if(!firstName || !lastName || !email || !phoneNumber || !message){
                return res.status(400).json({
                    success:false,
                    message:"Missing Mandatory Details"
                })
            }
           


            const userMailHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
</head>
<body style="margin:0; padding:0; background-color:#020617; font-family:Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#020617; border-radius:12px; overflow:hidden;">
          
          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#22d3ee,#6366f1); padding:20px; text-align:center;">
              <img src="https://s3-alpha.figma.com/hub/file/5087588282/bb702b0d-77ea-4ef0-b9fb-7096edbaa06f-cover.png" alt="StudyNotion" width="140" />
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:30px; color:#e5e7eb;">
              <h2 style="margin-bottom:10px; color:#ffffff;">
                Hi ${firstName} 👋
              </h2>

              <p style="margin-bottom:15px;">
                Thank you for reaching out to <strong>StudyNotion</strong>!
              </p>

              <p style="margin-bottom:20px;">
                We’ve successfully received your idea/feedback and our team will review it shortly.
              </p>

              <div style="background:#020617; border-radius:6px; padding:15px; border:1px solid #1e293b;">
                <p style="margin:0; color:#c7d2fe;">
                  <strong>Your Message:</strong><br/><br/>
                  ${message}
                </p>
              </div>

              <p style="margin-top:25px;">
                🚀 Keep learning. Keep growing.
              </p>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#020617; padding:15px; text-align:center; color:#9ca3af; font-size:12px;">
              © ${new Date().getFullYear()} StudyNotion • All Rights Reserved
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;



const adminMailHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
</head>
<body style="margin:0; padding:0; background-color:#0f172a; font-family:Arial, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#020617; border-radius:12px; overflow:hidden;">
          
          <!-- HEADER -->
          <tr>
            <td style="background:linear-gradient(135deg,#6366f1,#22d3ee); padding:20px; text-align:center;">
              <img src="https://s3-alpha.figma.com/hub/file/5087588282/bb702b0d-77ea-4ef0-b9fb-7096edbaa06f-cover.png" alt="StudyNotion" width="140" />
            </td>
          </tr>

          <!-- BODY -->
          <tr>
            <td style="padding:30px; color:#e5e7eb;">
              <h2 style="margin:0 0 15px; color:#ffffff;">
                New Idea / Feedback Received 🚀
              </h2>

              <p style="margin:0 0 10px;">
                <strong>Name:</strong> ${firstName} ${lastName}
              </p>
              <p style="margin:0 0 10px;">
                <strong>Email:</strong> ${email}
              </p>
              <p style="margin:0 0 20px;">
                <strong>Phone:</strong> ${phoneNumber}
              </p>

              <div style="background:#020617; border-left:4px solid #22d3ee; padding:15px; border-radius:6px;">
                <p style="margin:0; color:#c7d2fe;">
                  ${message}
                </p>
              </div>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background:#020617; padding:15px; text-align:center; color:#9ca3af; font-size:12px;">
              © ${new Date().getFullYear()} StudyNotion • Admin Notification
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
















           
          // const user  = await User.findOne(email)
          // if(!user){
          //    return res.status(404).json({
          //           success:false,
          //           message:"User not Found ! Do login again"
          //       })
          // }

        const sendMessage = await maileSender(process.env.MAIL_USER,` Idea by ${firstName} ${lastName} `,
                       adminMailHTML
);

          if(sendMessage){
            const sendResponse  = await maileSender(email, `Your message has been sent successfully to Study Notion`, userMailHTML
);
            if(!sendResponse){
              return res.status(400).json({
                success:false,
                message:"Unable to send confirmation email, please try later"
              })
            }

          }
          else{
            return res.status(400).json({
                success:false,
                message:"Unable to send message to Admin , please try later"
            })
          }
          res.status(200).json({
            success:true,
            message:"Message sent Successfully"
          })

    }
    catch(error){
              console.log(error);
              res.status(500).json({
                success:false,
                message:error.message
              })
    }
}