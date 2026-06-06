const jwt = require('jsonwebtoken');
const prisma=require('../prismaClient')
const bcrypt = require('bcrypt');

require("dotenv").config();
// crud


// const createuser = async (req, res) => {
//     try {

//         const { name, email, password, role } = req.body;
//         const user = await prisma.user.create({
//             data: { name,email,role, password}
//         });
//         res.json(user);
//     } catch (error) {
//         res.json({
//             error: error.message
//         });
//     }
// };

const getusers = async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);

    } catch (error) {
        res.json({
            error: error.message
        });
    }
};

// const getuserById = async (req, res) => {
//     try {

//         const user = await prisma.user.findUnique({
//             where: {
//                 id: Number(req.params.id)
//             }
//         });

//         res.json(user);

//     } catch (error) {
//         res.json({
//             error: error.message
//         });
//     }
// };



// const updateuser = async (req, res) => {
//     try {

//         const user = await prisma.user.update({
//             where: {
//                 id: Number(req.params.id)
//             },
//             data: req.body
//         });

//         res.json(user);

//     } catch (error) {
//         res.json({
//             error: error.message
//         });
//     }
// };

// const pagination= async(req,res)=>{
//     try {
//         // const {skip,take}=req.params;
//        const data= await prisma.user.findMany({
//             skip:Number(req.params.skip),
//             take:Number(req.params.take)
//         })
//         res.json(data);
//     } catch (error) {
//         res.json({
//             error:error.message
//         })
//     }
// }


// const pagby_page=async(req,res)=>{
  
//   try {
//    const limit=5;
//     const page=parseInt(req.query.page)||1;
//     const skipofno=(page-1)*limit;
//     const user= await prisma.user.findMany({
//       take:limit,
//       skip:skipofno,
//       where:{
//         id:parseInt(req.params.id )
//       },

//     })
//     res.json(user);
    
//     } catch (error) {
//         res.json({
//           error:error.message
          
//         })
//     }
// }



const pagby_page = async (req, res) => {

    try {

        const limit = 5;
        const page = parseInt(req.params.page) || 1;
        const skipofno = (page - 1) * limit;
        const user = await prisma.user.findMany({
            take: limit,
            skip: skipofno
        });

        res.json({
            currentpage: page,
            data: user
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });
    }
};

// regiter-login-logout
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check existing user
    const existing = await prisma.user.findUnique({
      where: { email }
    });

    if (existing) {
      return res.json({
        message: "User already exists"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        role: role || "student",
        password: hashedPassword
      }
    });

    res.json({
      message: "User Registered Successfully",
      user
    });

  } catch (error) {
    res.json({
      error: error.message
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: { email }
    });

   if (!user) {
  return res.status(404).json({
    message: "Oops! User not registered."
  });
}

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {
  return res.status(401).json({
    message: "Oops! Invalid password."
  });
}

    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        isLoggedin: true
      }
    });
console.log("JWT_SECRET =", process.env.JWT_SECRET);
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: user.role
      },
    process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login Successful",
      token,
      user
    });

  } catch (error) {
    res.json({
      error: error.message
    });
  }
};

const logout = async (req, res) => {
  try {

    await prisma.user.update({
      where: {
        id: req.user.id
      },
      data: {
        isLoggedin: false
      }
    });

    res.json({
      message: "Logout Successful"
    });

  } catch (error) {
    res.json({
      error: error.message
    });
  }
};

// module.exports = { getusers,getuserById,createuser,updateuser};
module.exports = {getusers, register,login,logout,pagby_page};