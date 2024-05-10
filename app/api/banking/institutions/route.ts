import {NextResponse} from "next/server";
import {getValidInstitutions} from '@/lib/utils'

export async function GET() {
  const response = await fetch('http://localhost:3000/api/banking/auth');
  console.log('response', response)
  const responseData = await response.json();
  console.log("response-data:",responseData);
  const institutionList = await getValidInstitutions(responseData.message);
  return NextResponse.json({ message: institutionList }, { status: 200 });
}