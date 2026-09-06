import { prisma } from '@/lib/prisma'

export async function createAmenity(data){
    const name = data.name.trim().toLowerCase()

    if (!name){
        throw new Error('Amenity name is required')
    }

    const amenity = await prisma.amenity.create({
        data: {
            name,
        },
    });
    return amenity
}

export async function getAmenities() {
    return await prisma.amenity.findMany({
        orderBy: {
            name: 'asc',
        },
    });
    
}

export async function getAmenityById(id) {
    if( !id){
        throw new Error('Amenity Id is required')
    }
    const amenity = await prisma.amenity.findUnique({
        where: {
            id,
        }, 
    });
    if (!amenity){
        throw new Error('Amenity not found ')
    }

    return amenity;
}

export async function updateAmenity(id, data) {
    if(!id){
        throw new Error('Amenity Id is required')
    }
    if(!data?.name){
        throw new Error('Amenity name is required')
    }
    const name = data.name.trim().toLowerCase()
    const amenity = await prisma.amenity.update({
        where: {
            id,
        },
        data: {
            name,
        },
    })
    return amenity
}

export async function deleteAmenity(id){
    if( !id){
        throw new Error('Amenity Id is required')
    }
    const amenity = await prisma.amenity.delete({
      where:{
        id,
      },
    });
    return amenity;
}