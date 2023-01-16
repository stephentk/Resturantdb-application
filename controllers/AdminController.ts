import { Request,Response,NextFunction } from "express";
import { CreateVendorInput } from "../dto";
import { vendor } from "../models";
import { GeneratePassword, GenerateSalt } from "../utility/PasswordUtility";
 
export const findVendor = async(id:string|undefined,email?: string) => {
    if(email) {
        return await vendor.findOne({email:email})
    } else{
        return await vendor.findById(id)
    }
}



export const CreateVendor = async (req:Request,res:Response,next:NextFunction) => {
     const {name,address,pincode,foodType,email,password,ownerName,phone} =< CreateVendorInput>req.body;

     const  existingVendor = await findVendor('',email)
     if(existingVendor !== null) {
        return res.json({"message":"a vendor exists with this email id"})
     }

     const salt = await GenerateSalt()
     const userPassword = await GeneratePassword(password,salt)
     const createdVendor = await vendor.create({
        name:name,
        address:address,
        pincode:pincode,
        foodType:foodType,
        email:email,
        password:userPassword,
        ownerName:ownerName,
        phone: phone,
        salt: salt,
        rating:0,
        serviceAvailable:false,
        coverImage:[]
     })


    return res.json(createdVendor)

}

export const GetVendors = async (req:Request,res:Response,next:NextFunction) => {
    const  vendors = await vendor.find()
    if(vendors != null) {
        return res.json(vendors)
    }
    return res.json({"message":"vendors data not available"})
    
}

export const GetVendorById = async (req:Request,res:Response,next:NextFunction) => {
    const vendorId = req.params.id;
    const Vendor = await findVendor(vendorId)

    if(Vendor != null) {
        return res.json(Vendor)
    }
   return res.json({"message":"vendor not on database"})
    
}