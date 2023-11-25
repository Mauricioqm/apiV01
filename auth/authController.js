const User = require('./authModel')

exports.createUser = (req, res, next) => {
  const newUser = {
    username: req.body.username,
    name: req.body.email,
    password: req.body.password,
    role: req.body.role,
    reservword: req.body.password,
  }
  // console.log(newUser);

  User.create(newUser)
  .then(respuesta => {
    // console.log(respuesta);
    
    res.send({
      username: req.body.username,
      role: req.body.role,
    });
  })
  .catch(err => {
    console.log(err);
    if (err && err.code === 11000) return res.status(409).send('El username ya esta en uso'); //Controla el uso de username
    if (err) return res.status(500).send('Server error');
  });
}

exports.loginUser = (req, res, next) => {
  const userData = {
    username: req.body.username,
    password: req.body.password
  }

  User.findOne({ username: userData.username })
  .then(resp => {
      if (!resp) {
        // documento no existe
        res.status(409).send({ message: 'Algo esta mal, por favor verifica tus datos' });
      }  else {
        if(userData.password === resp.password) {
          console.log(' => ', resp);
            console.log('Las contraseñas coinciden. Inicio de sesión exitoso.');
            res.send({
              username: resp.username,
              role: req.body.role,
              id: resp.id,
            });
        } else {
          console.log('Las contraseñas no coinciden. Inicio de sesión fallido.');
          res.send('Algo no ha salido mal, valide sus datos');
        }     
      }
    })
}

exports.getUsers = async (req, res) => {
  User.find({}, (err, emp) => {
    res.send({ emp })
  })
}

exports.getUSerById = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({ msg: 'No existe' })
    }

    res.json(user);

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error....');
  }
}

exports.updateUser = async (req, res) => {
  try {
    const { username, email, img, password } = req.body;
    let user = await User.findById(req.params.id);

    if (!user) {
      res.status(404).json({ msg: 'No existe el usuario' })
    }

    user.username = username;
    user.email = email;
    user.password = password;

    user = await User.findOneAndUpdate({ _id: req.params.id }, user, { new: true })
    res.json(user);

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error??');
  }
}

exports.logout = async (req, res) => {
  console.log('!!!');
  try {
    const { _id, newMessages } = req.body;
    const user = await User.findById(_id);
    await user.save();
    res.status(200).send();
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
}
