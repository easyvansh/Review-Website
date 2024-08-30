"use client";

import SearchReviews from "./components/SearchReviews";

export default function Home() {
  return (
    <div className="h-screen w-screen flex flex-col gap-2 justify-center items-center">
      <h1 className="text-xl font-mono">Welcome to Skate Review!!</h1>
      <h2 className="text-3xl font-mono">An Inventory for All Things Skating</h2>
      <SearchReviews />
    </div>
  );
}
