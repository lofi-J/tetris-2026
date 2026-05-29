import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center">
      <h1 className="text-4xl font-bold text-gray-900">Hello World</h1>
      <Link href="/game">Press Any Key to Start</Link>
    </div>
  );
}
