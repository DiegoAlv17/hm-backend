import mongoose from "mongoose";

export const connectBD = async () => {
    try{
        await mongoose.connect('mongodb+srv://diegonapa17:QLOl4Wo5DFkltNHs@cluster0.qkqfl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
        console.log('>>> DB is connected'); 
    } catch(error){
        console.log('Something went wrong', error);
    }
}