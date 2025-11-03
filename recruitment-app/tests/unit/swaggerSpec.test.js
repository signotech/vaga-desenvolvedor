import swaggerSpec from "@/lib/swagger/swaggerDoc.mjs";

describe("swaggerSpec", () => {
  it("exposes an OpenAPI version", () => {
    expect(swaggerSpec).toHaveProperty("openapi", "3.0.3");
  });

  it("documenta a tag Jobs", () => {
    const tags = swaggerSpec.tags?.map((tag) => tag.name);
    expect(tags).toContain("Jobs");
  });
});
