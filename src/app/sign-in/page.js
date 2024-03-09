// src/app/sign-in/page.js

import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <div className="w-full max-w-md">
        <SignIn
          appearance={{
            elements: {
              rootBox: 'bg-transparent border border-gray-700 rounded-lg p-8',
              card: 'bg-transparent',
              headerTitle: 'text-white text-2xl mb-4',
              headerSubtitle: 'text-gray-400 mb-4',
              formFieldInput: 'bg-gray-800 text-white rounded-md p-2',
              footerActionText: 'text-gray-400',
              socialButtonsBlockButton:
                'bg-blue-600 hover:bg-[#387ADF] bg-opacity-50 text-white rounded-md p-2 mb-2',
              formButtonPrimary:
                'bg-blue-600 hover:bg-[#387ADF] bg-opacity-50 text-white rounded-md p-2',
            },
          }}
        />
      </div>
    </div>
  );
}
