import { describe, it, expect, vi, beforeEach } from "vitest";
import * as fs from "fs";
import * as path from "path";


import {
  generate as docGenerate,
  stackREADME,
  createProjectReadme,
} from "../packages/java-generator/documentation/generators";


import { generate as entityGenerate } from "../packages/java-generator/entity/generator";
import * as entityConfigGen from "../packages/java-generator/entity/config-generator";
import * as entityModuleGen from "../packages/java-generator/entity/module-generator";
import * as entitySqlGen from "../packages/java-generator/entity/sql-generator";
import * as entityDebeziumGen from "../packages/java-generator/entity/debezium-generator";


import { generate as wsGenerate } from "../packages/java-generator/webservice/generator";
import * as wsConfigGen from "../packages/java-generator/webservice/config-generator";
import * as wsModuleGen from "../packages/java-generator/webservice/module-generator";
import * as wsGraphqlGen from "../packages/java-generator/webservice/graphql-generator";

// Mocks globais
vi.mock("fs");
vi.mock("path");
vi.mock("langium/generate", () => ({
  expandToStringWithNL: (strings: TemplateStringsArray, ...exprs: any[]) =>
    String.raw({ raw: strings }, ...exprs),
}));
vi.mock("../packages/java-generator/entity/config-generator");
vi.mock("../packages/java-generator/entity/module-generator");
vi.mock("../packages/java-generator/entity/sql-generator");
vi.mock("../packages/java-generator/entity/debezium-generator");
vi.mock("../packages/java-generator/webservice/config-generator");
vi.mock("../packages/java-generator/webservice/module-generator");
vi.mock("../packages/java-generator/webservice/graphql-generator");

// Mocks de funções
const mockMkdirSync = fs.mkdirSync as unknown as ReturnType<typeof vi.fn>;
const mockWriteFileSync = fs.writeFileSync as unknown as ReturnType<typeof vi.fn>;
const mockJoin = path.join as unknown as ReturnType<typeof vi.fn>;

const mockEntityConfig = entityConfigGen.generateConfigs as unknown as ReturnType<typeof vi.fn>;
const mockEntityModule = entityModuleGen.generateModules as unknown as ReturnType<typeof vi.fn>;
const mockEntitySql = entitySqlGen.generateSchemaSQLHelper as unknown as ReturnType<typeof vi.fn>;
const mockEntityDebezium = entityDebeziumGen.generateDebezium as unknown as ReturnType<typeof vi.fn>;

const mockWsConfig = wsConfigGen.generateConfigs as unknown as ReturnType<typeof vi.fn>;
const mockWsModule = wsModuleGen.generateModules as unknown as ReturnType<typeof vi.fn>;
const mockWsGraphql = wsGraphqlGen.generateGraphQL as unknown as ReturnType<typeof vi.fn>;

// -------------------- Documentation Tests --------------------
describe("java-generator/documentation/generators.ts", () => {
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
        expect.stringContaining("variables:")
      );
    });

    it("should not write files if model.configuration is undefined", () => {
      const model = {};
      docGenerate(model as any, "output");
      expect(mockWriteFileSync).not.toHaveBeenCalled();
    });
  });

  describe("stackREADME", () => {
    it("should return a string listing Spring Boot and Spring Data Rest", () => {
      const result = stackREADME();
      expect(result).toContain("Spring Boot");
      expect(result).toContain("Spring Data Rest");
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

// -------------------- Entity Tests --------------------
describe("java-generator/entity/generator.ts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockMkdirSync.mockImplementation(() => {});
    mockEntityConfig.mockImplementation(() => {});
    mockEntityModule.mockImplementation(() => {});
    mockEntitySql.mockImplementation(() => {});
    mockEntityDebezium.mockImplementation(() => {});
  });

  it("should create target folder and call all entity generators", () => {
    const model = { configuration: { name: "Test", description: "desc" } };
    entityGenerate(model as any, "output");

    expect(mockMkdirSync).toHaveBeenCalledWith("output", { recursive: true });
    expect(mockEntityConfig).toHaveBeenCalledWith(model, "output");
    expect(mockEntityModule).toHaveBeenCalledWith(model, "output");
    expect(mockEntitySql).toHaveBeenCalledWith(model, "output");
    expect(mockEntityDebezium).toHaveBeenCalledWith(model, "output");
  });
});

// -------------------- Webservice Tests --------------------
describe("java-generator/webservice/generator.ts", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockMkdirSync.mockImplementation(() => {});
    mockWsConfig.mockImplementation(() => {});
    mockWsModule.mockImplementation(() => {});
    mockWsGraphql.mockImplementation(() => {});
  });

  it("should create target folder and call all webservice generators", () => {
    const model = { configuration: { name: "Test", description: "desc" } };
    wsGenerate(model as any, "output");

    expect(mockMkdirSync).toHaveBeenCalledWith("output", { recursive: true });
    expect(mockWsConfig).toHaveBeenCalledWith(model, "output");
    expect(mockWsModule).toHaveBeenCalledWith(model, "output");
    expect(mockWsGraphql).toHaveBeenCalledWith(model, "output");
  });
});