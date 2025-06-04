import { describe, it, expect, vi, beforeEach } from "vitest";
import * as fs from "fs";
import { generate } from "./generator";
import * as moduleGen from "./module-generator";
import * as programGen from "./program-generator";

vi.mock("fs");
vi.mock("./module-generator");
vi.mock("./program-generator");

const mockMkdirSync = fs.mkdirSync as unknown as ReturnType<typeof vi.fn>;
const mockGenerateModules = moduleGen.generateModules as unknown as ReturnType<typeof vi.fn>;
const mockGenerateProgram = programGen.generate as unknown as ReturnType<typeof vi.fn>;

describe("webservice/generator.ts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockMkdirSync.mockImplementation(() => {});
    mockGenerateModules.mockImplementation(() => {});
    mockGenerateProgram.mockImplementation(() => {});
  });

  it("should create target folder and call generateModules and generateProgram", () => {
    const model = { configuration: { name: "Test", description: "desc" } };
    generate(model as any, "output");

    expect(mockMkdirSync).toHaveBeenCalledWith("output", { recursive: true });
    expect(mockGenerateModules).toHaveBeenCalledWith(model, "output");
    expect(mockGenerateProgram).toHaveBeenCalledWith(model, "output");
  });
});