import { prisma } from "../../lib/prisma";

const filter_query = (datos: any, location: string, orchestra_TypeId: string): object[] => {
  let newdatos = datos
  const filterParams: any = { location: location, orchestra_TypeId: orchestra_TypeId }
  for (const property in filterParams) {
    filterParams[property] ? newdatos = newdatos.filter(
      (orchestradata: any) => orchestradata[property].toLowerCase().trim() === filterParams[property].toLowerCase().trim()
    ) : null
  }
  return newdatos
}

//GET ORCHESTRAS
export const getOrchestras = async (query: any) => {

const { name, creation_date, location, orchestra_TypeId,page,resources,order } = query

  const fulldataorder =async(orderprop:any, order:any,prop1:any,prop2:any,date1:any,date2:any)=>{
    const datos= await prisma.orchestra.findMany( 
      { orderBy: { [orderprop]: order },
      take: resources*1 ||4,
      skip: page*resources||page*4||0,
        where:{   
          [prop1]:{ contains: date1, mode:'insensitive' },
          [prop2]:date2 
        }
      })   
      return datos
  }
  
  const dataandorder =async(orderprop:any,order:any,prop1:any,date1:any)=>{
    let trimedName = date1.toLowerCase().trim();
    let aux=date1;
    if(prop1!="orchestra_TypeId"){
       aux = { contains: trimedName, mode:'insensitive' }
    }
    const datos= await prisma.orchestra.findMany( 
      { orderBy: { [orderprop]: order },
      take: resources*1 ||4,
      skip: page*resources||page*4||0,
        where:{      
          [prop1]:aux 
        }
      })
      return datos
  }

  const fulldata =async(prop1:any,prop2:any,date1:any,date2:any)=>{
    const datos= await prisma.orchestra.findMany( 
      { 
      take: resources*1 ||4,
      skip: page*resources||page*4||0,
        where:{   
          [prop1]:{ contains: date1, mode:'insensitive' },
          [prop2]:date2 
        }
      })   
      return datos
  }
  
  const dataonly =async(prop1:any,date1:any)=>{
    let trimedName = date1.toLowerCase().trim();
    let aux=date1;
    if(prop1!="orchestra_TypeId"){
       aux = { contains: trimedName, mode:'insensitive' }
    }
    const datos= await prisma.orchestra.findMany( 
      {
      take: resources*1 ||4,
      skip: page*resources||page*4||0,
        where:{      
          [prop1]:aux 
        }
      })
      return datos
  }

  const onlyorder =async(orderprop:any,order:any)=>{
  
    const datos= await prisma.orchestra.findMany( 
      { orderBy: { [orderprop]: order },
      take: resources*1 ||4,
      skip: page*resources||page*4||0,
      })
      return datos
  }

  if(order&&location&&orchestra_TypeId)return fulldataorder( "name",order,"location","orchestra_TypeId",location,orchestra_TypeId)
  if(order&&location)return dataandorder("name",order,"location",location)
  if(order&&orchestra_TypeId)return dataandorder("name",order,"orchestra_TypeId",orchestra_TypeId)

  if(creation_date&&location&&orchestra_TypeId)return fulldataorder( "name",creation_date,"location","orchestra_TypeId",location,orchestra_TypeId)
  if(creation_date&&location)return dataandorder("creation_date",creation_date,"location",location)
  if(creation_date&&orchestra_TypeId)return dataandorder("creation_date",creation_date,"orchestra_TypeId",orchestra_TypeId)

  if(location&&orchestra_TypeId)return fulldata("location","orchestra_TypeId",location,orchestra_TypeId)
  if(location)return dataonly("location",location)
  if(orchestra_TypeId)return dataonly("orchestra_TypeId",orchestra_TypeId)

  if(order)return onlyorder("name",order)
  if(creation_date)return onlyorder("creation_date",creation_date)

  if(name)return dataandorder("name",order,"name",name)

  return await prisma.orchestra.findMany()


    
 






  // if (name) {
  //   const az = await prisma.orchestra.findMany({ orderBy: { name: 'asc' } })
  //   const za = await prisma.orchestra.findMany({ orderBy: { name: 'desc' } })
  //   if (name === 'asc' && !location) return az
  //   if (name === 'desc' && !location) return za
  //   if (name === 'desc' && (location || orchestra_TypeId)) return filter_query(za, location, orchestra_TypeId)
  //   if (name === 'asc' && (location || orchestra_TypeId)) return filter_query(az, location, orchestra_TypeId)
  //   const trimedName = name.toLowerCase().trim()
  //   const foundName = await prisma.orchestra.findMany({
  //     where: { name: { contains: trimedName, mode:'insensitive' } }
  //   })
  //   if (foundName.length) return foundName
  //   else return 'not found'
  // }

  // if (creation_date) {
  //   let lastDates = creation_date === 'asc' ? await prisma.$queryRaw`SELECT "id", "name", "creation_date", "location" FROM "Orchestra" ORDER BY creation_date ASC`
  //     : await prisma.$queryRaw`SELECT "id", "name", "creation_date", "location" FROM "Orchestra" ORDER BY creation_date DESC`
  //   if (!location) return lastDates
  //   if (location || orchestra_TypeId) return filter_query(lastDates, location, orchestra_TypeId)
  // }
  
};

//GET ORCHESTRAS BY ID
export const getOrchestrasById = async (id: any) => {
  const orchestra = await prisma.orchestra.findUnique({
    where: { id: id },
  });
  return orchestra ? orchestra : undefined;
};

//POST ORCHESTRAS
export const postOrchestras = async (body: any) => {
  try {
    if(!body) return undefined
    const { name, phone, donation_account } = body;
    if (!name || !donation_account || !phone) return undefined
    const orchestras = await prisma.orchestra.create({
      data: body
    });
    return orchestras ? orchestras : undefined;
  } catch (error) {
    return error
  }

};
//BORRADO LOGICO
export const logicDeleteOrchestra = async (id: any) => {
  try {
    const deactivate = await prisma.orchestra.update({
      where: {
        id: id
      },
      data: {
        is_active: false
      }
    })
    return deactivate ? deactivate : null
  } catch (error) {
    return error
  }
  
}
//DELETE ORCHESTRAS
export const deleteOrchestra = async (id: any) => {
  try {
    if(!id) return undefined
    const orchestraDelete = await prisma.orchestra.delete({
      where: { id: id },
    });
    return orchestraDelete ? orchestraDelete : null;
  } catch (error) {
    return error
  }
  
};

//UPDATE ORCHESTRAS
export const updateOrchestra = async (id: any, body: any) => {
  try {
    const updateOrchestra = await prisma.orchestra.update({
      where: {
        id,
      },
      data: body,

    });
    return updateOrchestra ? updateOrchestra : undefined;
  } catch (error) {
    return error
  }
};

