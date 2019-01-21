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
      Thank you for joining to our community in <strong>scourtapp.com</strong>!
      <br />
      <br />
      You have registered with this email address. (${data.email}) We will be using this address to inform you about your messages from your team members or from other coaches. We will also send you emails about latest updates and our most recent features.
      <br />
      <br />
      Don't forget to update your account with your contact informations and your profile photo so that others can reach you easily. We assure you that we won't share your informations with third parties without your permission. 
      <br />
      <br />
      Click here to go our web site: <a href='https://www.scourtapp.com'>https://www.scourtapp.com</a>
      <br />
      <br />
      If you don't want to receive emails from us you can change your settings from your dashboard as well.
      <br />
      <br />
      Scourtapp Team
    `
  }),
  coachRegister: (data) => ({
    to: data.email,
    subject: 'Scourtapp.com: Coach Register',
    html: `
      Thank you for joining to our community in <strong>scourtapp.com</strong>!
      <br />
      <br />
      You have registered with this email address. (${data.email}) We will be using this address to inform you about your messages from your players or from other coaches. We will also send you emails about latest updates and our most recent features.
      <br />
      <br />
      You can use your page to create team pages where you can send messages to your players, keep record of your practices, share your tactics and do much more!
      <br />
      <br />
      Your players can login to your team page via the team ID which you will get after you create your team. 
      <br />
      <br />
      Don't forget to update your account with your contact informations and your profile photo so that others can reach you easily. We assure you that we won't share your informations with third parties without your permission. 
      <br />
      <br />
      Click here to go our website: <a href='https://www.scourtapp.com'>https://www.scourtapp.com</a>
      <br />
      <br />
      If you don't want to receive emails from us you can change your settings from your dashboard as well.
      <br />
      <br />
      Scourtapp Team
    `
  }),
  newComment: (data) => ({
    to: data.player.email,
    subject: `Scourtapp.com: Your coach tagged you to a comment!`,
    html: `
      Hi ${data.player.name.split(' ')[0]},
      <br />
      <br />
      Your coach tagged you to one of his comments! Don't forget to check your account to see your mistakes in the analyzed video. You can use your coach's comments to improve your technique.
      <br />
      <br />
      To see the comment click the link: <a href='https://www.scourtapp.com/app/team/videos/comments/?id=${data.player.team}&video=${data.video}'> www.scourtapp.com <a />
      <br />
      <br />
      Scourtapp Team
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
