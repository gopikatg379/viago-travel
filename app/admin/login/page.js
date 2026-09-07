import LoginForm from "./LoginForm";

export default async function Login({ searchParams }) {
  const q = await searchParams;

  return <LoginForm error={q?.error} />;
}