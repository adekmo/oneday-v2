import { connectToDB } from "@/utils/database";
import Pengukuran from "@/models/pengukuran";


export const GET = async (req, { params }) => {
    const { id, pengukuranId } = params;

    try {
        await connectToDB();

        const pengukuran = await Pengukuran.findOne({ _id: pengukuranId, creator: id });

        if (!pengukuran) {
            return new Response("Pengukuran not found", { status: 404 });
        }

        return new Response(JSON.stringify(pengukuran), { status: 200 });
    } catch (error) {
        console.error("Error fetching pengukuran:", error);
        return new Response("Failed to fetch Pengukuran", { status: 500 });
    }
};

export const PATCH = async (req, { params }) => {
    const { id, pengukuranId } = params;
    const { tanggal_pengukuran, tinggi_panjang_badan, berat_badan, lla } = await req.json();

    try {
        await connectToDB();

        const pengukuran = await Pengukuran.findOneAndUpdate(
            { _id: pengukuranId, creator: id },
            {
                tanggal_pengukuran,
                tinggi_panjang_badan,
                berat_badan,
                lla
            },
            { new: true }
        );

        if (!pengukuran) {
            return new Response("Pengukuran not found", { status: 404 });
        }

        return new Response(JSON.stringify(pengukuran), { status: 200 });
    } catch (error) {
        console.error("Error updating pengukuran:", error);
        return new Response("Failed to update Pengukuran", { status: 500 });
    }
};

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
