import express ,{Request,Response,NextFunction} from 'express'
import { vendorLogin } from '../controllers'
const router = express.Router()


router.get('/',(req:Request,res:Response,next:NextFunction) => {
    res.json({message:"hello from vendor"})
})

router.post('/login',vendorLogin)
router.get('/profile')
router.patch('/profile')
router.patch('/service')

export{router as VendorRoutes}