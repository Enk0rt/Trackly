import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex h-screen flex-col items-center justify-center">
            <h1 className="text-5xl font-extrabold text-[#34684F] dark:text-white">
                404
            </h1>
            <h2 className="mt-2 text-2xl font-semibold text-gray-800 dark:text-gray-200">
                Page not found
            </h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400 text-center max-w-md">
                Sorry, the page you are looking for doesn’t exist or has been moved.
            </p>
            <Link
                href="/"
                className="mt-6 px-5 py-2 rounded-lg bg-[#34684F] text-white hover:bg-[#28533E] transition-colors duration-300"
            >
                Back to Home
            </Link>
        </div>
    );
}