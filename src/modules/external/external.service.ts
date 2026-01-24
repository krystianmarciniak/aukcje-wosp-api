export class ExternalService {
  async getPosts() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");

    if (!res.ok) {
      throw new Error("External API error");
    }

    return res.json();
  }
}
