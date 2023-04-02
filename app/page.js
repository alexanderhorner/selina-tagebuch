import QuestionList from '@/components/QuestionList';
import Head from 'next/head';

// Page component that shows one question after another at random
export default function Page() {
  return (
    <main className="p-4 flex justify-center items-center flex-grow">
      <QuestionList />
    </main>
  )
}

