'use client' // Error components must be Client Components
 
import { useRouter } from 'next/navigation'
 
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {

  const route = useRouter();
  return (
    <div className=' bg-base-200 h-screen w-screen flex justify-center items-center flex-col'>
      <h2 className=' font-semibold sm:text-lg text-gray-600 mb-2'>OOps!, Something went wrong!</h2>
      <div className=' flex'>
      <button
        className=' btn btn-primary btn-sm mr-2'
        onClick={
          () => reset()
        }
      >
        Try again
      </button>
      <button
        className=' btn btn-secondary btn-sm'
        onClick={
          () => route.back()
        }
      >
        previous
      </button> 
      </div>
    </div>
  )
}