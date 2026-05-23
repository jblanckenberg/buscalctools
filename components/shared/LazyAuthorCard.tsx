import LazyBelowFold from "@/components/shared/LazyBelowFold";
import AuthorCard from "@/components/shared/AuthorCard";

type AuthorCardProps = React.ComponentProps<typeof AuthorCard>;

export default function LazyAuthorCard(props: AuthorCardProps) {
  return (
    <LazyBelowFold minHeight={200} placeholderLabel="Author card loading">
      <AuthorCard {...props} />
    </LazyBelowFold>
  );
}
