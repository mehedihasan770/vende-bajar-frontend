import { getServerUser } from "@/utils/getServerUser";

export default async function Home() {

  const { fullName, isLoggedIn } = await getServerUser()
  console.log(fullName, isLoggedIn)

  return (
    <>
      {/* main content */}
      <main>
          <h1>Hallo {fullName}</h1>
          {
            !isLoggedIn ? <h1>Loading...</h1> : <h1>halo bro</h1>
          }
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
          <h1>hallo Home</h1>
      </main>
    </>
  );
}
