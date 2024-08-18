import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import ChatInterface from "../components/ChatInterface";
import { useEffect, useState } from "react";

export default function Home() {
  const [sessionId, setSessionId] = useState(null);

  useEffect(() => {
    // Create a new session when the component mounts
    const createNewSession = async () => {
      const response = await fetch("http://localhost:3001/api/new-session", {
        method: "POST",
      });
      const data = await response.json();
      setSessionId(data.sessionId);
    };
    createNewSession();
  }, []);

  return (
    <div>
      <Head>
        <title>CodexAI Chat Interface</title>
        <meta name="description" content="AI-powered chat interface" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Sidebar />
      {sessionId && <ChatInterface sessionId={sessionId} />}
      <Footer />
    </div>
  );
}
