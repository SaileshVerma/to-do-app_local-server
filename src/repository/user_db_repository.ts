import { AppDataSource } from "../data-source"
import { User } from "../entity/User"

const userRepo = AppDataSource.getRepository(User);


export const createUser = async (name: string, email: string, password: string) => {
    const newUser = new User();
    newUser.email = email;
    newUser.password = password;
    newUser.name = name;
    await userRepo.save(newUser);

    return newUser;
}


export const getUserById = async (uid: string) => {

    const user = await userRepo.findOneBy({ id: parseInt(uid) });

    return user;
}

export const getUserByEmail = async (email: string) => {

    const user = await userRepo.findOneBy({ email:email });

    return user;
}
 
export const checkUserExist=async (email: string) => {

    const user = await userRepo.findOneBy({ email:email });
    if(user){
        return true
    }
    return false;
}

export const verifyUserPassword = async (email: string, password: string)=>{

    const user = await userRepo.findOneBy({ email: email });


    return user.password === password;
}

// export const isUserExistByEmail = async (email: string)=>{
//     const user = await userRepo.findOneBy({ email: email });

//     return user.email === email;
// }



