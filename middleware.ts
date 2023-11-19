import { decode } from 'jsonwebtoken';
import { parseUrl } from 'next/dist/shared/lib/router/utils/parse-url';
import { NextRequest, NextResponse } from 'next/server';
import { JWT } from './app/utils/types';
interface ArrayX<T extends number> extends Array<any> {
  length: T,
}
interface URL_X extends URL {
  setQueryParams:<K extends string[],V extends ArrayX<K["length"]>>(keys:[...K],values:V)=>void;
}

class URLX extends URL implements URL_X {
  constructor(url:string | URL,base?:string|URL|undefined) {
    super(url,base);
  }
  setQueryParams<K extends string[],V extends ArrayX<K["length"]>>(keys:[...K],values:V) {
    for(let i = 0;i < keys.length; i++) {
      let searchParams = new URLSearchParams(this.search);
      if(searchParams.has(keys[i])){
        searchParams.set(keys[i], String(values[i]));
      }else{
        searchParams.append(keys[i], String(values[i]));
      }
      this.search = searchParams.toString();
    }
  }
}


const redirect = (urlx:URL_X,req:NextRequest) =>{  
  if (urlx.href === req.nextUrl.href) {    
    return;
  }
  return NextResponse.redirect(urlx);
  
}
const allowedParams = (urlx: URL_X ,allowedQueryParams:string[]) => {
  for (const [key] of urlx.searchParams.entries()) {
    
    if (!allowedQueryParams.includes(key)) {
      urlx.searchParams.delete(key);
    }
  }
}

export default function middleware(req: NextRequest,res: NextResponse) {
  const urlx = new URLX(req.url);
  if (req.nextUrl.pathname === '/') {
    const token = req.cookies.get('access_token');
    return NextResponse.redirect(
      new URL(`/home?page=1&isLogin=${token ? true : false}`, req.url),
    );
  }

  

  if(req.nextUrl.pathname.startsWith('/login')) {
    allowedParams(urlx,[]);
    return redirect(urlx,req);
  }



  if(req.nextUrl.pathname.startsWith('/signup')) {
    allowedParams(urlx,[]);
    return redirect(urlx,req);
  }



  if (req.nextUrl.pathname.startsWith('/home')) {
    const token = req.cookies.get('access_token');
    const queryParams = parseUrl(urlx.href).query;
    const page = Number(queryParams.page);
    allowedParams(urlx,['page','isLogin'])
    if (isNaN(page) || page <= 0) {
      urlx.setQueryParams(["page"],[1]);      
    }else{
      urlx.setQueryParams(["page"],[page]);
    }
    if(token) {
      urlx.setQueryParams(["isLogin"],[true]);
    }else{
      urlx.setQueryParams(["isLogin"],[false]);
    }
    
    return redirect(urlx,req);
  }




  if(req.nextUrl.pathname.startsWith('/profile')) {
    const profileId = Number(urlx.pathname.split('/').pop());
    const token = req.cookies.get("access_token")?.value;
    const tab = req.nextUrl.searchParams.get('tab');
    allowedParams(urlx,['inspect','tab']);
    if(!tab || tab!=='posts'&& tab!=='activity') {
      urlx.setQueryParams(["tab"],['posts']);
    }else{
      urlx.setQueryParams(["tab"],[tab]);
    }
    if(!token){
      urlx.setQueryParams(["inspect"],[true])
      return redirect(urlx,req);
    }
    const user = decode(token) as JWT;
    
    if(profileId===user.id) {
      urlx.setQueryParams(["inspect"],[false])
      
    }else{
      urlx.setQueryParams(["inspect"],[true])
    }
    return redirect(urlx,req)
  }


  if(req.nextUrl.pathname.startsWith('/blog')){
    allowedParams(urlx,[]);
    return redirect(urlx,req);
  }
}

export const config = {
  matchers: ['/', '/home','/profile/:profileId','/login','/signup','/blog/:id'],
};
