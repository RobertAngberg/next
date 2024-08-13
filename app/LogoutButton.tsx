import { signOut, useSession } from "next-auth/react";

function LogoutButton() {
  const { data: session } = useSession();

  return (
    <div className="flex justify-end items-center md:fixed md:right-0 md:top-1 md:m-4 text-white">
      <span className="hidden md:inline mr-6 md:-mt-1">
        {session?.user?.name}
      </span>
      <button
        onClick={() => signOut()}
        className="bg-transparent hover:bg-white hover:bg-opacity-20 text-white font-bold py-2 px-4 border border-white rounded transition duration-300"
      >
        Logga ut
      </button>
    </div>
  );
}

export { LogoutButton };