import { useRouter } from "next/router";

export default function Error() {
  const { query } = useRouter();

  return (
    <div>
      <h1>{query?.status ?? "Uknown error status code"}</h1>
      <h2>{query?.statusText ?? "Unknown error status text"}</h2>
      <p>{query?.message ?? "Uknown error details."}</p>
    </div>
  );
}
