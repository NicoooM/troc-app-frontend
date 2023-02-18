export default function CreateArticleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="container">
        <h1>Layout</h1>
        {children}
      </div>
    </>
  );
}
