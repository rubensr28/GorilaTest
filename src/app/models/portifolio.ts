export interface Id {
    minDate: Date;
    maxDate: Date;
}

export interface Profit {
    _id: Id;
    totalValue: number;
    openCashEquivalentMV: number;
    closeCashEquivalentMV: number;
    totalPnl: number;
    netTotalPnl: number;
    profit: number;
    netProfit: number;
    count: number;
    accumulatedPnl: number;
    netAccumulatedPnl: number;
    profitFactor: number;
    netProfitFactor: number;
}

export interface Portifolio {
    FundId: string;
    TraderName: string;
    FundTypeName: string;
    Profit: Profit[];
}



