import { getAmenityById, updateAmenity, deleteAmenity } from "@/services/amenityServices";
import { requireAdmin, UnauthorizedError } from "@/lib/auth";

export async function GET(request, {params}) {
    try{
    const { id } = await params
    const amenity = await getAmenityById(id);

    return Response.json(amenity, 
        {status: 200}
    )}catch (error){
      console.log('GET api/amenities/[id] error: ', error)
      return Response.json({
        error: error.message || 'Failed to get the Amenity'
      }, {status: 404 })
    }
}

export async function PATCH(request, {params}) {
    try{
        await requireAdmin()
    const {id}= await params;
    const body = await request.json()

    const amenity = await updateAmenity(id, body)
     return Response.json(amenity, 
        {status: 200}
     )
    } catch( error ){
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
        console.log('PATCH api/amenities/[id] error: ', error)

        return Response.json(
            {error: error.message|| 'Failed to update the amenity'},
            {status: 400}
        )
    }

}

export async function DELETE(request, {params}) {
    try{
    await requireAdmin()
    const {id}= await params;
    const amenity = await deleteAmenity(id)
    return  Response.json(
        amenity, {status: 200}
    )
} catch( error ){
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
    console.log('DELETE api/amenities/[id] error: ', error)

    return Response.json(
        {error: error.message || 'Failed to delete amenity'},
        {status: 400}
    )
}
}