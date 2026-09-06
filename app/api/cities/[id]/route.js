import { deleteCity, updateCity , getCityById } from "@/services/cityServices";
import { requireAdmin , UnauthorizedError} from "@/lib/auth";

export async function DELETE(request, {params}) {
    try{
        await requireAdmin()
    const { id } = await params;
    const city = await deleteCity(id);

    return Response.json(city, {
        status: 200
    })
} catch ( error){
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
    console.log('Delete /api/cities/[id] error: ',  error)
    return Response.json(
        {error: error.message || 'Failed to delete city'},
        {status: 400}
    );
}
}

export async function GET(requst, { params}){
    try{
    const { id } = await params;
    const city = await getCityById(id);
    return Response.json(
        city, {status: 200}
    )
    } catch ( error){
        console.log('GET api/cities/[id] error: ', error)
        return Response.json(
            {error: error.message|| 'Failed to get City by Id'},
            {status: 404}
        )
    }
}

export async function PATCH(request, {params}) {
    try{
                await requireAdmin()

        const {id } = await params;
        const body = await request.json();
        const city = await updateCity(id, body)

        return Response.json(
            city, {status: 200}
        )
    } catch( error){
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
        console.log('PATCH api/cities/[id] error: ', error)
         
        return Response.json(
            {error: error.message || 'Failed to update the city info'},
            {status: 400}
        )
    }
}