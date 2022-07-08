interface ReturnAPIInterface{
    success:boolean,
    message:string,
    data:object,
    
}

export class ReturnAPI implements ReturnAPIInterface{

    success:boolean
    message:string
    data:object

    constructor(success : boolean, message : string, data : object){
        this.success = success;
        this.message = message;
        this.data = data;
    }

}