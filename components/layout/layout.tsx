export function Layout({children}: {children: React.ReactNode}) {
  return <div className="max-w-360 w-full relative mx-auto overflow-hidden  text-black bg-slate-50 font-sans dark:bg-black dark:text-white ">
    {children}
  </div>;
}
