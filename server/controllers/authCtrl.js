const bcrypt = require('bcrypt');

module.exports = {
  register: async (req, res) => {
    const db = req.app.get('db');
    const { email, password } = req.body;

    const [ existingUser ] = await db.get_user_by_email(email);

    if(existingUser) return res.status(409).send({ message: 'Email is already in use.' })

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    let [ newUser ] = await db.register([ email, hash ]);

    delete newUser.password;
    req.session.user = { ...newUser };
    res.status(201).send(req.session.user);
  },
  login: async (req, res) => {
    const db = req.app.get('db');
    const { email, password } = req.body;

    const [ existingUser ] = await db.get_user_by_email(email);

    if(!existingUser) return res.status(404).send({ message: 'Email does not have an account associated with it.' });

    const authenticated = bcrypt.compareSync(password, existingUser.password);

    if(!authenticated) return res.status(409).send({ message: 'Incorrect password, please try again.'});

    delete existingUser.password;
    req.session.user = { ...existingUser };
    res.status(200).send(req.session.user);
  },
  getUser: (req, res) => {
    if(req.session.user) return res.status(200).send(req.session.user);
  },
  logout: (req, res) => {
    if(req.session.user) {
      delete req.session.user

      return res.sendStatus(200);
    }

    res.status(400).send({ message: 'Cannot logout because no user is currently logged in.' });
  },
}