import z from 'zod'
export const familySchema= z.object({
    firstName:z.string().trim().max(20).min(1),
    lastName:z.string().trim().max(20).min(1),
    email:z.string().email({message:"invalid email address"}),
    location:z.string(),
    phone:z.string().trim().min(9).max(13).refine((value)=>{
        const regex=/^(09\d{8}|07\d{8}|9\d{8}|7\d{8}|\+2517\d{8}|\+2519\d{8})$/;
        return regex.test(value);
    },{
        message:"invalid phone number format"
    }),
    password:z.string().refine((value) => {
        return (
          value.length >= 8 &&               
          /[A-Z]/.test(value) &&              
          /[a-z]/.test(value) &&              
          /\d/.test(value) &&                 
          /[!@#$%^&*(),.?":{}|<>]/.test(value)
        );
      }, {
        message: "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.",
      })
  
}).required();
export const familyTutorSchema= z.object({
  firstName:z.string().trim().max(20).min(1).optional(),
  lastName:z.string().trim().max(20).min(1).optional(),
  email:z.string().email({message:"invalid email address"}).optional(),
  location:z.string().optional(),
  phone:z.string().trim().min(9).max(13).refine((value)=>{
      const regex=/^(09\d{8}|07\d{8}|9\d{8}|7\d{8}|\+2517\d{8}|\+2519\d{8})$/;
      return regex.test(value);
  },{
      message:"invalid phone number format"
  }).optional(),
  password:z.string().refine((value) => {
      return (
        value.length >= 8 &&               
        /[A-Z]/.test(value) &&              
        /[a-z]/.test(value) &&              
        /\d/.test(value) &&                 
        /[!@#$%^&*(),.?":{}|<>]/.test(value)
      );
    }, {
      message: "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.",
    }).optional(),

}).nullable();