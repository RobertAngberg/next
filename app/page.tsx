import { useState } from "react";
import Card from "./Card";

type Pet = {
  name: string;
  owner: string;
};

export default async function Home() {
  // const response = await fetch("https://dummyjson.com/products/2");
  // const data = await response.json();

  const response = await fetch("http://localhost:3000/api");
  // const asdf = await response.json();
  // console.log(asdf);
  const { pets: fetchedPets } = await response.json(); // Destructuring here
  console.log(fetchedPets);

  return (
    <main className="items-center p-24 text-center flex">
      <Card />
      <Card />
      <Card />

      <h1>Pets List</h1>
      <ul>
        {fetchedPets &&
          fetchedPets.map &&
          fetchedPets.map((pet: Pet, index: number) => (
            <li key={index}>
              {pet.name} - Owner: {pet.owner}
            </li>
          ))}
      </ul>
    </main>
  );
}
