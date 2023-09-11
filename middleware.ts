import { NextRequest, NextResponse } from "next/server";

export default function middleware(req:NextRequest) {
    if(req.nextUrl.pathname==='/') return NextResponse.redirect(new URL('/1',req.url));
}

export const config = {
    matchers: ['/'],
}