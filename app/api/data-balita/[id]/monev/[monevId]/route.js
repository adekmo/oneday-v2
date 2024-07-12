import { connectToDB } from "@/utils/database";
import Monev from "@/models/monev";

export const DELETE = async (req, { params }) => {
    const { id, monevId } = params;

    // console.log("params:", params); // Debug log
    // console.log("id:", id);
    // console.log("pengukuranId:", pengukuranId);

    try {
        await connectToDB();
        console.log("Database connected");

        const monev = await Monev.findOneAndDelete({ _id: monevId, creator: id });

        if (!monev) {
            return new Response("Monev not found", { status: 404 });
        }

        return new Response("Monev deleted successfully", { status: 200 });
    } catch (error) {
        console.error("Error deleting Monev:", error); // Log the error
        return new Response("Failed to delete Monev", { status: 500 });
    }
};
