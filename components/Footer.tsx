import type { ReactElement } from 'react';

export function Footer(): ReactElement {
  return (
    <footer className="border-t border-slate-200 bg-slate-900 text-slate-200">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} GRA Ward</p>
        <p>Meeting schedule and agenda overview</p>
      </div>
    </footer>
  );
}
