const https = require("https");
require("dotenv").config();

const maileSender = async (email , title , body)=>{
    return new Promise((resolve, reject) => {
        const postData = JSON.stringify({
            from: "StudyNotion <onboarding@resend.dev>",
            to: email,
            subject: title,
            html: body
        });

        const options = {
            hostname: 'api.resend.com',
            port: 443,
            path: '/emails',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
                'Content-Length': Buffer.byteLength(postData)
            }
        };

        const req = https.request(options, (res) => {
            let responseBody = '';
            res.on('data', (chunk) => {
                responseBody += chunk;
            });
            res.on('end', () => {
                try {
                    const parsedData = JSON.parse(responseBody);
                    if (res.statusCode >= 200 && res.statusCode < 300) {
                        console.log("Email sent successfully via Resend:", parsedData);
                        resolve(parsedData);
                    } else {
                        console.log("Resend API error status:", res.statusCode, parsedData);
                        reject(new Error(parsedData.message || "Failed to send email"));
                    }
                } catch (e) {
                    reject(new Error("Failed to parse Resend response: " + e.message));
                }
            });
        });

        req.on('error', (error) => {
            console.error("HTTP request error sending email via Resend:", error);
            reject(error);
        });

        req.write(postData);
        req.end();
    });
}

module.exports = maileSender;