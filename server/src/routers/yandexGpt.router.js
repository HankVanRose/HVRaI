const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/api/yandex-gpt', async (req, res) => {
  try {
    const response = await axios.post(
      'https://llm.api.cloud.yandex.net/foundationModels/v1/completion',
      req.body,
      {
        headers: {
          Authorization: `Api-Key ${process.env.YANDEX_API_KEY}`,
          'x-folder-id': process.env.YANDEX_FOLDER_ID,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
