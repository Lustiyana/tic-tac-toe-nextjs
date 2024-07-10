"use client";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex flex-col justify-center items-center h-screen gap-8">
      <button className="btn btn-primary" onClick={() => router.push("/main")}>
        MULAI MAIN
      </button>
      <button
        className="btn btn-primary"
        onClick={() => router.push("/example")}
      >
        LIHAT CONTOH
      </button>
    </div>
  );
}
