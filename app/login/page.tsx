'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Warning from '../components/warning';
import Error from '../components/error';
import Cookie from 'js-cookie';
export default function Login() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [warningMsg, setWarningMsg] = useState<string>('');

  const route = useRouter();
  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NEST_SERVER}/api/auth/login`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
        }),
      },
    );
    const body = await response.json();
    switch (true) {
      case response.ok:
        Cookie.set('access_token', body.access_token, { expires: 7 });
        route.push('/');
        break;
      case response.status >= 400:
        setWarningMsg(body.msg);
        break;
      case response.status >= 500:
        setErrorMsg(body.msg || 'unknown error occurs');
    }
  };
  return (
    <div className=" w-screen h-screen flex items-center justify-center">
      {warningMsg ? <Warning msg={warningMsg} /> : null}
      {errorMsg ? <Error msg={errorMsg} /> : null}
      <form onSubmit={login} className=" form-control w-10/12 max-w-xs">
        <h1 className=" font-medium text-lg text-center text-primary">
          Log in
        </h1>
        <label htmlFor="email">email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          type="text"
          id="email"
          name="email"
          className=" form-input"
        />
        <label htmlFor="password">password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          type="password"
          id="password"
          name="password"
          className=" form-input"
        />
        <button className=" btn btn-primary mt-2">Log in</button>
        <div>
          Create a new account?
          <Link href="/signup" className=" text-primary hover:underline">
            signup
          </Link>
        </div>
      </form>
    </div>
  );
}
