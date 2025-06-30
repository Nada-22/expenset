export interface ExpenseI {
    category: ExpenseCategoryI,
    date: Date | string,
    amount: number,
    currencyRate: number,

    receipt: any,
    usdAmount?: number,
    categoryIcon?: string

}
export interface ExpenseCategoryI {
    id: string,
    name: string,
    createdAt: Date | string,
    icon: string,


}