const userControllers = require("./users.controllers");

const getAll = (req, res) => {
  userControllers
    .getAllUsers()
    .then((response) => {
      res.status(200).json({ items: response.length, users: response });
    })
    .catch((err) => {
      res.status(400).json(err);
    });
};

const getById = (req, res) => {
  const id = req.params.id;
  userControllers
    .getUserById(id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(404).json({ message: `El usuario con el id ${id} no existe` });
    });
};

const register = (req, res) => {
  const data = req.body;
  if (!data) {
    return res.status(400).json({ message: "Missing Data" });
  } else if (
    !data.first_name ||
    !data.last_name ||
    !data.email ||
    !data.password ||
    !data.birthday_date
  ) {
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        first_name: "string",
        last_name: "string",
        email: "examle@examle.com",
        password: "string",
        birthday_date: "YYYY/DD/MM",
      },
    });
  } else {
    userControllers.createUser(data)
      .then((response) => {
        res.status(201).json({
          message: `User created succesfully with id: ${response.id}`,
          user: response,
        });
      })
      .catch(err => {
        res.status(400).json({message: err.errors.message})
      }) 
  }
};

const remove = (req, res) => {
  const id = req.params.id;
  userControllers.deleteUser(id)
    .then((response) => {
      if(response){
        res.status(204).json()
      }else{
        res.status(400).json({
          message: 'Invalid ID'
        })
      }
    })
};

const edit = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  if (!Object.keys(data).length) {
    return res.status(400).json({ message: "Missing Data" });
  } else {
    userControllers.editUser(id, data, req.user.rol)
      .then((response) => {
        res.status(200).json({
          message: 'User edited succesfully',
          user: response
        })
      })
      .catch((err) => {
        res.status(400).json({message: err.errors[0].message})
      })
  }
};

const editMyUser = (req, res) => {
  const id = req.user.id;
  const data = req.body;
  if (!Object.keys(data).length) {
    return res.status(400).json({ message: "Missing Data" });
  } else {
    userControllers.editUser(id, data, req.user.rol)
      .then((response) => {
        res.status(200).json({
          message: 'User edited succesfully',
          user: response
        })
      })
      .catch((err) => {
        res.status(400).json({message: err.errors[0].message})
      })
  }
}

const getMyUser = (req, res) => {
  const id = req.user.id;
  userControllers.getUserById(id)
    .then((response) => {
      res.status(200).json(response)
    })
    .catch((err) => {
      res.status(400).json({message: err.errors[0].message})
    })
}

const removeMyUser = (req, res) => {
  const id = req.user.id;
  userControllers.deleteUser(id)
    .then(response => {
      res.status(204).json();
    })
    .catch(err => {
      res.status(400).json({message: err.errors[0].message});
    })
};

const postProfileImg = (req, res) => {
  const userId = req.user.id;
  //mi-sitio.com/api/v1/users/me/profile-img
  //localhost:8000/api/v1/users/me/profile-img

  const imgPath = req.hostname + ':8000' + '/api/v1/uploads/' + req.file.filename 

  userControllers.editProfileImg(userId, imgPath)
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => {
      res.status(400).json({message: err.errors[0].message})
    })
}

const getUserRole = (req, res) => {
  const id = req.params.id
  console.log(id)
  userControllers.getUserWithRole(id)
    .then((response) => {
      res.status(200).json(response)
    })
    .catch(err =>  {
      res.status(400).json({message: err})
    })
}

module.exports = {
  getAll,
  getById,
  register,
  remove,
  edit,
  editMyUser,
  getMyUser,
  removeMyUser,
  postProfileImg,
  getUserRole
};
