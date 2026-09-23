export interface BankTransferConfig {
  bankName: string;
  accountName: string;
  accountNumber: string;
  sortCode?: string;
  currency: string;
}

export function getBankTransferConfig(): BankTransferConfig {
  return {
    bankName: process.env.BANK_NAME || "Guaranty Trust Bank (GTBank)",
    accountName: process.env.BANK_ACCOUNT_NAME || "Tesacola Empire Nigeria",
    accountNumber: process.env.BANK_ACCOUNT_NUMBER || "0823456789",
    sortCode: process.env.BANK_SORT_CODE || "",
    currency: "NGN",
  };
}
