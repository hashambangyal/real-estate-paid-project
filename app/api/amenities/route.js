import { getAmenities, createAmenity } from "@/services/amenityServices";
import { requireAdmin, UnauthorizedError } from "@/lib/auth";

export async function GET() {
    try{
    const amenity = await getAmenities()
    return Response.json(amenity, 
        {status: 200}
    )
    } catch(error){
        console.log('GET /api/amenities error: ', error)
        return Response.json({
            error: error.message || 'Failed to get amenites'
        },{ status: 500})
    }
}

export async function POST(request) {
    try{
        await requireAdmin()
    const body = await request.json()
    const amenites = await createAmenity(body)

    return Response.json(
        amenites, {status: 201}
    )
    }catch( error){
        if (error instanceof UnauthorizedError) {
      return Response.json(
        {
          error: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }
      console.log('POST api/amenites error: ', error);
      return Response.json(
        {error: error.message || 'Failed to create amenity'},
        {status: 400}
      )
    }
}