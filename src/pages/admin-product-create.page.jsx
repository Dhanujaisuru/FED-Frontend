import { useUser } from "@clerk/clerk-react";

function AdminProductCreatePage() {
  const { isLoaded, isSignedIn, user } = useUser();

  if (!isLoaded) {
    return <main className="px-8">Loading...</main>;
  }

  if (!isSignedIn) {
    return <Navigate to="/sign-in" />;
  }

  if (user.publicMetadata?.role !== "admin") {
    return <Navigate to="/" />;
  }

  return (
    <main className="px-8">

      <h1 className="text-4xl font-bold">Create Product</h1>

    </main>
  );
}

export default AdminProductCreatePage;