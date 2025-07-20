const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const YANDEX_API_KEY = process.env.YANDEX_API_KEY;

app.post('/api/yandex-gpt', async (req, res) => {
  if (!YANDEX_API_KEY) {
    return res.status(500).json({ error: "Yandex API key not configured" });
  }

  try {
    console.log("Forwarding request to YandexGPT:", {
      model: req.body.model,
      messages: req.body.messages.map(m => ({ role: m.role, text: m.text.slice(0, 50) + "..." }))
    });

    const response = await axios.post(
      'https://llm.api.cloud.yandex.net/foundationModels/v1/completion',
      {
        model: req.body.model || 'general',
        messages: req.body.messages,
        generationOptions: {
          temperature: 0.7,
          maxTokens: 1000
        }
      },
      {
        headers: {
          'Authorization': `Api-Key ${YANDEX_API_KEY}`,
          'Content-Type': 'application/json',
          
        },
        timeout: 30000
      }
    );

    console.log("YandexGPT response:", response.data);
    res.json(response.data);
  } catch (error) {
    console.error("Full YandexGPT error:", {
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.error?.message || error.message
    });
  }
});

const PORT = 3001;
app.listen(PORT, () => console.log(`YandexGPT Proxy running on port ${PORT}`));