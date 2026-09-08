import { prisma } from '@/lib/prisma'

export async function createCity(data){
  const name  = data.name.trim().toLowerCase();

  if ( !name ) {
    throw new Error('city name is required')
  }

  const city = await prisma.city.create({
    data:{
        name,
    },
  });

  return city;

}


export async function getCities() {
    const cities = await prisma.city.findMany({
        include: {
            properties: {
                select: {
                    id: true,
                    status: true,
                    images: {
                        take: 1,
                        select: { url: true },
                    },
                },
            },
        },
        orderBy: {
            name: 'asc',
        },
    });

    return cities.map((city) => {
        const properties = city.properties || [];
        const totalCount = properties.length;
        const availableCount = properties.filter((p) => p.status === 'AVAILABLE').length;
        const coverImage = properties.find((p) => p.images && p.images.length > 0)?.images[0]?.url || null;

        return {
            id: city.id,
            name: city.name,
            propertiesCount: totalCount,
            availableCount: availableCount,
            totalListings: totalCount,
            coverImage: coverImage,
        };
    });
}


export async function getCityById(id) {
    if( !id){
        throw new Error('City Id is required')
    }
    const city = await prisma.city.findUnique({
        where: {
            id,
        },
    });
    
    if (!city){
        throw new Error('city not found')
    }

    return city;
}

export async function updateCity(id, data) {
    if(!id){
        throw new Error('City Id is required')
    }

    const name = data.name.trim().toLowerCase();
    if ( name == undefined ){
        throw new Error('City name is Required')
    }

    const city = await prisma.city.update({
        where:{
            id,
        },
        data: {
            name,
        },
    });
    return city
}

export async function deleteCity(id) {
    if(!id){
        throw new Error('city id is required')
    }

    const city = await prisma.city.delete({
        where: {
            id,
        },
    });

    return city;
}