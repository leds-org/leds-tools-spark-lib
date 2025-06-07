import { describe, it, expect, vi, beforeEach } from "vitest";
import * as fs from "fs";
import * as path from "path";


import { generate as caGenerate } from "../packages/csharp-generator/cleanArchitecture-generator/generator";
import * as appGen from "../packages/csharp-generator/cleanArchitecture-generator/Application/generate";
import * as domainGen from "../packages/csharp-generator/cleanArchitecture-generator/Domain/generate";
import * as infraGen from "../packages/csharp-generator/cleanArchitecture-generator/Infrastructure/generate";
import * as infraTestGen from "../packages/csharp-generator/cleanArchitecture-generator/InfraTest/generate";
import * as domainTestGen from "../packages/csharp-generator/cleanArchitecture-generator/DomainTest/generate";
import * as webApiGen from "../packages/csharp-generator/cleanArchitecture-generator/WebAPI/generate";


vi.mock("fs");
vi.mock("path");
vi.mock("langium/generate", () => ({
  expandToStringWithNL: (strings: TemplateStringsArray, ...exprs: any[]) =>
    String.raw({ raw: strings }, ...exprs),
  expandToString: (strings: TemplateStringsArray, ...exprs: any[]) =>
    String.raw({ raw: strings }, ...exprs),
}));

vi.mock("../packages/csharp-generator/cleanArchitecture-generator/Application/generate");
vi.mock("../packages/csharp-generator/cleanArchitecture-generator/Domain/generate");
vi.mock("../packages/csharp-generator/cleanArchitecture-generator/Infrastructure/generate");
vi.mock("../packages/csharp-generator/cleanArchitecture-generator/InfraTest/generate");
vi.mock("../packages/csharp-generator/cleanArchitecture-generator/DomainTest/generate");
vi.mock("../packages/csharp-generator/cleanArchitecture-generator/WebAPI/generate");


const mockMkdirSync = fs.mkdirSync as unknown as ReturnType<typeof vi.fn>;
const mockAppGen = appGen.generate as unknown as ReturnType<typeof vi.fn>;
const mockDomainGen = domainGen.generate as unknown as ReturnType<typeof vi.fn>;
const mockInfraGen = infraGen.generate as unknown as ReturnType<typeof vi.fn>;
const mockInfraTestGen = infraTestGen.generate as unknown as ReturnType<typeof vi.fn>;
const mockDomainTestGen = domainTestGen.generate as unknown as ReturnType<typeof vi.fn>;
const mockWebApiGen = webApiGen.generate as unknown as ReturnType<typeof vi.fn>;

// -------------------- Clean Architecture Generator Tests --------------------
describe("csharp-generator/cleanArchitecture-generator/generator.ts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockMkdirSync.mockImplementation(() => {});
    mockAppGen.mockImplementation(() => {});
    mockDomainGen.mockImplementation(() => {});
    mockInfraGen.mockImplementation(() => {});
    mockInfraTestGen.mockImplementation(() => {});
    mockDomainTestGen.mockImplementation(() => {});
    mockWebApiGen.mockImplementation(() => {});
  });

  it("should create all main folders and call all sub-generators", () => {
    const model = { configuration: { name: "TestProject", description: "desc" } };
    caGenerate(model as any, "output");

    expect(mockMkdirSync).toHaveBeenCalledWith("output/TestProject.Application", { recursive: true });
    expect(mockMkdirSync).toHaveBeenCalledWith("output/TestProject.Domain", { recursive: true });
    expect(mockMkdirSync).toHaveBeenCalledWith("output/TestProject.Domain.Test", { recursive: true });
    expect(mockMkdirSync).toHaveBeenCalledWith("output/TestProject.Infrastructure.Test", { recursive: true });
    expect(mockMkdirSync).toHaveBeenCalledWith("output/TestProject.WebAPI", { recursive: true });
    expect(mockMkdirSync).toHaveBeenCalledWith("output/TestProject.Infrastructure", { recursive: true });

    expect(mockInfraGen).toHaveBeenCalled();
    expect(mockDomainTestGen).toHaveBeenCalled();
    expect(mockWebApiGen).toHaveBeenCalled();
    expect(mockDomainGen).toHaveBeenCalled();
    expect(mockAppGen).toHaveBeenCalled();
    expect(mockInfraTestGen).toHaveBeenCalled();
  });
});

// -------------------- Application Generator Tests --------------------
describe("csharp-generator/cleanArchitecture-generator/Application/generate.ts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockMkdirSync.mockImplementation(() => {});
  });

  it("should export a generate function", () => {
    expect(typeof appGen.generate).toBe("function");
  });

  // Adicione mais testes para funções auxiliares exportadas, se necessário
});

// -------------------- Domain Generator Tests --------------------
describe("csharp-generator/cleanArchitecture-generator/Domain/generate.ts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockMkdirSync.mockImplementation(() => {});
  });

  it("should export a generate function", () => {
    expect(typeof domainGen.generate).toBe("function");
  });

  // Adicione mais testes para funções auxiliares exportadas, se necessário
});

// -------------------- Infrastructure Generator Tests --------------------
describe("csharp-generator/cleanArchitecture-generator/Infrastructure/generate.ts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockMkdirSync.mockImplementation(() => {});
  });

  it("should export a generate function", () => {
    expect(typeof infraGen.generate).toBe("function");
  });

  // Adicione mais testes para funções auxiliares exportadas, se necessário
});

// -------------------- InfraTest Generator Tests --------------------
describe("csharp-generator/cleanArchitecture-generator/InfraTest/generate.ts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockMkdirSync.mockImplementation(() => {});
  });

  it("should export a generate function", () => {
    expect(typeof infraTestGen.generate).toBe("function");
  });

  // Adicione mais testes para funções auxiliares exportadas, se necessário
});

// -------------------- DomainTest Generator Tests --------------------
describe("csharp-generator/cleanArchitecture-generator/DomainTest/generate.ts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockMkdirSync.mockImplementation(() => {});
  });

  it("should export a generate function", () => {
    expect(typeof domainTestGen.generate).toBe("function");
  });

  // Adicione mais testes para funções auxiliares exportadas, se necessário
});

// -------------------- WebAPI Generator Tests --------------------
describe("csharp-generator/cleanArchitecture-generator/WebAPI/generate.ts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockMkdirSync.mockImplementation(() => {});
  });

  it("should export a generate function", () => {
    expect(typeof webApiGen.generate).toBe("function");
  });

});