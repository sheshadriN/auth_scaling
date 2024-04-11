import jwt from 'jsonwebtoken';


const createToken = (payload)=>{
    
    const token = jwt.sign(payload,process.env.SECRET,{expiresIn:'1d'});
    if(!token)
    {
        res.statsus(400).send({message:"failed",error:"error while creating the token"})
    }
    return token;
    
}
export default {createToken};