
// user id card for testing purposes
import { getAuthUser } from "@/src/lib/auth/getAuthUser";

export default async function IDCard() {
  const user = await getAuthUser();
  return <>
    <div className="bg-gray-200 p-2 border shadow-lg rounded-lg fixed bottom-20 right-1 flex items-center gap-4">
        <div>
            <h2 className="text-xs font-semibold">User: {user?.username}</h2>
            <p className="text-xs text-gray-500">Mail: {user?.email}</p>
            <p className="text-xs text-gray-500">Role: {user?.role}</p>
            <p className="text-xs text-gray-500">ID: {user?.id}</p>
        </div>
    </div>
  </>;
}
