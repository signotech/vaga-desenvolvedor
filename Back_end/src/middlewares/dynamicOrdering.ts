import { ZodTypeAny } from "zod";

const dynamicOrdering = (queryParams: any): any => {
   

   let params = [];

   const values = Object.values(queryParams);
   
   const checkAsc = values.find((value) => value == "ASC");
   const checkDesc = values.find((value) => value == "DESC");

   if (checkAsc) {
      const checkKeysAsc = Object.entries(queryParams).find(([key, value]) => value == 'ASC')
      params = [checkKeysAsc];
      return params
   }

   if (checkDesc) {
      const checkKeysDesc = Object.entries(queryParams).find(([key, value]) => value == 'DESC')
      console.log(checkKeysDesc )
      params = [checkKeysDesc];
      return [params];
   }

   params = ["id", "ASC"];

   return [params];
};

export default dynamicOrdering;
