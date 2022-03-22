const express = require('express')
const nodemailer = require('nodemailer')
require('dotenv').config();

const app = express()
app.use(express.static('form'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/form/test-form.html')
})

/* app.get('/', (req, res) => {
  return res.status(200).send({
      success: 'true',
  })
}) */


app.post('/', (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.USER,
      pass: process.env.PASS
    }
  })

  const mailOptions = {
    from: req.body.email,
    to: process.env.USER,
    subject: `Message from ${req.body.email}: ${req.body.subject}`,
    text: req.body.message
  }

  transporter.sendMail(mailOptions, (error, info) =>{
    if(error){
      console.log(error);
      res.status(500).send('Something went wrong.')
    }else{
      res.status(200).send('Email sent!')
    }
  })
  res.send('success')
})


const PORT = 8080

app.listen(PORT, () => {
    console.log(`running on PORT ${PORT}`);
})