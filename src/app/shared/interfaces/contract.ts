export interface IContract {
    _id:string;
    contractNum : string;
    contractSeller? : string;
    contractBuyer? : string;
    contractPrice? : string;
    propertyArea? : string;
    isSigned? : boolean;
    createdBy?: {
        username:string;
    }
}
