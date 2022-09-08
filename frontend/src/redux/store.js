import {configureStore} from '@reduxjs/toolkit'
import userslice from './slices/userslice'
export default configureStore({
    reducer:{
        user:userslice
    }
})