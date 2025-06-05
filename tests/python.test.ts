import { describe, it, expect, vi, beforeEach } from "vitest";
import * as fs from "fs";
import * as path from "path";


import { generate as djangoGenerate } from "../packages/python-generator/django/back/generator";
import * as settingsGen from "../packages/python-generator/django/back/setting-generator";
import * as bddGen from "../packages/python-generator/django/back/bdd/generator";
import * as modulesGen from "../packages/python-generator/django/back/components/module-generator";


vi.mock("fs");
vi.mock("path");
vi.mock("langium/generate", () => ({
  expandToStringWithNL: (strings: TemplateStringsArray, ...exprs: any[]) =>
    String.raw({ raw: strings }, ...exprs),
  toString: (x: any) => x,
}));
vi.mock("../packages/python-generator/django/back/setting-generator");
vi.mock("../packages/python-generator/django/back/bdd/generator");
vi.mock("../packages/python-generator/django/back/components/module-generator");


const mockMkdirSync = fs.mkdirSync as unknown as ReturnType<typeof vi.fn>;
const mockWriteFileSync = fs.writeFileSync as unknown as ReturnType<typeof vi.fn>;
const mockJoin = path.join as unknown as ReturnType<typeof vi.fn>;

const mockSettingsGen = settingsGen.generate as unknown as ReturnType<typeof vi.fn>;
const mockBddGen = bddGen.generate as unknown as ReturnType<typeof vi.fn>;
const mockModulesGen = modulesGen.generateModules as unknown as ReturnType<typeof vi.fn>;

// -------------------- Django Generator Tests --------------------
describe("python-generator/django/back/generator.ts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockMkdirSync.mockImplementation(() => {});
    mockWriteFileSync.mockImplementation(() => {});
    mockJoin.mockImplementation((...args: string[]) => args.join("/"));
    mockSettingsGen.mockImplementation(() => {});
    mockBddGen.mockImplementation(() => {});
    mockModulesGen.mockImplementation(() => {});
  });

  it("should create target folder and call settings, modules and bdd generators", () => {
    const model = { configuration: { name: "Test", description: "desc" }, abstractElements: [] };
    djangoGenerate(model as any, "output");

    expect(mockMkdirSync).toHaveBeenCalledWith("output", { recursive: true });
    expect(mockSettingsGen).toHaveBeenCalledWith(model, "output");
    expect(mockModulesGen).toHaveBeenCalledWith(model, "output");
    expect(mockBddGen).toHaveBeenCalledWith(model, "output");
  });
});

// -------------------- Settings Generator Tests --------------------
describe("python-generator/django/back/setting-generator.ts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should export a generate function", () => {
    expect(typeof settingsGen.generate).toBe("function");
  });

  // Adicione mais testes para funções auxiliares exportadas, se necessário
});

// -------------------- BDD Generator Tests --------------------
describe("python-generator/django/back/bdd/generator.ts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should export a generate function", () => {
    expect(typeof bddGen.generate).toBe("function");
  });

  // Adicione mais testes para funções auxiliares exportadas, se necessário
});

// -------------------- Modules Generator Tests --------------------
describe("python-generator/django/back/components/module-generator.ts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should export a generateModules function", () => {
    expect(typeof modulesGen.generateModules).toBe("function");
  });

  // Adicione mais testes para funções auxiliares exportadas, se necessário
});