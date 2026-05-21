import LazyBelowFold from "@/components/shared/LazyBelowFold";
import RelatedTools from "@/components/shared/RelatedTools";

// Inherit RelatedTools's exact prop shape so call-sites need zero changes
// beyond the import swap.
type RelatedToolsProps = React.ComponentProps<typeof RelatedTools>;

export default function LazyRelatedTools(props: RelatedToolsProps) {
  return (
    <LazyBelowFold minHeight={240} placeholderLabel="Related calculators loading">
      <RelatedTools {...props} />
    </LazyBelowFold>
  );
}
