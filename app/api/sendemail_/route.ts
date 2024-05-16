import nodemailer from "nodemailer";


export async function POST(request: Request) {

  console.log("send email");

  const data = await request.json()

  console.log(data);

  /*
    const transporter = nodemailer.createTransport({
      host: "gmail-smtp-in.l.google.com", 
      port: 25,
      secure: false,
    });
  
      let mailOptions = {
        from: data.email, // sender address
        to: "solanadama@gmail.com", 
        subject: data.subject,
        text: data.message
      };
  
      transporter.sendMail(mailOptions,(error: any, info: { response: any; }) => {
        if (error) {
            console.log(error);
        }
        console.log(`Message sent: ${info.response}`);
      }); 
      */
  return new Response('Solanadama API sendmail')
}
