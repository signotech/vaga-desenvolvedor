
const dynamicFilter = (queryParams:any):any =>{
   

   let page: number = parseInt(queryParams.page);
   let perPage: number = parseInt(queryParams.perPage);
   
   if (!Number.isNaN(page)) {
      delete queryParams.page
   }
   if (!Number.isNaN(perPage)) {
      delete queryParams.perPage
   }

   let params = {}
   
   const keys = Object.keys(queryParams)
   const values = Object.values(queryParams)
   
   const checkAsc = values.find((value) => value == "ASC");
   const checkDesc = values.find((value) => value == "DESC");

   if(values[0] == checkAsc || values[0] == checkDesc){
      return
   }

   const convertKeys = keys[0]
   const convertValues = values[0]

   if(keys.length == 0 || values.length == 0 ){
      return params 
   }

   params = {
      [convertKeys]:convertValues
   }

   return params
}

export default dynamicFilter