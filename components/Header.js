import Link from "next/link";
import { signIn } from "next-auth/react";

export default function Header() {
  return (
    <header>
      <nav>
        <Link href="/">
          <a>Home</a>
        </Link>
        <Link href="/signup">
          <a>Signup</a>
        </Link>

        <button onClick={() => signIn()}>Sign in</button>
      </nav>
    </header>
  );
}
