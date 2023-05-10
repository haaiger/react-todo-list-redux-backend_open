const router = require('express').Router();
const bcrypt = require('bcrypt');

const { User } = require('../../db/models');

router.get('/', async (req, res) => {
  res.json(req.session.user || null);
});

router.post('/signup', async (req, res) => {
  try {
    const { password, email, username } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = (
      await User.create({
        username,
        email,
        password: hashedPassword,
      })
    ).get();
    delete user.password;
    delete user.createdAt;
    delete user.updatedAt;
    req.session.user = user;
    return res.json(user);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

router.post('/signin', async (req, res) => {
  try {
    const { password, email } = req.body;

    const finder = {};
    if (email) {
      finder.email = email;
    }

    const user = await User.findOne({
      where: finder,
      attributes: ['id', 'username', 'email', 'password'],
      raw: true,
    });
    if (!user) {
      return res.status(401).json({ msg: 'Try again' });
    }
    const isUser = await bcrypt.compare(password, user.password);
    if (isUser) {
      delete user.password;
      req.session.user = user;
      return res.json(user);
    }

    return res.json(null);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

router.get('/signout', (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie('phaseThree');
    res.sendStatus(200);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = router;
