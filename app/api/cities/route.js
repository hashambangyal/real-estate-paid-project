import { getCities,  createCity } from "@/services/cityServices"; 
import { requireAdmin,UnauthorizedError } from "@/lib/auth";

export async function GET() {
    try{
       const cities = await getCities()

       return Response.json(cities, {
        status: 200
       });

    } catch (error){
       console.log('Get /api/cities error: ', error)

       return Response.json(
        {error: 'Failed to fetch cities'},
        {status: 500}
       );
    }
}

export async function POST(request) {
    try{
        await requireAdmin()
        const body = await request.json()
        const cities = await createCity(body)

        return Response.json(cities, {
            status: 200,
        });
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
        console.log('POST api/cities error', error)

        return Response.json(
            {
                error: error.message || 'failed to created City'
            },
            { status: 400 }
        )
    }
}