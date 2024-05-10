export type BankAuthTokenResponse = {
  access: string,
  access_expires: number,
  refresh: string,
  refresh_expires: number,
}

export type institutionResponse = {
  id: string;
  name: string;
  bic: string;
  transaction_total_days: string;
  countries: string[];
  logo: string;
}