import Image from "next/image";
import Link from "next/link";

export default function Home()  {
  return (
    <div className="flex justify-center items-center">
     <Link href={'/todo'} className="underline hover:bg-blue-500">Go todo</Link>
    </div>
  );
}
