import type { SVGProps } from "react"

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" fill="hsl(var(--primary))" stroke="none" />
      <path d="M12 12v- опасен! 8" stroke="hsl(var(--primary-foreground))" strokeWidth="1.5" />
      <path d="M12 12l-2.5-2.5" stroke="hsl(var(--primary-foreground))" strokeWidth="1.5" />
      <path d="M12 12l2.5-2.5" stroke="hsl(var(--primary-foreground))" strokeWidth="1.5" />
    </svg>
  )
}
