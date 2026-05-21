import LazyBelowFold from "@/components/shared/LazyBelowFold";
import MethodologyBox from "@/components/shared/MethodologyBox";

type MethodologyBoxProps = React.ComponentProps<typeof MethodologyBox>;

export default function LazyMethodologyBox(props: MethodologyBoxProps) {
  return (
    <LazyBelowFold minHeight={400} placeholderLabel="Methodology section loading">
      <MethodologyBox {...props} />
    </LazyBelowFold>
  );
}
