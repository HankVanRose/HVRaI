const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');
const { verifyAccessToken } = require('../../middlewares/verifyToken');
const generateToken = require('../utils/generateToken');
const cookieConfig = require('../../configs/cookieConfig');
const fs = require('fs').promises;
const path = require('path');
const upload = require('../../middlewares/multer');

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(400).json({ message: 'User is not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).send('Server error');
  }
});

router.post(
  '/upload-avatar',
  verifyAccessToken,
  upload.single('avatar'),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'Файл не загружен' });
      }
      const userId = res.locals.user.id;
      console.log(userId);
      const user = await User.findByPk(userId);
      if (!user) {
        await fs.unlink(req.file.path);
        return res.status(404).jsom({ message: 'Пользователь не найден' });
      }

      if (user.avatar) {
        //удаляем предыдущий файл
        const oldAvatarPath = path.join(__dirname, '..', user.avatar);
        try {
          await fs.unlink(oldAvatarPath);
        } catch (error) {
          console.error('Ошибка при удалении старого аватара:', error);
        }
      }

      const avatarUrl = `/uploads/avatars/${req.file.filename}`;
      await user.update({ avatar: avatarUrl });
      console.log('Обновлённый пользователь:', await User.findByPk(userId));
      const { accessToken, refreshToken } = generateToken({ user });
      const fullAvatarUrl = `${req.protocol}://${req.get('host')}${avatarUrl}`;
      return res
        .status(200)
        .cookie('refreshToken', refreshToken, cookieConfig.refresh)
        .json({
          success: true,
          user: {
            ...user.get({ plain: true }),
            avatar: fullAvatarUrl, // Возвращаем полный URL
          },
          accessToken,
        });
    } catch (error) {
      console.error('Upload avatar error:', error);
      if (req.file) {
        try {
          await fs.unlink(req.file.path);
        } catch (unlinkError) {
          console.error('Error deleting file:', unlinkError);
        }
      }
      res.status(500).json({ message: 'Ошибка при загрузке автара' });
    }
  }
);

router.put('/profile', verifyAccessToken, async (req, res) => {
  try {
    const { userName, email, password, newPassword } = req.body;

    const userId = req.params.id; // Получаем из верифицированного токена

    // 1. Находим пользователя
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    // 2. Подготавливаем обновления
    const updates = {};

    // Обновление имени
    if (userName && userName !== user.userName) {
      updates.userName = userName;
    }

    // Обновление email
    if (email && email !== user.email) {
      // Проверяем, не занят ли email другим пользователем
      const emailExists = await User.findOne({ where: { email } });
      if (emailExists && emailExists.id !== userId) {
        return res.status(400).json({ message: 'Email уже используется' });
      }
      updates.email = email;
    }

    // 3. Обработка смены пароля
    if (newPassword) {
      if (!password) {
        return res
          .status(400)
          .json({ message: 'Текущий пароль обязателен для смены пароля' });
      }

      // Проверяем текущий пароль
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Неверный текущий пароль' });
      }

      // Хешируем новый пароль
      updates.password = await bcrypt.hash(newPassword, 10);
    }

    // 4. Применяем обновления, если они есть
    if (Object.keys(updates).length > 0) {
      await user.update(updates);
    }

    // 5. Генерируем новые токены (если изменились важные данные)
    const plainUser = user.get({ plain: true });
    delete plainUser.password;

    const { accessToken, refreshToken } = generateToken({ user: plainUser });

    // 6. Отправляем ответ
    return res
      .status(200)
      .cookie('refreshToken', refreshToken, cookieConfig.refresh)
      .json({
        success: true,
        user: plainUser,
        accessToken,
        message: 'Профиль успешно обновлен',
      });
  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({
      success: false,
      message: 'Ошибка при обновлении профиля',
    });
  }
});

module.exports = router;
