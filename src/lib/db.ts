import mongosse from "mongoose";

const ConnectedDB = async() => {
    try {
        if(mongosse.connection.readyState === 1) return;
        mongosse.connect(process.env.MONGODB_URL)
    } catch (err: unknown) {
        throw err
    }
};

export default ConnectedDB