import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export async function requestToken() {
  try {
    const response = await fetch("https://bankaccountdata.gocardless.com/api/v2/token/new/", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        secret_id: process.env.SECRET_ID,
        secret_key: process.env.SECRET_KEY
      })
    });
    if (!response.ok) {
      console.log("Network response was not ok: ", response);
    }
    return await response.json();
  } catch (error) {
    console.error("There was a problem with your fetch operation:", error);
    throw error; // Rethrow the error to handle it outside the function
  }
}

export async function getValidInstitutions(accessToken: string) {
  console.log('accessToken:', accessToken)
  console.log("Authorization:", `Bearer ${accessToken}`);

  try {
    const response = await fetch("https://bankaccountdata.gocardless.com/api/v2/institutions/?country=IE", {
      method: "GET",
      headers: {
        "accept": "application/json",
        "Authorization": `Bearer ${accessToken}`
      }
    });
    if (!response.ok) {
      console.log("Network response was not ok: ", response);
    }
    return await response.json();
  }
  catch (e) {
    console.error("There was a problem with your fetch operation:", e);
    throw e; // Rethrow the error to handle it outside the function
  }
}