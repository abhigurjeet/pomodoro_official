import Link from "next/link";
import NavBar from "@/Components/NavBar";
import HomePage from "@/Components/Home";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function Home() {
  return (
    <div>
      <HomePage />
    </div>
  );
}
