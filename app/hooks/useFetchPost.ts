function useFetchPost() {
  const postData = async (url: string, formData: FormData) => {
    try {
      const response = await fetch(`http://localhost:3000/` + url, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return await response.json();
    } catch (error) {
      console.error("Error posting data:", error);
    }
  };

  return postData;
}

export { useFetchPost };
