export interface SecurityAlternateID {
    Source: string;
    ID: string;
}

export interface Acao {
    FundID: string;
    Side: string;
    BrokerID: number;
    TradeDate: string;
    ProductSubTypeID: number;
    SecurityAlternateIDs: SecurityAlternateID[];
    Quantity: number;
    Price: number;
    Source: string;
}