export default function AccessibleLink({ href, children, ariaLabel }) {
  return <a href={href} aria-label={ariaLabel}>{children}</a>;
}