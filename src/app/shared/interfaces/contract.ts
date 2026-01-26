export interface IContract {
    contractNum? : number;
    contractSeller? : string;
    contractBuyer? : string;
    contractPrice? : string;
    propertyArea? : string;
    isSigned? : boolean;
    createdBy?: {
        username:string;
    }
}
