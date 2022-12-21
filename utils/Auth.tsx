import { useRouter } from "next/router";
import { SessionProvider, useSession } from "next-auth/react";

export function Auth({ children }: any) {
  const router = useRouter();

  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // router.push("/unauthorized?message=login required");
      router.push("/login");
    },
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
