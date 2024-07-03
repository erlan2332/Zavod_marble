const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

// Отправка сообщений в Telegram
const sendTelegramMessage = (chatId, message) => {
  const TELEGRAM_BOT_TOKEN = '6733053352:AAEGQY-K4SnfnUhDl_CvhmMmGtu3gW36uGQ';
  return axios.post(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
    chat_id: chatId,
    text: message
  });
};

app.post('/send-template-message', (req, res) => {
  const { phone, appointmentDate } = req.body;

  // Проверка, что все необходимые данные получены
  if (!phone || !appointmentDate) {
    return res.status(400).send({ success: false, error: 'Phone and message are required' });
  }

  const chatId = '1664044922';
  const message = `Номер телефона: ${phone}, сообщение: ${appointmentDate}`;

  sendTelegramMessage(chatId, message)
    .then(response => {
      res.status(200).send({ success: true, response: response.data });
    })
    .catch(error => {
      console.error('Error sending message:', error);
      res.status(500).send({ success: false, error: error.message });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
