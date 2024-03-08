// src/components/Submit.jsx

'use client';

import { useFormStatus } from 'react-dom';

export default function Submit() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      type="submit"
      className="bg-[#387ADF] m-8 rounded-md"
    >
      {pending ? 'Adding post...' : 'Add post'}
    </button>
  );
}
