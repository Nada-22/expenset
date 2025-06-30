export interface ExpenseI {
    category: string,
    date: Date | string,
    amount: number,
    receipt: any,
    usdAmount?: number

}
