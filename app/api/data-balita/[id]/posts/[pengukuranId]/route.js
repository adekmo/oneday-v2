import { connectToDB } from "@/utils/database";
import Pengukuran from "@/models/pengukuran";

export const DELETE = async (req, { params }) => {
    const { id, pengukuranId } = params;

    // console.log("params:", params); // Debug log
    // console.log("id:", id);
    // console.log("pengukuranId:", pengukuranId);

    try {
        await connectToDB();
        console.log("Database connected");

        const pengukuran = await Pengukuran.findOneAndDelete({ _id: pengukuranId, creator: id });

        if (!pengukuran) {
            return new Response("Pengukuran not found", { status: 404 });
        }

        return new Response("Pengukuran deleted successfully", { status: 200 });
    } catch (error) {
        console.error("Error deleting pengukuran:", error); // Log the error
        return new Response("Failed to delete Pengukuran", { status: 500 });
    }
};
