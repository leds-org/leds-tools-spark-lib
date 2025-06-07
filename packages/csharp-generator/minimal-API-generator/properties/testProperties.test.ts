import { describe, it, expect, vi, beforeEach } from "vitest";
import * as fs from "fs";
import * as path from "path";
import { generate, createPropertiesJSON, createLaunchSettingsJSON } from "./generator";
import * as langiumGenerate from "langium/generate";

// Mocks
vi.mock("fs");
vi.mock("path");
vi.mock("langium/generate", () => ({
  expandToStringWithNL: (strings: TemplateStringsArray, ...exprs: any[]) =>
    String.raw({ raw: strings }, ...exprs),
}));

const mockWriteFileSync = fs.writeFileSync as unknown as ReturnType<typeof vi.fn>;
const mockJoin = path.join as unknown as ReturnType<typeof vi.fn>;

describe("properties/generator.ts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockWriteFileSync.mockImplementation(() => {});
    mockJoin.mockImplementation((...args: string[]) => args.join("/"));
  });

  describe("generate", () => {
    it("should write Properties.json and launchSettings.json when model.configuration exists", () => {
      const model = { configuration: { name: "Test", description: "desc" } };
      generate(model as any, "output");

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
      generate(model as any, "output");
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