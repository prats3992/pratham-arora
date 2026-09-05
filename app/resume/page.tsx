import { redirect } from "next/navigation"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Resume & Background",
  description: "Redirecting to Pratham Arora's about & background page.",
}

export default function ResumePage() {
  redirect("/about")
}
