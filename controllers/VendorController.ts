import   {Request,Response,NextFunction} from 'express'
import { VendorLoginInputs } from '../dto'
import { findVendor } from './AdminController'
import { ValidatePassword } from '../utility/PasswordUtility';

export const vendorLogin = async(req:Request,res:Response,next:NextFunction) => {
       const {email,password} = <VendorLoginInputs>req.body;

       const existingVendor = await findVendor('',email);

       if(existingVendor != null){
        const validation = await ValidatePassword(password,existingVendor.password,existingVendor.salt);
        if(validation) {
            return res.json(existingVendor)
        } else {
            return res.json({"message":"password is not valid"})
        }
       }
       return res.json({"message":"password is not valid"})
}


export const  GetVendorProfile = async(req:Request,res:Response,next:NextFunction) => {

}


export const  UpdateVendorProfile = async(req:Request,res:Response,next:NextFunction) => {
    
}


export const  GetVendorService  = async(req:Request,res:Response,next:NextFunction) => {
    
}