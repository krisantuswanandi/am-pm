import { MenuForm } from "./form";

export default async function NewMenuPage() {
  async function submit(formData: FormData) {
    console.log(formData.get("tes"));
  }

  return <MenuForm />;
}
