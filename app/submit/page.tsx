import { redirect } from "next/navigation"

export default function SubmitRedirectPage() {
  redirect("/author/login")
}
