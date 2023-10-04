import { parseUrl } from "next/dist/shared/lib/router/utils/parse-url";
import { NextRequest, NextResponse } from "next/server";




export default function middleware(req:NextRequest) {
    if(req.nextUrl.pathname==='/') {
        const token = req.cookies.get('access_token');
            return NextResponse.redirect(new URL(`/home?page=1&isLogin=${token ? true:false}`,req.url));
    }
    if(req.nextUrl.pathname.startsWith('/home')) {        
        const token = req.cookies.get('access_token');
        const queryParams = parseUrl(req.nextUrl.href).query;
        const page = Number(queryParams.page);
        
        
        if(isNaN(page)||page<=0) {
            
            return NextResponse.redirect(new URL(`/home?page=1&isLogin=${token ? true:false}`,req.url));
        }
        
        const url = new URL(`/home?page=${queryParams.page}&isLogin=${token ? true:false}`,req.url);

        if(url.href===req.nextUrl.href) {
            return;
        }
        // if(!queryParams.page) {
        //     return NextResponse.redirect(new URL(`/home?page=1&isLogin=${token ? true:false}`,req.url));
        // }
        return NextResponse.redirect(url);
    }
}

export const config = {
    matchers: ['/','/home'],
}