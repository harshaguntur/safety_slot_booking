
import { defineField, defineType, } from "sanity";

export const contract_worker = defineType({
    name : "contract_worker",
    title: "Contract_worker",
    type : 'document',
    fields : [

         defineField ({
            name : "name",
            type : "string",
        }),

        defineField ({
            name : "emp_no",
            type : "slug",
            options : {
                source : 'name'
            }
        }),
        defineField ({
            name : "contractor_name",
            type : "string",
        }),
        defineField ({
            name : "agency",
            type : "string",
        }),
        defineField ({
            name : "pass_valid_upto",
            type : "date",
        }),
         defineField ({
            name : "department",
            type : "string",
        }),

        defineField ({
            name : "employee_photo",
            type : "image",
        }),
    ], 

    

})