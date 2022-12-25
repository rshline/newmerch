import axios from 'axios'
import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Login: NextPage = () => {

  const [username, setUsername] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [error, setError] = useState<boolean | null>(false);
  const router = useRouter();

  const handleClick = async () => {
    try {
      await axios.post("http://localhost:3000/api/auth/adminlogin", {
        username,
        password,
      });
      router.push("/admin");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div>
      <Head>
        <title>NewMerch - Admin Login</title>
        <meta name="description" content="NewJeans Merchandise Shop" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
      <div>
        <h1>Admin Login</h1>
        <input
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleClick}>
          Sign In
        </button>
        {error && <span>You don't have an access!</span>}
      </div>
    </div>
    </div>
  )
}

export default Login
