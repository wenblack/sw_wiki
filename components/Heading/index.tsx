interface HeadingProps {
  total: number | string;
}
export function Heading({ total }: HeadingProps) {
  return (
    <h1 className="mt-20 text-xl m-4" id="Result">
      Showing: {total} results
    </h1>
  );
}
