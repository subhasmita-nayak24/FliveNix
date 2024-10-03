import mongoose from 'mongoose'

const dbConfig = async()=>{
    try {
        await mongoose.connect(`${process.env.MONGO_URL}/FliveNix` )
        console.log('database connected');
        
    }catch(err){
console.error('error in connect to db:',err);

    }

}

export default dbConfig