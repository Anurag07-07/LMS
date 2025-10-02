import mongoose from 'mongoose';
const dbConnext = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`Database Connected`);
    }
    catch (error) {
        console.log(`Database Not Connected`);
        console.error(error);
        process.exit(1);
    }
};
export default dbConnext;
//# sourceMappingURL=dbConnect.js.map