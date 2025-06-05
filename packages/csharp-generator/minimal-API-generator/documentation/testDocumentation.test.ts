import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import * as fs from "fs";
import * as path from "path";
import * as langiumGenerate from "langium/generate";
import { generate, createGitLab, stackREADME, createProjectReadme } from "./generator";

// generator.test.ts

// Mocks
vi.mock("fs");
vi.mock("path");
vi.mock("langium/generate", () => ({
  expandToStringWithNL: (strings: TemplateStringsArray, ...exprs: any[]) =>
    String.raw({ raw: strings }, ...exprs),
}));

const mockMkdirSync = fs.mkdirSync as unknown as ReturnType<typeof vi.fn>;
const mockWriteFileSync = fs.writeFileSync as unknown as ReturnType<typeof vi.fn>;
const mockJoin = path.join as unknown as ReturnType<typeof vi.fn>;

describe("generator.ts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockMkdirSync.mockImplementation(() => {});
    mockWriteFileSync.mockImplementation(() => {});
    mockJoin.mockImplementation((...args: string[]) => args.join("/"));
  });

  describe("generate", () => {
    it("should create target folder and write files when model.configuration exists", () => {
      const model = {
        configuration: {
          name: "TestProject",
          description: "A test project",
        },
      };
      generate(model as any, "output");

      expect(mockMkdirSync).toHaveBeenCalledWith("output", { recursive: true });
      expect(mockWriteFileSync).toHaveBeenCalledWith(
        "output/README.md",
        expect.stringContaining("# TestProject")
      );
      expect(mockWriteFileSync).toHaveBeenCalledWith(
        "output/.gitlab-ci.yml",
        expect.stringContaining("docker-build:")
      );
    });

    it("should not write files if model.configuration is undefined", () => {
      const model = {};
      generate(model as any, "output");
      expect(mockWriteFileSync).not.toHaveBeenCalled();
    });
  });

  describe("createGitLab", () => {
    it("should return a string containing docker-build", () => {
      // Importando diretamente a função privada via require
      const result = createGitLab({} as any);
      expect(result).toContain("docker-build:");
      expect(result).toContain("docker build -t");
    });
  });

  describe("stackREADME", () => {
    it("should return a string listing Minimal API and Swagger API", () => {
      const result = stackREADME();
      expect(result).toContain("Minimal API");
      expect(result).toContain("Swagger API");
    });
  });

  describe("createProjectReadme", () => {
    it("should return a README string with project name and description", () => {
      const result = createProjectReadme({ name: "MyApp", description: "Desc" } as any);
      expect(result).toContain("# MyApp");
      expect(result).toContain("Desc");
      expect(result).toContain("Domain documentation");
    });
  });
});