export interface IContract {
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
