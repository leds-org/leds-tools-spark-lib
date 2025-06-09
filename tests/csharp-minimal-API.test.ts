import { describe, it, expect, vi, beforeEach } from "vitest";


import * as fs from "fs";
import * as path from "path";


import {
  generate as docGenerate,
  createGitLab,
  stackREADME,
  createProjectReadme,
} from "../packages/csharp-generator/minimal-API-generator/documentation/generator";

import {
  generate as propGenerate,
  createPropertiesJSON,
  createLaunchSettingsJSON,
} from "../packages/csharp-generator/minimal-API-generator/properties/generator";


import { generate as wsGenerate } from "../packages/csharp-generator/minimal-API-generator/webservice/generator";
import * as moduleGen from "../packages/csharp-generator/minimal-API-generator/webservice/module-generator";
import * as programGen from "../packages/csharp-generator/minimal-API-generator/webservice/program-generator";


vi.mock("fs");
vi.mock("path");
vi.mock("langium/generate", () => ({
  expandToStringWithNL: (strings: TemplateStringsArray, ...exprs: any[]) =>
    String.raw({ raw: strings }, ...exprs),
}));
vi.mock("../packages/csharp-generator/minimal-API-generator/webservice/module-generator");
vi.mock("../packages/csharp-generator/minimal-API-generator/webservice/program-generator");


const mockMkdirSync = fs.mkdirSync as unknown as ReturnType<typeof vi.fn>;
const mockWriteFileSync = fs.writeFileSync as unknown as ReturnType<typeof vi.fn>;
const mockJoin = path.join as unknown as ReturnType<typeof vi.fn>;
const mockGenerateModules = moduleGen.generateModules as unknown as ReturnType<typeof vi.fn>;
const mockGenerateProgram = programGen.generate as unknown as ReturnType<typeof vi.fn>;

// -------------------- Documentation Tests --------------------
describe("documentation/generator.ts", () => {
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
      docGenerate(model as any, "output");

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
      docGenerate(model as any, "output");
      expect(mockWriteFileSync).not.toHaveBeenCalled();
    });
  });

  describe("createGitLab", () => {
    it("should return a string containing docker-build", () => {
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

// -------------------- Properties Tests --------------------
describe("properties/generator.ts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockWriteFileSync.mockImplementation(() => {});
    mockJoin.mockImplementation((...args: string[]) => args.join("/"));
  });

  describe("generate", () => {
    it("should write Properties.json and launchSettings.json when model.configuration exists", () => {
      const model = { configuration: { name: "Test", description: "desc" } };
      propGenerate(model as any, "output");

      expect(mockWriteFileSync).toHaveBeenCalledWith(
        "output/Properties.json",
        expect.stringContaining('"profiles":')
      );
      expect(mockWriteFileSync).toHaveBeenCalledWith(
        "output/launchSettings.json",
        expect.stringContaining('"profiles":')
      );
    });

    it("should not write files if model.configuration is undefined", () => {
      const model = {};
      propGenerate(model as any, "output");
      expect(mockWriteFileSync).not.toHaveBeenCalled();
    });
  });

  describe("createPropertiesJSON", () => {
    it("should return a string containing ASPNETCORE_ENVIRONMENT", () => {
      const result = createPropertiesJSON();
      expect(result).toContain("ASPNETCORE_ENVIRONMENT");
      expect(result).toContain("profiles");
    });
  });

  describe("createLaunchSettingsJSON", () => {
    it("should return a string containing launchBrowser", () => {
      const result = createLaunchSettingsJSON();
      expect(result).toContain("launchBrowser");
      expect(result).toContain("profiles");
    });
  });
});

// -------------------- Webservice Tests --------------------
describe("webservice/generator.ts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockMkdirSync.mockImplementation(() => {});
    mockGenerateModules.mockImplementation(() => {});
    mockGenerateProgram.mockImplementation(() => {});
  });

  it("should create target folder and call generateModules and generateProgram", () => {
    const model = { configuration: { name: "Test", description: "desc" } };
    wsGenerate(model as any, "output");

    expect(mockMkdirSync).toHaveBeenCalledWith("output", { recursive: true });
    expect(mockGenerateModules).toHaveBeenCalledWith(model, "output");
    expect(mockGenerateProgram).toHaveBeenCalledWith(model, "output");
  });
});