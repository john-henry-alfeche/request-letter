import { Card } from "@/components/Card/Card";
import { Header } from "@/components/Layout/Header";
import axios from "axios";
import { GetServerSidePropsContext } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Index({ results }: any) {
  const router = useRouter();
  useEffect(() => {
    if (results.length < 1) {
      router.push("/");
    }
  }, [results, router]);

  return (
    <div className="flex h-screen w-screen bg-gradient-to-b from-blue-200 to-blue-300">
      <Header />
      <main className="mt-16 mx-4 flex flex-col w-full overflow-auto mb-4">
        <div className="flex flex-col mt-4 items-center">
          <h2 className="text-2xl font-bold mb-2">Request Letter</h2>
        </div>

        <div className="flex flex-col items-center space-y-2 w-full">
          {results &&
            results.map((result: any) => (
              <Card
                key={result.rl_no}
                requestNumber={result.rl_no}
                date={result.requested_date}
                purpose={result.purposes}
                requestedBy={result.requested_by}
                items={result.item}
              />
            ))}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  try {
    const token = context.req.cookies["bearerToken"];
    const response = await axios.get(
      "https://122.3.104.117:5660/request-letters",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const results = response.data;
    return { props: { results } };
  } catch (error) {
    return { props: { results: [] } };
  }
}
