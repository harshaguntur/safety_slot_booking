
import { defineField, defineType, } from "sanity";

export const user = defineType({
    name : "user",
    title: "User",
    type : 'document',
    fields : [
        defineField ({
            name : "emp_no",
            type : "number",
        }),
        defineField ({
            name : "name",
            type : "string",
        }),
        defineField ({
            name : "designation",
            type : "string",
        }),
        defineField ({
            name : "department",
            type : "string",
        }),
        defineField ({
            name : "password",
            type : "string",
        }),
        defineField ({
            name : "role",
            type : "string",
        }),
    ], 

    preview : {
        select : {
            title : 'name' , 
        }
    }

})