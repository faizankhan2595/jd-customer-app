export const role = (val)=>{
    if(val===1){
        return "Admin"
    }
    else if(val==2){
        return "Staff"
    }
    else if(val==3){
        return "Customer"
    } 
    else if(val==4){
        return "Workshop User"
    }
    else if(val==5){
        return "Free User"
    }
    else if(val==6){
        return "Technician"
    }else if(val==7){
        return "Customer Admin"
    }else if(val==8){
        return "Customer Manager"
    }else if(val==9){
        return "Customer User"
    }else{
        return "No Role"
    }
}

export const Status = (val)=>{
//     0 - Pending Approval
// 1 - Approved
// 2 - Rejected
    if(val===0){
       return {
              status:"Pending Approval",
              color:"warning"
       }
    }
    else if(val===1){
        return {
            status:"Approved",
            color:"success"
        }
    }
    else if(val==2){
        return{
            status:"Rejected",
            color:"danger"
        }   
    } 
   
}