import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-grow justify-center p-4">
      <Link href="/auth" className="my-56 text-4xl text-fuchsia-500">
        Register/Login
      </Link>
    </div>
  );
}

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

// export default function Home() {
//   return (
//     <div className="flex flex-grow justify-center p-4">
//       <h1>Welcome to the Todo App</h1>
//     </div>
//   );
// }
