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
    return await prisma.city.findMany({
        orderBy: {
            name: 'asc',
        },
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