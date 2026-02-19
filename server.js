const express = require('express');
const twilio = require('twilio');
const app = express();
app.use(express.json());

const accountSid = 'შენი_SID'; 
const authToken = 'შენი_TOKEN';
const client = new twilio(accountSid, authToken);

app.post('/send-otp', (req, res) => {
    const userNumber = req.body.phone; // საიტიდან გამოგზავნილი ნომერი
    const code = Math.floor(1000 + Math.random() * 9000);

    client.messages.create({
        body: `გამარჯობა! შენი კოდია: ${code}`,
        from: 'whatsapp:+14155238886', 
        to: `whatsapp:${userNumber}`
    })
    .then(message => res.send({ success: true, sid: message.sid }))
    .catch(err => res.status(500).send(err));
});

app.listen(3000, () => console.log('Server is running on port 3000'));
