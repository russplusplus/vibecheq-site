import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
        <Image src='/coming-soon.png' alt='' width={50000} height={10000} style={{objectFit: "cover"}}></Image>
    </main>
  );
}
