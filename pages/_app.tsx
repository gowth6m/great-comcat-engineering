import "../styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider, useSession } from "next-auth/react";
import { StoreProvider } from "../utils/Store";
import { useRouter } from "next/router";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <StoreProvider>
        {/* {Component.auth ? (
          <Auth>
            <Component {...pageProps} />
          </Auth>
        ) : (
          <Component {...pageProps} />
        )} */}

        <Component {...pageProps} />

        {/* <Auth>
          <Component {...pageProps} />
        </Auth> */}
      </StoreProvider>
    </SessionProvider>
  );
}

// export function Auth({ children }: any) {
//   const router = useRouter();

//   const { status } = useSession({
//     required: true,
//     onUnauthenticated() {
//       // router.push("/unauthorized?message=login required");
//       router.push("/login");
//     },
//   });

//   if (status === "loading") {
//     return <div>Loading...</div>;
//   }

//   return <>{children}</>;
// }
