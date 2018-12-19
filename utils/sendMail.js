const nodemailer = require('nodemailer');
const htmlToText = require('nodemailer-html-to-text').htmlToText;

const transporter = nodemailer.createTransport({
  direct: true,
  host: 'smtp.gmail.com',
  port: 465,
  auth: { 
    user: 'scourturkey@gmail.com', 
    pass: '!Scourt34.'
  },
  secure: true
});
transporter.use('compile', htmlToText());

const templates = {
  userRegister: (data) => ({
    to: data.email,
    subject: 'Scourtapp.com: User Register',
    html: `
      <a href='https://www.scourtapp.com'>Thank you for joining to our comunity in <strong>scourtapp.com</strong></a>!
      <br />
      You have registered with this email address. (${data.email}) We will be using this address to inform you about your messages from your team members or from other coaches. We will also send you emails about latest updates and our newest features.
      <br />
      Don't forget to edit your account with your contact informations and your profile photo so that others can reach you easily. We assure you that we won't share your informations with others without your permission. 
      <br />
      Click to go our web site: <a href='https://www.scourtapp.com'>https://www.scourtapp.com</a>
      <br />
      If you don't want to take this emails you can change the settings from your dashboard as well.
    `
  }),
  coachRegister: (data) => ({
    to: data.email,
    subject: 'Scourtapp.com: Coach Register',
    html: `
      <a href='https://www.scourtapp.com'>Thank you for joining to our comunity in <strong>scourtapp.com</strong></a>!
      <br />
      You have registered with this email address. (${data.email}) We will be using this address to inform you about your messages from your players or from other coaches. We will also send you emails about latest updates and our newest features.
      <br />
      You can use your page to create team pages where you can send messages to your players, keep record of your practices, share your tactics and do many other useful things!
      <br />
      Your players can login to your team page via the team id you will get after you create your team. 
      <br />
      Don't forget to edit your account with your contact informations and your profile photo so that others can reach you easily. We assure you that we won't share your informations with others without your permission. 
      <br />
      Click to go our web site: <a href='https://www.scourtapp.com'>https://www.scourtapp.com</a>
      <br />
      If you don't want to take this emails you can change the settings from your dashboard as well.
    `
  }),
  newMessage: (data) => ({
    to: data.email,
    subject: `Scourtapp.com: You have new messages!`,
    html: `
      You didn't check your account for a while! There are new messages from your team members and coaches.
      <br />
      To see them click the link: <a href='https://www.scourtapp.com'> www.scourtapp.com <a />
    `
  }),
  // resetPassword: (data) => ({
  //   to: data.email,
  //   subject: 'Spoonsor.com: Şifre sıfırlama talebi',
  //   html: `
  //     <a href='https://www.spoonsor.com'><strong>Spoonsor.com</strong></a> hesabınızın şifresini sıfırlamak için bir talepte bulundunuz. Şifrenizi sıfırlamak için aşağıdaki linke tıklayın:
  //     <br />
  //     <a href='https://www.spoonsor.com/auth/lost-password/${data.id}/${data.hash}'>https://www.spoonsor.com/auth/lost-password/${data.id}/${data.hash}</a>
  //     <br />
  //     Bu talebi siz göndermediyseniz lütfen görmezden gelin.
  //   `
  // })
};

module.exports = (data, template, callback) => {
  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    ...templates[template](data)
  };
  transporter.sendMail(mailOptions, callback);
};
