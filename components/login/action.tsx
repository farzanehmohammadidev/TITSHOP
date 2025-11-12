 export const action_Data = async ( formData : FormData): Promise<void> => {
    const email = formData.get("email")?.toString() ?? "";
  const password = formData.get("password")?.toString() ?? "";
    const res = await fetch("/api/auth/log", {
      method: "POST",
      body: JSON.stringify({email , password}),
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    const data = await res.json();
    alert(JSON.stringify(data));
  };
