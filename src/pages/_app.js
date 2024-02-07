import "@/src/styles/globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import AppContent from "@/Components/AppContent";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "@/lib/apollo";
export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <ApolloProvider client={apolloClient}>
        <AppContent {...{ Component, pageProps }} />
      </ApolloProvider>
    </UserProvider>
  );
}
