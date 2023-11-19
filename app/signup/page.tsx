'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Warning from '../components/warning';
import Error from '../components/error';
export default function SignupPage() {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const route = useRouter();
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [warningMsg, setWarningMsg] = useState<string>('');

  const signup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NEST_SERVER}/api/auth/signup`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'post',
        body: JSON.stringify({
          name: username,
          email,
          password,
        }),
      },
    );
    const body = await response.json();
    switch (true) {
      case response.ok:
        route.push('/login');
        break;
      case response.status >= 400:
        setWarningMsg(body.msg);
        break;
      case response.status >= 500:
        setErrorMsg(body.msg || 'unknown error');
        break;
    }
  };
  return (
    <div className=" w-screen h-screen flex items-center justify-center">
      {warningMsg ? <Warning msg={warningMsg} /> : null}
      {errorMsg ? <Error msg={errorMsg} /> : null}
      <form onSubmit={signup} className=" mt-1 form-control w-10/12 max-w-xs">
        <h1 className=" font-medium text-lg text-center text-primary">
          Sign Up
        </h1>
        <label htmlFor="username">username</label>
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          type="text"
          id="username"
          name="username"
          className=" form-input"
        />
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
        <button className=" btn btn-primary mt-2">Sign up</button>
        <div>
          Already have account?
          <Link href="/login" className=" text-primary hover:underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
}
